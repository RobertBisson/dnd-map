import React from "react";
import { connect } from "react-redux";
import { Droppable } from "@hello-pangea/dnd";
import CharToken from "components/CharToken";
import { ContextMenuTrigger, ContextMenu } from "react-contextmenu";

import { createSelector } from "reselect";
import { TokenSets, TokenBase, Token } from "Services/assetLoading/TokenSets";

import { sample } from "lodash";
import { rollD } from "Services/util/RollUtil";
const uuid = require("uuid/v1");
interface GridBoxProps {
    gridKey: string;
    mapKey: string;
    items: any[];
    gridSize: number;
    visible: boolean;
    noGrid?: boolean;
    toggleVisibility: (mapKey: string, gridRef: string) => void;
    addItem: (mapKey: string, gridRef: string, item: any) => void;
    kill: (mapKey: string, gridRef: string, index: number) => void;
    updateItem: (mapKey: string, gridRef: string, index: number, item: any) => void;
    visibilityMode: boolean;
    visibilityOnMouse: boolean;

    selectItem: (token: Token) => void;
    deselectItem: () => void;
    selectedTokenID?: string;
}

interface GridBoxState {
    showContextMenu: boolean;
    blockLeaving: boolean;
    showPlayers: boolean;
    showMonsterHumanoid: boolean;
    showNPCs: boolean;
    showMonsterUndead: boolean;
    showMonstersOther: boolean;
}

class GridBox extends React.Component<GridBoxProps, GridBoxState> {
    timeout: any = null;
    constructor(props: GridBoxProps) {
        super(props);
        this.state = {
            showContextMenu: false,
            blockLeaving: false,
            showPlayers: false,
            showMonsterHumanoid: false,
            showMonsterUndead: false,
            showMonstersOther: false,
            showNPCs: false
        };
    }
    handleContext = e => {
        e.preventDefault();
        e.stopPropagation();
        this.setState({ showContextMenu: true });
    };
    handleMouseLeave = (event: any) => {
        if (this.state.showContextMenu && !this.state.blockLeaving) {
            this.setState({
                showContextMenu: false
            });
        }
    };
    onMouseOver = () => {
        if (this.timeout) {
            clearTimeout(this.timeout);
        }
    };
    onMouseExit = () => {
        this.timeout = setTimeout(() => {
            this.setState({
                showContextMenu: false
            });
        }, 500);
    };
    handleVisibilityToggle = () => {
        const { toggleVisibility, mapKey, gridKey } = this.props;
        toggleVisibility(mapKey, gridKey);
        this.setState({
            showContextMenu: false,
            blockLeaving: false
        });
    };

    handleKillToken = (tokenId: string, tokenIndex: number) => {
        const { kill, mapKey, gridKey } = this.props;
        kill(mapKey, gridKey, tokenIndex);
    };
    handleUpdateToken = (tokenId: string, tokenIndex: number, item: any) => {
        const { updateItem, mapKey, gridKey } = this.props;
        updateItem(mapKey, gridKey, tokenIndex, item);
    };

    handleAddToken = (token: TokenBase) => {
        let newCharToken: Partial<Token> = {
            ...token,
            tokenID: uuid(),
            color: "#000000".replace(/0/g, function() {
                return (~~(Math.random() * 16)).toString(16);
            }),
            health: -1,
            armor: -1
        };

        if (token.randomToken) {
            newCharToken.tokenFile = sample(token.randomToken) || newCharToken.tokenFile;
        }
        if (newCharToken.baseHealth) {
            newCharToken.health = newCharToken.baseHealth();
        }

        if (newCharToken.baseArmor) {
            newCharToken.armor = newCharToken.baseArmor();
        }

        newCharToken.initiative = rollD(20) + newCharToken.initiativeBonus || 0;
        this.props.addItem(this.props.mapKey, this.props.gridKey, newCharToken);
    };

    renderAddTokenButton = (token: any, index: number) => {
        return (
            <button
                key={`${token.shortname}.${index}`}
                className="context-action"
                onClick={this.handleAddToken.bind(this, token)}
            >
                {token.shortname}
            </button>
        );
    };
    handleClick = (event: any) => {
        const { visible } = this.props;
        if (event && event.shiftKey && event.buttons === 1 && !event.altKey && visible) {
            this.handleVisibilityToggle();
        } else if (event && event.shiftKey && event.altKey && event.buttons === 1 && !visible) {
            this.handleVisibilityToggle();
        }
    };

    handleMouseOver = (event: any) => {
        const { visible } = this.props;
        if (event && event.shiftKey && event.buttons === 1 && !event.altKey && visible) {
            this.handleVisibilityToggle();
        } else if (event && event.shiftKey && event.altKey && event.buttons === 1 && !visible) {
            this.handleVisibilityToggle();
        }
    };
    render() {
        const { gridKey, items, gridSize, visible, noGrid } = this.props;

        return (
            <div
                style={{ position: "relative" }}
                onMouseOver={this.handleMouseOver}
                onMouseDown={this.handleClick}
                onMouseLeave={this.onMouseExit}
            >
                <Droppable droppableId={gridKey} key={gridKey}>
                    {(provided, snapshot) => (
                        <div
                            ref={provided.innerRef}
                            style={{
                                width: gridSize,
                                height: gridSize,
                                border:
                                    noGrid === true ? "1px solid transparent" : "1px groove rgba(136, 136, 136, 0.5)",
                                boxSizing: "border-box",
                                flexDirection: "row",
                                flexWrap: "wrap",
                                display: "flex",
                                justifyContent: "center",
                                position: "relative",
                                overflow: "visible",
                                alignItems: "center",
                                zIndex: 1,
                                ...(!visible ? { background: "#000", opacity: 1 } : {})
                            }}
                            className={`${this.state.blockLeaving ? "blocked" : ""}`}
                            onContextMenu={this.handleContext}
                        >
                            {visible &&
                                items &&
                                items.length > 0 &&
                                items.map((token: any, index: number) => (
                                    <CharToken
                                        key={token.tokenID}
                                        token={token}
                                        tokenSize={gridSize / items.length}
                                        tokenID={token.tokenID}
                                        tokenIndex={index}
                                        kill={this.handleKillToken}
                                        updateItem={this.handleUpdateToken}
                                        onSelect={this.props.selectItem}
                                        onDeselect={this.props.deselectItem}
                                        selected={this.props.selectedTokenID === token.tokenID}
                                    />
                                ))}
                            {provided.placeholder}
                        </div>
                    )}
                </Droppable>
                {this.state.showContextMenu && (
                    <div
                        className={"context-wrapper"}
                        style={{
                            top: gridSize / 2
                        }}
                        onMouseEnter={this.onMouseOver}
                    >
                        <button className="context-action" onClick={this.handleVisibilityToggle}>
                            Visible
                        </button>
                        <hr />

                        <div
                            className={"context-action"}
                            onMouseEnter={() => this.setState({ showPlayers: true })}
                            onMouseLeave={() => this.setState({ showPlayers: false })}
                        >
                            <span>Players {'>'}</span>
                            {this.state.showPlayers && (
                                <div className={"players-menu"}>
                                    {Object.keys(TokenSets.player).map((tokenName: string, index: number) => {
                                        return this.renderAddTokenButton(TokenSets.player[tokenName], index);
                                    })}
                                </div>
                            )}
                        </div>
                        <hr />
                        <div
                            className={"context-action"}
                            onMouseEnter={() => this.setState({ showMonsterHumanoid: true })}
                            onMouseLeave={() => this.setState({ showMonsterHumanoid: false })}
                        >
                            <span>Humanoid {'>'}</span>
                            {this.state.showMonsterHumanoid && (
                                <div className={"players-menu"}>
                                    {Object.keys(TokenSets.monster).map((tokenName: string, index: number) => {
                                        return this.renderAddTokenButton(TokenSets.monster[tokenName], index);
                                    })}
                                </div>
                            )}
                        </div>
                        <div
                            className={"context-action"}
                            onMouseEnter={() => this.setState({ showMonsterUndead: true })}
                            onMouseLeave={() => this.setState({ showMonsterUndead: false })}
                        >
                            <span>Undead {'>'}</span>
                            {this.state.showMonsterUndead && (
                                <div className={"players-menu"}>
                                    {Object.keys(TokenSets.monsterUndead).map((tokenName: string, index: number) => {
                                        return this.renderAddTokenButton(TokenSets.monsterUndead[tokenName], index);
                                    })}
                                </div>
                            )}
                        </div>
                        <div
                            className={"context-action"}
                            onMouseEnter={() => this.setState({ showMonstersOther: true })}
                            onMouseLeave={() => this.setState({ showMonstersOther: false })}
                        >
                            <span>Monster {'>'}</span>
                            {this.state.showMonstersOther && (
                                <div className={"players-menu"}>
                                    {Object.keys(TokenSets.monsterOther).map((tokenName: string, index: number) => {
                                        return this.renderAddTokenButton(TokenSets.monsterOther[tokenName], index);
                                    })}
                                </div>
                            )}
                        </div>
                        <div
                            className={"context-action"}
                            onMouseEnter={() => this.setState({ showNPCs: true })}
                            onMouseLeave={() => this.setState({ showNPCs: false })}
                        >
                            <span>NPCs {'>'}</span>
                            {this.state.showNPCs && (
                                <div className={"players-menu"}>
                                    {Object.keys(TokenSets.npc).map((tokenName: string, index: number) => {
                                        return this.renderAddTokenButton(TokenSets.npc[tokenName], index);
                                    })}
                                </div>
                            )}
                        </div>
                    </div>
                )}
            </div>
        );
    }
}
const getStateForGridBox = createSelector(
    (state: any, props: any) => {
        if (state.grid[props.mapKey]) {
            const map = state.grid[props.mapKey];
            if (map) {
                return state.grid[props.mapKey][props.gridKey];
            }
        }

        return {
            items: [],
            visible: false
        };
    },
    (gridObject: any) => {
        return {
            ...gridObject
        };
    }
);

const mapStateToProps = (state: any, props: any) => {
    return {
        ...props,
        ...getStateForGridBox(state, props),
        visibilityMode: state.map.visibilityMode,
        visibilityOnMouse: state.map.visibilityOnMouse,
        selectedTokenID: state.character.activeChar && state.character.activeChar.tokenID
    };
};
const mapDispatchToProps = (dispatch: any) => ({
    toggleVisibility: (mapKey: string, gridRef: string) =>
        dispatch({ type: "Grid/TOGGLE_VISIBILITY", mapKey: mapKey, gridRef: gridRef }),
    addItem: (mapKey: string, gridRef: string, item: any) =>
        dispatch({ type: "Grid/UPDATE_GRID_ITEMS", mapKey: mapKey, gridRef: gridRef, items: item }),
    kill: (mapKey: string, gridRef: string, index: number) =>
        dispatch({
            type: "Grid/REMOVE_GRID_ITEMS",
            mapKey: mapKey,
            gridRef: gridRef,
            index: index
        }),
    updateItem: (mapKey: string, gridRef: string, index: number, item: any) =>
        dispatch({
            type: "Grid/UPDATE_GRID_ITEM",
            mapKey: mapKey,
            gridRef: gridRef,
            index: index,
            item: item
        }),
    selectItem: (token: Token) =>
        dispatch({
            type: "Character/SET_ACTIVE",
            token: token
        }),
    deselectItem: () =>
        dispatch({
            type: "Character/RESET"
        })
});

export default connect(mapStateToProps, mapDispatchToProps)(GridBox);
