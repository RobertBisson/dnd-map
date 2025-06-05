import React from "react";
import { Droppable } from "@hello-pangea/dnd";
import CharToken from "./CharToken";
import { throttle } from "lodash";

interface MenuProps {
    align: "left" | "right";
    width: number;
    children?: React.ReactNode;
}
interface MenuState {
    top: number;
    left: number;
}

const getListStyle = (isDraggingOver: boolean) => ({
    background: isDraggingOver ? "lightblue" : "lightgrey"
});
export class Menu extends React.Component<MenuProps, MenuState> {
    static defaultProps = {
        align: "left",
        width: 120
    };
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
        const { width, align } = this.props;
        this.setState({
            top: position.y,
            left: position.x + (align === "right" ? window.innerWidth - (width + 12) : -12)
        });
    };

    render() {
        const { top, left } = this.state;
        const { align, width } = this.props;
        return (
            <div
                style={{
                    width: width,
                    maxWidth: width,
                    overflow: "hidden",

                    boxSizing: "border-box",
                    flexDirection: "row",
                    flexWrap: "wrap",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    position: "absolute",
                    top: top + 100,

                    zIndex: 50,

                    transition: "all .2s ease",
                    ...(align === "left" ? { left: left } : left === 0 ? { right: 12 } : { left: left })
                }}
            >
                {this.props.children}
            </div>
        );
    }
}
