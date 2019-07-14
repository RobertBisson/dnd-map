import React from "react";
import { Droppable } from "react-beautiful-dnd";
import CharToken from "./CharToken";
import { throttle } from "lodash";

interface MenuProps {}
interface MenuState {
    top: number;
    left: number;
}

const getListStyle = (isDraggingOver: boolean) => ({
    background: isDraggingOver ? "lightblue" : "lightgrey"
});
export class Menu extends React.Component<MenuProps, MenuState> {
    timeout: any = null;
    constructor(props: MenuProps) {
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
        const { top, left } = this.state;

        return (
            <div
                style={{
                    width: 100,
                    maxWidth: 100,
                    overflow: "hidden",
                    height: 200,

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

                    transition: "all .2s ease"
                }}
            >
                {this.props.children}
            </div>
        );
    }
}
