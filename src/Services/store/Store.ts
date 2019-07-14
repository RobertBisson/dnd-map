import { createStore, combineReducers } from "redux";
import { MapSets } from "../assetLoading/MapSets";

const mapReducer = (
    state: any = {
        activeMap: MapSets.goblinCave,
        inMapView: false
    },
    action: any
) => {
    switch (action.type) {
        case "Map/ACTIVE_MAP":
            return {
                ...state,
                activeMap: MapSets[action.map],
                inMapView: true
            };
        case "Map/SWITCH_VIEW":
            return {
                ...state,
                inMapView: action.inMapView
            };
        default:
            return { ...state };
    }
};
const reducer = combineReducers({
    map: mapReducer
});

const Store = createStore(reducer);

export default Store;
