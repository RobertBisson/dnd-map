import React from "react";
import { connect } from "react-redux";
import { Droppable } from "react-beautiful-dnd";
import CharToken from "components/CharToken";
import { ContextMenuTrigger, ContextMenu } from "react-contextmenu";

import { createSelector } from "reselect";
import { TokenSets } from "Services/assetLoading/TokenSets";
const uuid = require("uuid/v1");
interface GridBoxProps {
    gridKey: string;
    mapKey: string;
    items: any[];
    gridSize: number;
    visible: boolean;
    toggleVisibility: (mapKey: string, gridRef: string) => void;
    addItem: (mapKey: string, gridRef: string, item: any) => void;
    kill: (mapKey: string, gridRef: string, index: number) => void;
}

interface GridBoxState {
    showContextMenu: boolean;
    blockLeaving: boolean;
}

class GridBox extends React.Component<GridBoxProps, GridBoxState> {
    constructor(props: GridBoxProps) {
        super(props);
        this.state = {
            showContextMenu: false,
            blockLeaving: false
        };
    }
    handleContext = e => {
        e.preventDefault();
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
        this.setState({
            showContextMenu: true,
            blockLeaving: true
        });
    };
    onMouseExit = () => {
        console.log("exit fired");
        this.setState({
            showContextMenu: false,
            blockLeaving: false
        });
    };
    handleVisibilityToggle = () => {
        const { toggleVisibility, mapKey, gridKey } = this.props;
        toggleVisibility(mapKey, gridKey);
        this.setState({
            showContextMenu: false,
            blockLeaving: false
        });
    };
    handleAddGoblin = () => {
        let goblin = {
            ...TokenSets.goblin,
            tokenID: uuid()
        };
        this.props.addItem(this.props.mapKey, this.props.gridKey, goblin);
    };
    handleKillToken = (tokenId: string, tokenIndex: number) => {
        const { kill, mapKey, gridKey } = this.props;
        kill(mapKey, gridKey, tokenIndex);
    };
    render() {
        const { gridKey, items, gridSize, visible } = this.props;
        return (
            <div style={{ position: "relative" }}>
                <Droppable droppableId={gridKey} key={gridKey}>
                    {(provided, snapshot) => (
                        <div
                            ref={provided.innerRef}
                            style={{
                                width: gridSize,
                                height: gridSize,
                                border: "1px dashed #88888880",
                                boxSizing: "border-box",
                                flexDirection: "row",
                                flexWrap: "wrap",
                                display: "flex",
                                justifyContent: "center",
                                position: "relative",
                                overflow: "visible",
                                alignItems: "center",
                                zIndex: 1,
                                ...(!visible ? { background: "#000", opacity: 0.9 } : {})
                            }}
                            className={`${this.state.blockLeaving ? "blocked" : ""}`}
                            onContextMenu={this.handleContext}
                        >
                            {visible &&
                                items &&
                                items.length > 0 &&
                                items.map((token: any, index: number) => (
                                    <CharToken
                                        token={token}
                                        tokenSize={gridSize / items.length}
                                        tokenId={token.tokenID}
                                        tokenIndex={index}
                                        kill={this.handleKillToken}
                                    />
                                ))}
                            {provided.placeholder}
                        </div>
                    )}
                </Droppable>
                {this.state.showContextMenu && (
                    <div
                        style={{
                            position: "absolute",
                            top: gridSize / 2,
                            left: 0,
                            height: gridSize,
                            background: "#fcfcfc",
                            boxShadow: "1px 1px 1px #444",
                            zIndex: 2
                        }}
                        onMouseEnter={this.onMouseOver}
                        onMouseLeave={this.onMouseExit}
                    >
                        <button className="context-action" onClick={this.handleVisibilityToggle}>
                            Visible
                        </button>
                        <button className="context-action" onClick={this.handleAddGoblin}>
                            Goblin
                        </button>
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
        ...getStateForGridBox(state, props)
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
        })
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(GridBox);
