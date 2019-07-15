import { createStore, combineReducers } from "redux";
import { MapSets } from "../assetLoading/MapSets";
import { persistReducer, persistStore } from "redux-persist";
import storage from "redux-persist/es/storage";

import GridReducer from "./grid/GridReducer";
const mapReducer = (
    state: any = {
        activeMap: null,
        inMapView: false,
        visibilityMode: false,
        visibilityOnMouse: false
    },
    action: any
) => {
    switch (action.type) {
        case "Map/ACTIVE_MAP":
            return {
                ...state,
                activeMap: MapSets[action.map],
                activeMapKey: action.map,
                inMapView: true
            };
        case "Map/TOGGLE_VISIBILITY_MODE":
            return { ...state, visibilityMode: !state.visibilityMode };
        case "Map/TOOGGLE_VISIBILITY_ON_MOUSE":
            let updated = action.forceMode != null ? action.forceMode : !state.visibilityOnMouse;
            return {
                ...state,
                visibilityOnMouse: updated,
                ...(updated === false ? { visibilityMode: false } : {})
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
    map: mapReducer,
    grid: persistReducer(
        {
            key: "grid",
            storage
        },
        GridReducer
    )
});

const Store = createStore(
    reducer,
    /* preloadedState, */
    (window as any).__REDUX_DEVTOOLS_EXTENSION__ && (window as any).__REDUX_DEVTOOLS_EXTENSION__()
);

let persistor = persistStore(Store);
export { Store, persistor };
