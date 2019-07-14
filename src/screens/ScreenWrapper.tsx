import React from "react";
import { connect } from "react-redux";
import MapScreen from "./MapScreen/MapScreen";
import { MapSets } from "Services/assetLoading/MapSets";

interface ScreenProps {
    inMapView: boolean;
    setActiveMap: (mapKey: string) => void;
}
interface ScreenState {}

class ScreenWrapper extends React.PureComponent<ScreenProps, ScreenState> {
    handleMapChange = (mapKey: string) => {
        this.props.setActiveMap(mapKey);
    };
    render() {
        const { inMapView } = this.props;
        console.log(this.props);
        if (inMapView) {
            return (
                <div
                    style={{
                        background: "#222",
                        justifyContent: "space-between",
                        display: "flex",
                        flexDirection: "row",
                        alignItems: "center",
                        padding: 50,
                        paddingLeft: 100
                    }}
                >
                    <MapScreen />
                </div>
            );
        }
        const MapSetList = Object.keys(MapSets);
        return (
            <div>
                {MapSetList.map((mapKey: string, index: number) => (
                    <div key={`map-${index}-${mapKey}`}>
                        <button onClick={() => this.handleMapChange(mapKey)}>{mapKey}</button>
                    </div>
                ))}
            </div>
        );
    }
}

const mapStateToProps = (state: any) => {
    return {
        inMapView: state.map.inMapView
    };
};
const mapDispatchToProps = (dispatch: any) => {
    return {
        setActiveMap: (activeMap: string) =>
            dispatch({
                type: "Map/ACTIVE_MAP",
                map: activeMap
            })
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ScreenWrapper);
