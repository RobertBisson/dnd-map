import React from "react";
import { Draggable } from "react-beautiful-dnd";

const uuid = require("uuid/v1");
interface TokenProps {
    token: any;
    tokenId: string;
    tokenIndex: number;
    tokenSize: number;
}
interface TokenState {
    token: any;
}

export class CharToken extends React.PureComponent<TokenProps, TokenState> {
    uniqKey: string = "";
    constructor(props: TokenProps) {
        super(props);
        this.uniqKey = uuid();
        if (props.token) {
            this.loadToken();
        }
        this.state = {
            token: ""
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
    render() {
        const { tokenId, tokenIndex } = this.props;
        let { tokenSize } = this.props;
        if (!tokenSize) {
            tokenSize = 20;
        }
        const { token } = this.state;

        return (
            <Draggable key={this.uniqKey} draggableId={tokenId} index={tokenIndex}>
                {(provided, snapshot) => (
                    <div
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        style={{
                            width: tokenSize,
                            height: tokenSize,
                            padding: tokenSize / 12,
                            zIndex: 100,
                            boxSizing: "border-box",
                            ...provided.draggableProps.style
                        }}
                    >
                        <img src={this.state.token} style={{ width: tokenSize - tokenSize / 6 }} />
                    </div>
                )}
            </Draggable>
        );
    }
}
