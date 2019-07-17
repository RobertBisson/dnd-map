import React from "react";

import { connect } from "react-redux";
import { MapSets } from "../../Services/assetLoading/MapSets";
import Image from "assets/wave.jpg";

import { Droppable } from "react-beautiful-dnd";
import CharToken from "components/CharToken";
import { TokenSets } from "Services/assetLoading/TokenSets";
import { DragDropContext } from "react-beautiful-dnd";

import GridBox from "./Components/GridBox";
import { getKeyforGridRef } from "Services/util/GridUtil";

interface MapScreenProps {
    activeMap: any;
    moveItems: (mapKey: string, source: any, destination: any) => void;
    mapKey: string;
    toggleMouseSwitchingVisibility: (forceMode?: boolean) => void;
    visibilityOnMouse: boolean;
}
interface MapScreenState {
    mapImage: any;
    width: number;
    height: number;
    zoomLevel: number;
    dropArrays: {
        [index: string]: any[];
    };

    killbox: any[];
    characterTray: any[];
}

class MapScreen extends React.Component<MapScreenProps, MapScreenState> {
    constructor(props: MapScreenProps) {
        super(props);

        this.state = {
            mapImage: null,
            width: window.innerWidth - 200,
            height: window.innerHeight,
            zoomLevel: 1,
            dropArrays: {},
            killbox: [],
            characterTray: []
        };
        this.loadImage();
    }
    componentDidUpdate(prevProps: MapScreenProps) {
        if (this.props.activeMap.mapFile !== prevProps.activeMap.mapFile) {
            this.loadImage();
        }
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
        const { moveItems, mapKey } = this.props;
        if (this.props.moveItems) {
            this.props.moveItems(mapKey, source, destination);
        }
    };
    componentDidMount() {}

    handleContextmenu = (event: any) => {
        console.log(event);
    };
    renderDroppableGrid() {
        const { activeMap, mapKey } = this.props;
        const { gridSize } = activeMap;
        const { dropArrays } = this.state;

        // do magic to calculate the grid.
        let rows = activeMap.rows;
        let columns = activeMap.columns;

        let rowsObjects: any[] = [];
        for (let i = 0; i < rows; i++) {
            let columnObjs: any[] = [];
            for (let colIndex = 0; colIndex < columns; colIndex++) {
                let dropKey = getKeyforGridRef(i, colIndex);

                let droppable = (
                    <GridBox key={`${dropKey}.outer`} mapKey={mapKey} gridKey={dropKey} gridSize={gridSize} />
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
        console.log(this.props);
        const { mapImage, height } = this.state;
        const { visibilityOnMouse, toggleMouseSwitchingVisibility } = this.props;
        if (!this.props.activeMap) {
            return null;
        }
        return (
            <React.Fragment>
                <DragDropContext onDragEnd={this.onDragEnd}>
                    <div
                        style={{
                            display: "flex",

                            position: "relative"
                        }}
                        className={"scroll-container"}
                        onMouseDown={visibilityOnMouse ? () => toggleMouseSwitchingVisibility() : undefined}
                        onMouseUp={visibilityOnMouse ? () => toggleMouseSwitchingVisibility(false) : undefined}
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
                    </div>
                </DragDropContext>
            </React.Fragment>
        );
    }
}

const mapStateToProps = (state: any) => {
    return {
        activeMap: state.map.activeMap,
        mapKey: state.map.activeMapKey,
        visibilityOnMouse: state.map.visibilityOnMouse
    };
};

const mapDispatchToProps = (dispatch: any) => ({
    moveItems: (mapKey: string, source, destination) =>
        dispatch({
            type: "Grid/MOVE_GRID_ITEMS",
            mapKey: mapKey,
            source: source,
            destination: destination
        }),

    toggleMouseSwitchingVisibility: (bool?: boolean) =>
        dispatch({
            type: "Map/TOGGLE_VISIBILITY_MODE",
            forceMode: bool
        })
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(MapScreen);
