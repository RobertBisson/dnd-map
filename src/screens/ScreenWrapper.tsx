import React from "react";
import { connect } from "react-redux";
import MapScreen from "./MapScreen/MapScreen";
import { MapGroups, MapGroup } from "Services/assetLoading/MapSets";

import { Menu } from "components/Menu";

interface ScreenProps {
    inMapView: boolean;
    activeMapKey: string;
    setActiveMap: (mapKey: string) => void;
    setMapView: (bool: boolean) => void;
    toggleMouseVisibility: () => void;
    forceMapRefresh: (mapKey: string) => void;
}
interface ScreenState {
    viewingGroup: string | null;
}

class ScreenWrapper extends React.PureComponent<ScreenProps, ScreenState> {
    constructor(props: ScreenProps) {
        super(props);
        this.state = {
            viewingGroup: null
        };
    }
    handleMapChange = (mapKey: string) => {
        this.props.setActiveMap(mapKey);
    };

    renderMenuButton = (key: string, display: string, onClick: () => void) => {
        return (
            <div key={key}>
                <button
                    style={{
                        width: "100%",
                        minWidth: 120,
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
        const { viewingGroup } = this.state;
        if (viewingGroup) {
            return this.renderMenuButton(
                `map-${index}-${mapKey}-${viewingGroup}`,
                MapGroups[viewingGroup].mapList[mapKey].displayName,
                () => this.handleMapChange(mapKey)
            );
        }
        return null;
    };
    renderMapList() {
        const { viewingGroup } = this.state;
        if (viewingGroup) {
            const MapSetList = Object.keys(MapGroups[viewingGroup].mapList);
            return (
                <div
                    style={{ display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center" }}
                >
                    {MapSetList.map(this.renderMenuOption)}
                </div>
            );
        }
        return null;
    }
    renderMapGroup(group: MapGroup, index: number) {
        return this.renderMenuButton(group.groupKey, group.groupName, () =>
            this.setState({ viewingGroup: group.groupKey })
        );
    }

    clearMapGroup = () => {
        this.setState({ viewingGroup: null });
    };
    renderMapGroups() {
        const { viewingGroup } = this.state;

        const GroupKeys = Object.keys(MapGroups);
        return (
            <React.Fragment>
                {viewingGroup && this.renderMenuButton("back", "Back", this.clearMapGroup)}
                {!viewingGroup &&
                    GroupKeys.map((groupKey: string, index: number) => this.renderMapGroup(MapGroups[groupKey], index))}
                {viewingGroup && this.renderMapList()}
            </React.Fragment>
        );
    }
    handleForceMapRefresh = () => {
        const { activeMapKey } = this.props;
        this.props.forceMapRefresh(activeMapKey);
    };
    handleHome = () => {
        this.setState({ viewingGroup: null });
        this.props.setMapView(false);
    };
    render() {
        const { inMapView } = this.props;

        if (inMapView) {
            return (
                <div
                    style={{
                        justifyContent: "space-between",
                        display: "flex",
                        flexDirection: "row",
                        alignItems: "center",
                        padding: 50,
                        paddingLeft: 120,
                        width: "100%",
                        height: "100%"
                    }}
                >
                    <MapScreen />
                    <Menu>
                        {this.renderMapGroups()}
                        {this.renderMenuButton("home", "Home", this.handleHome)}
                        {this.renderMenuButton("refresh", "MapRefresh", this.handleForceMapRefresh)}
                    </Menu>
                </div>
            );
        }
        return this.renderMapGroups();
    }
}

const mapStateToProps = (state: any) => {
    return {
        inMapView: state.map.inMapView,
        activeMapKey: state.map.activeMapKey
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
            }),
        toggleMouseVisibility: () =>
            dispatch({
                type: "Map/TOOGGLE_VISIBILITY_ON_MOUSE"
            }),
        forceMapRefresh: (mapKey: string) =>
            dispatch({
                type: "Grid/SETUP_REFRESH",
                map: mapKey
            })
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ScreenWrapper);
