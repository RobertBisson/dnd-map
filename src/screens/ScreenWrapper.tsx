import React from "react";
import { connect } from "react-redux";
import MapScreen from "./MapScreen/MapScreen";
import { MapGroups, MapGroup } from "Services/assetLoading/MapSets";

import { Menu } from "components/Menu";
import { Token } from "Services/assetLoading/TokenSets";

interface ScreenProps {
    inMapView: boolean;
    activeMapKey: string;
    setActiveMap: (mapKey: string) => void;
    setMapView: (bool: boolean) => void;
    toggleMouseVisibility: () => void;
    forceMapRefresh: (mapKey: string) => void;
    activeCharToken?: Token;
}
interface ScreenState {
    viewingGroup: string | null;
    dmScreen: boolean;
}

class ScreenWrapper extends React.PureComponent<ScreenProps, ScreenState> {
    constructor(props: ScreenProps) {
        super(props);
        this.state = {
            viewingGroup: null,
            dmScreen: false
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
        const { inMapView, activeCharToken } = this.props;
        const { dmScreen } = this.state;
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
                        paddingBottom: 200,
                        boxSizing: "border-box",
                        width: "100%",
                        height: "100%"
                    }}
                >
                    <MapScreen />
                    <Menu>
                        {this.renderMapGroups()}
                        {this.renderMenuButton("home", "Home", this.handleHome)}
                        {this.renderMenuButton("refresh", "MapRefresh", this.handleForceMapRefresh)}
                        <button
                            style={{ marginTop: 8 }}
                            onClick={() => this.setState({ dmScreen: !this.state.dmScreen })}
                        >
                            {dmScreen ? "DM Off" : "DM On"}
                        </button>
                    </Menu>

                    {dmScreen && (
                        <Menu align={"right"} width={210}>
                            {activeCharToken && (
                                <React.Fragment>
                                    <div className={"character-sheet"}>
                                        <div className={"sheet-title"}>
                                            <h3>{activeCharToken.shortname}</h3>
                                        </div>
                                        {activeCharToken.health > 0 && (
                                            <div className={"sheet-row"}>
                                                <h4>
                                                    HP: <span>{activeCharToken.health}</span>
                                                </h4>
                                            </div>
                                        )}
                                        {activeCharToken.armor > 0 && (
                                            <div>
                                                <h4>
                                                    AC: <span>{activeCharToken.armor}</span>
                                                </h4>
                                            </div>
                                        )}
                                        <div>
                                            <h4>
                                                I: <span>{activeCharToken.initiative}</span>
                                            </h4>
                                        </div>
                                    </div>{" "}
                                </React.Fragment>
                            )}
                        </Menu>
                    )}
                </div>
            );
        }
        return this.renderMapGroups();
    }
}

const mapStateToProps = (state: any) => {
    return {
        inMapView: state.map.inMapView,
        activeMapKey: state.map.activeMapKey,
        activeCharToken: state.character.activeChar
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
