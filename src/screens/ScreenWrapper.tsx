import React from "react";
import { connect } from "react-redux";
import MapScreen from "./MapScreen/MapScreen";
import { MapSets } from "Services/assetLoading/MapSets";
import { Menu } from "components/Menu";

interface ScreenProps {
    inMapView: boolean;
    setActiveMap: (mapKey: string) => void;
    setMapView: (bool: boolean) => void;
}
interface ScreenState {}

class ScreenWrapper extends React.PureComponent<ScreenProps, ScreenState> {
    handleMapChange = (mapKey: string) => {
        this.props.setActiveMap(mapKey);
    };

    renderMenuButton = (key: string, display: string, onClick: () => void) => {
        return (
            <div key={key}>
                <button
                    style={{
                        width: "100%",
                        lineHeight: "18px",
                        background: "#444",
                        color: "#aaa",
                        border: "1px solid transparent"
                    }}
                    onClick={onClick}
                >
                    {display}
                </button>
            </div>
        );
    };

    renderMenuOption = (mapKey: string, index: number) => {
        return this.renderMenuButton(`map-${index}-${mapKey}`, MapSets[mapKey].displayName, () =>
            this.handleMapChange(mapKey)
        );
    };
    renderMapList() {
        const MapSetList = Object.keys(MapSets);
        return <div>{MapSetList.map(this.renderMenuOption)}</div>;
    }
    render() {
        const { inMapView } = this.props;

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
                    <Menu>
                        {this.renderMapList()}
                        {this.renderMenuButton("back", "Back", () => this.props.setMapView(false))}
                    </Menu>
                </div>
            );
        }
        return this.renderMapList();
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
            }),
        setMapView: (bool: boolean) =>
            dispatch({
                type: "Map/SWITCH_VIEW",
                inMapViwe: bool
            })
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ScreenWrapper);
