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
}
interface TokenState {
    token: any;
    showContextMenu: boolean;
}

export default class CharToken extends React.PureComponent<TokenProps, TokenState> {
    uniqKey: string = "";
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
        import(`../assets/token/${token.tokenFile}`).then((image: any) =>
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
        this.setState({
            showContextMenu: true
        });
    };
    onMouseExit = () => {
        console.log("exit fired");
        this.setState({
            showContextMenu: false
        });
    };
    handleKill = () => {
        this.props.kill(this.props.tokenId, this.props.tokenIndex);
    };
    render() {
        const { tokenId, tokenIndex } = this.props;
        let { tokenSize } = this.props;
        if (!tokenSize) {
            tokenSize = 20;
        }
        const { token } = this.state;

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
                                ...provided.draggableProps.style
                            }}
                        >
                            <img
                                src={this.state.token}
                                style={{ width: tokenSize - tokenSize / 4, borderRadius: "50%" }}
                                onContextMenu={this.handleContext}
                            />
                        </div>
                    )}
                </Draggable>
                {this.state.showContextMenu && (
                    <div
                        style={{
                            position: "absolute",
                            top: 0,
                            left: 0,

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
                    </div>
                )}
            </React.Fragment>
        );
    }
}
