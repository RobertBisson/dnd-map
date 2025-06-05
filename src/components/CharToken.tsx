import React from "react";
import { Draggable } from "@hello-pangea/dnd";
import { connect } from "react-redux";
import { Token } from "Services/assetLoading/TokenSets";

const uuid = require("uuid/v1");
interface TokenProps {
    token: Token;
    tokenID: string;
    tokenIndex: number;
    tokenSize: number;
    kill: (tokenID, tokenIndex) => void;
    updateItem: (tokenID, tokenIndex, item) => void;
    onSelect: (token) => void;
    onDeselect: () => void;
    selected: boolean;
}
interface TokenState {
    token: any;
    showContextMenu: boolean;
    focused: boolean;
}

export default class CharToken extends React.PureComponent<TokenProps, TokenState> {
    uniqKey: string = "";
    timeout: any = null;
    constructor(props: TokenProps) {
        super(props);
        this.uniqKey = uuid();
        if (props.token) {
            this.loadToken();
        }
        this.state = {
            token: "",
            showContextMenu: false,
            focused: false
        };
    }

    loadToken = () => {
        const { token } = this.props;
        import(`../assets/${token.tokenFile}`).then((image: any) =>
            this.setState({
                token: image.default
            })
        );
    };
    handleContext = e => {
        e.preventDefault();
        e.stopPropagation();
        this.setState({ showContextMenu: true });
        return false;
    };
    onMouseOver = () => {
        if (this.timeout) {
            clearTimeout(this.timeout);
            this.timeout = null;
        }
    };
    onMouseExit = () => {
        this.timeout = setTimeout(() => {
            this.setState({
                showContextMenu: false
            });
        }, 500);
    };
    handleKill = () => {
        this.setState({
            showContextMenu: false
        });
        this.props.kill(this.props.tokenID, this.props.tokenIndex);
    };
    handleWound = () => {
        const { token } = this.props;
        this.setState({
            showContextMenu: false
        });
        this.props.updateItem(this.props.tokenID, this.props.tokenIndex, { ...token, wounded: !token.wounded });
    };

    handleClick = () => {
        if (this.props.selected) {
            this.props.onDeselect();
        } else {
            this.props.onSelect(this.props.token);
        }
    };
    render() {
        const { tokenID, tokenIndex, token, selected } = this.props;
        let { tokenSize } = this.props;
        if (!tokenSize) {
            tokenSize = 20;
        }
        const { wounded } = this.props.token;

        return (
            <React.Fragment>
                <Draggable key={this.uniqKey} draggableId={tokenID} index={tokenIndex}>
                    {(provided, snapshot) => (
                        <div
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                            tabIndex={-1}
                            style={{
                                width: tokenSize,
                                height: tokenSize,
                                padding: tokenSize / 8,
                                zIndex: 100,
                                boxSizing: "border-box",
                                borderRadius: "50%",
                                ...provided.draggableProps.style
                            }}
                        >
                            <div
                                className={`token ${wounded ? "wounded" : ""} ${selected ? "selected" : ""} `}
                                onContextMenu={this.handleContext}
                                onClick={this.handleClick}
                            >
                                <img
                                    src={this.state.token}
                                    style={{
                                        width: tokenSize - tokenSize / 4,
                                        height: tokenSize - tokenSize / 4,
                                        borderRadius: "50%",
                                        boxSizing: "border-box",

                                        ...(token.addBackground
                                            ? { backgroundColor: "#fcfcfc", border: "3px solid #ba966d" }
                                            : {})
                                    }}
                                />
                                <div className={`color-ident`} style={{ backgroundColor: token.color }} />
                            </div>
                        </div>
                    )}
                </Draggable>
                {this.state.showContextMenu && (
                    <div
                        style={{
                            position: "absolute",

                            background: "#fcfcfc",
                            boxShadow: "1px 1px 1px #444",
                            zIndex: 200
                        }}
                        onMouseEnter={this.onMouseOver}
                        onMouseLeave={this.onMouseExit}
                    >
                        <button className="context-action" onClick={this.handleKill}>
                            Kill
                        </button>
                        <button className="context-action" onClick={this.handleWound}>
                            {wounded ? "Heal" : "Wound"}
                        </button>
                    </div>
                )}
            </React.Fragment>
        );
    }
}
