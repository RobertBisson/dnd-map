import React from "react";
import { Droppable } from "react-beautiful-dnd";
import { CharToken } from "./CharToken";
import { throttle } from "lodash";

interface KillBoxProps {
    gridSize: number;
    items: any[];
}
interface KillboxState {
    top: number;
    left: number;
}

const getListStyle = (isDraggingOver: boolean) => ({
    background: isDraggingOver ? "lightblue" : "lightgrey"
});
export class KillBox extends React.Component<KillBoxProps, KillboxState> {
    timeout: any = null;
    constructor(props: KillBoxProps) {
        super(props);
        this.state = {
            top: 0,
            left: 0
        };
        this.handleScroll = throttle(this.handleScroll, 60);
    }
    componentDidMount() {
        document.addEventListener("scroll", this.handleScroll);
    }
    componentWillUnmount() {
        document.removeEventListener("scroll", this.handleScroll);
    }
    handleScroll = (event: any) => {
        let position = { x: window.scrollX, y: window.scrollY };

        this.setState({
            top: position.y,
            left: position.x
        });
    };

    render() {
        const { gridSize, items } = this.props;
        const { top, left } = this.state;

        return (
            <Droppable droppableId={"killbox"} key={"killbox"}>
                {(provided, snapshot) => (
                    <div
                        ref={provided.innerRef}
                        style={{
                            width: 100,
                            height: 200,
                            border: "1px dashed #88888880",
                            boxSizing: "border-box",
                            flexDirection: "row",
                            flexWrap: "wrap",
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                            position: "absolute",
                            top: top + 100,
                            left: left,
                            zIndex: 50,
                            ...getListStyle(snapshot.isDraggingOver),
                            transition: "all .2s ease"
                        }}
                    >
                        {items &&
                            items.length > 0 &&
                            items.map((token: any, index: number) => (
                                <CharToken token={token} tokenSize={50} tokenId={token.tokenID} tokenIndex={index} />
                            ))}
                        {provided.placeholder}
                    </div>
                )}
            </Droppable>
        );
    }
}
