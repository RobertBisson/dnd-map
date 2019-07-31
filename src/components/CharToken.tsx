import React from "react";
import { Draggable } from "react-beautiful-dnd";
import { connect } from "react-redux";

const uuid = require("uuid/v1");
interface TokenProps {
    token: any;
    tokenId: string;
    tokenIndex: number;
    tokenSize: number;
    kill: (tokenId, tokenIndex) => void;
    updateItem: (tokenId, tokenIndex, item) => void;
}
interface TokenState {
    token: any;
    showContextMenu: boolean;
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
            showContextMenu: false
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
        this.props.kill(this.props.tokenId, this.props.tokenIndex);
    };
    handleWound = () => {
        const { token } = this.props;
        this.setState({
            showContextMenu: false
        });
        this.props.updateItem(this.props.tokenId, this.props.tokenIndex, { ...token, wounded: !token.wounded });
    };
    render() {
        const { tokenId, tokenIndex, token } = this.props;
        let { tokenSize } = this.props;
        if (!tokenSize) {
            tokenSize = 20;
        }
        const { wounded } = this.props.token;

        return (
            <React.Fragment>
                <Draggable key={this.uniqKey} draggableId={tokenId} index={tokenIndex}>
                    {(provided, snapshot) => (
                        <div
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
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
                            <div className={`token ${wounded ? "wounded" : ""}`} onContextMenu={this.handleContext}>
                                <img
                                    src={this.state.token}
                                    style={{
                                        width: tokenSize - tokenSize / 4,
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
