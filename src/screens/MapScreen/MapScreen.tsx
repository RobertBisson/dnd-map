import React from "react";

import { connect } from "react-redux";
import { MapSets } from "../../Services/assetLoading/MapSets";
import Image from "assets/wave.jpg";

import { Droppable } from "react-beautiful-dnd";
import { CharToken } from "components/CharToken";
import { TokenSets } from "Services/assetLoading/TokenSets";
import { DragDropContext } from "react-beautiful-dnd";

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
                "drop.0.0": [{ ...TokenSets.goblin, tokenID: "goblin-1" }]
            }
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
        if (source.droppableId === destination.droppableId) {
            return;
        }

        this.setState({
            dropArrays: {
                ...this.state.dropArrays,
                [source.droppableId]: [],
                [destination.droppableId]: [...this.state.dropArrays[source.droppableId]]
            }
        });
    };
    componentDidMount() {}

    renderDroppableGrid() {
        const { activeMap } = this.props;
        const { gridSize } = activeMap;
        const { dropArrays } = this.state;

        // do magic to calculate the grid.
        let rows = activeMap.rows;
        let columns = activeMap.columns;

        let rowsObjects = [];
        for (let i = 0; i < rows; i++) {
            let columnObjs = [];
            for (let colIndex = 0; colIndex < columns; colIndex++) {
                let dropKey = `drop.${i}.${colIndex}`;
                let dropArray = dropArrays[dropKey];

                let droppable = (
                    <Droppable droppableId={dropKey} key={dropKey}>
                        {(provided, snapshot) => (
                            <div
                                ref={provided.innerRef}
                                style={{
                                    width: activeMap.gridSize,
                                    height: activeMap.gridSize,
                                    border: "1px dashed #88888880",
                                    boxSizing: "border-box"
                                }}
                            >
                                {dropArray &&
                                    dropArray.length > 0 &&
                                    dropArray.map((token: any, index: number) => (
                                        <CharToken
                                            token={token}
                                            tokenSize={activeMap.gridSize}
                                            tokenId={token.tokenID}
                                            tokenIndex={index}
                                        />
                                    ))}
                                {provided.placeholder}
                            </div>
                        )}
                    </Droppable>
                );
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
    render() {
        const { mapImage, height } = this.state;
        const w = window.innerWidth;
        return (
            <React.Fragment>
                <DragDropContext onDragEnd={this.onDragEnd}>
                    <div
                        style={{
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                            position: "relative"
                        }}
                        className={"scroll-container"}
                    >
                        <div
                            style={{
                                display: "flex",
                                flexDirection: "column",
                                backgroundImage: `url(${mapImage})`,
                                backgroundPosition: "center"
                            }}
                        >
                            {this.renderDroppableGrid()}
                        </div>
                    </div>
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
