import React from "react";

import { connect } from "react-redux";
import { MapSets } from "../../Services/assetLoading/MapSets";
import Image from "assets/wave.jpg";

import { Droppable } from "react-beautiful-dnd";
import { CharToken } from "components/CharToken";
import { TokenSets } from "Services/assetLoading/TokenSets";
import { DragDropContext } from "react-beautiful-dnd";
import { KillBox } from "components/Killbox";
import GridBox from "./Components/GridBox";

interface MapScreenProps {
    activeMap: any;
}
interface MapScreenState {
    mapImage: any;
    width: number;
    height: number;
    zoomLevel: number;
    dropArrays: {
        [index: string]: any[];
    };
    popoutPanel: boolean;
    killbox: any[];
    characterTray: any[];
}
const Map = require("../../assets/wave.jpg");

class MapScreen extends React.Component<MapScreenProps, MapScreenState> {
    constructor(props: MapScreenProps) {
        super(props);

        this.state = {
            mapImage: null,
            width: window.innerWidth - 100,
            height: window.innerHeight,
            zoomLevel: 1,
            dropArrays: {
                "drop.0.0": [
                    { ...TokenSets.goblin, tokenID: "goblin-1" },
                    { ...TokenSets.goblin, tokenID: "goblin-2" },
                    { ...TokenSets.goblin, tokenID: "goblin-3" }
                ]
            },
            killbox: [],
            characterTray: [],
            popoutPanel: false
        };
        this.loadImage();
    }
    loadImage = async () => {
        const { activeMap } = this.props;
        import(`../../assets/${activeMap.mapFile}`).then((image: any) => {
            this.setState({
                mapImage: image.default
            });
        });
    };

    handleZoomOut = () => {
        this.setState({
            zoomLevel: this.state.zoomLevel - 0.1
        });
    };

    handleZoomIn = () => {
        this.setState({
            zoomLevel: this.state.zoomLevel + 0.1
        });
    };
    onDragEnd = (result: any, provided: any) => {
        const { source, destination } = result;

        if (!destination) {
            return;
        }
        // don't allow reordering
        if (source.droppableId === destination.droppableId) {
            return;
        }
        let sourceArray;

        // work out where the source is;
        if (source.droppableId === "killbox") {
            sourceArray = [...this.state.killbox];
        } else if (source.droppableId === "characterTray") {
            sourceArray = [...this.state.characterTray];
        } else {
            sourceArray = [...this.state.dropArrays[source.droppableId]];
        }

        // get the moving items
        let [removed] = sourceArray.splice(source.index, 1);

        let newState: any = {};

        // handle coming from the kilbox/tray
        if (source.droppableId !== "killbox" && source.droppableId !== "characterTray") {
            newState = {
                dropArrays: {
                    ...this.state.dropArrays,
                    [source.droppableId]: sourceArray
                }
            };
        } else if (source.droppableId === "killbox") {
            newState.killbox = sourceArray;
        } else if (source.droppableId === "characterTray") {
            newState.characterTray = sourceArray;
        }

        // get the updated destination array;
        if (destination.droppableId === "killbox") {
            newState.killbox = [...this.state.killbox, removed];
        } else if (destination.droppableId === "characterTray") {
            newState.characterTray = [...this.state.characterTray, removed];
        } else {
            let newDest = this.state.dropArrays[destination.droppableId]
                ? [...this.state.dropArrays[destination.droppableId]]
                : [];

            newDest.splice(destination.index, 0, removed);
            if (newState.dropArrays) {
                newState.dropArrays[destination.droppableId] = newDest;
            } else {
                newState.dropArrays = {
                    ...this.state.dropArrays,
                    [destination.droppableId]: newDest
                };
            }
        }
        this.setState(newState);
    };
    componentDidMount() {}

    handleContextmenu = (event: any) => {
        console.log(event);
    };
    renderDroppableGrid() {
        const { activeMap } = this.props;
        const { gridSize } = activeMap;
        const { dropArrays } = this.state;

        // do magic to calculate the grid.
        let rows = activeMap.rows;
        let columns = activeMap.columns;

        let rowsObjects: any[] = [];
        for (let i = 0; i < rows; i++) {
            let columnObjs: any[] = [];
            for (let colIndex = 0; colIndex < columns; colIndex++) {
                let dropKey = `drop.${i}.${colIndex}`;
                let dropArray = dropArrays[dropKey];

                let droppable = <GridBox dropKey={dropKey} dropArray={dropArray} gridSize={gridSize} />;
                columnObjs.push(droppable);
            }
            rowsObjects.push(columnObjs);
        }

        return rowsObjects.map((columnsList: any[], index: number) => (
            <div className={"drop-row"} key={`drop-row-${index}`} style={{ display: "flex", flexDirection: "row" }}>
                {columnsList.map((columnDrop: any, index: number) => columnDrop)}
            </div>
        ));
    }

    renderKillBox() {
        const { activeMap } = this.props;
        const { gridSize } = activeMap;
        const { killbox } = this.state;
        return <KillBox gridSize={gridSize} items={killbox} />;
    }

    renderPopoutPanel() {}
    handlePopout = () => {
        this.setState({ popoutPanel: !this.state.popoutPanel });
    };
    render() {
        const { mapImage, height, popoutPanel } = this.state;
        const w = window.innerWidth;
        return (
            <React.Fragment>
                <DragDropContext onDragEnd={this.onDragEnd}>
                    <div
                        style={{
                            display: "flex",

                            position: "relative"
                        }}
                        className={"scroll-container"}
                    >
                        <div
                            style={{
                                display: "flex",
                                flexDirection: "column",
                                backgroundImage: `url(${mapImage})`,
                                backgroundPosition: "center",
                                backgroundSize: "contain"
                            }}
                        >
                            {this.renderDroppableGrid()}
                        </div>
                        {
                            <div
                                style={{
                                    position: "fixed",
                                    top: 0,
                                    left: 0,
                                    height: 50,
                                    width: 50,
                                    background: "#999",
                                    cursor: "pointer"
                                }}
                            >
                                <button onClick={this.handleZoomIn}>ZoomIn</button>
                                <button onClick={this.handleZoomOut}>ZoomOut</button>
                            </div>
                        }
                    </div>
                    {this.renderPopoutPanel()}
                    {this.renderKillBox()}
                </DragDropContext>
            </React.Fragment>
        );
    }
}

const mapStateToProps = (state: any) => {
    return {
        activeMap: state.map.activeMap
    };
};

export default connect(
    mapStateToProps,
    null
)(MapScreen);
