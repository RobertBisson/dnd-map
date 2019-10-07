import { createStore, combineReducers } from "redux";
import { MapSets } from "../assetLoading/MapSets";
import { persistStore, persistReducer, getStoredState, REHYDRATE } from "redux-persist";
import storage from "redux-persist/es/storage";

import { KEY_PREFIX } from "redux-persist/es/constants";

import { isEqual } from "lodash";
import GridReducer from "./grid/GridReducer";
import { CharacterReducer } from "./character/CharacterReducer";
const mapReducer = (
    state: any = {
        activeMap: null,
        inMapView: false,
        activeMapKey: "",
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
    ),
    character: CharacterReducer
});

const Store = createStore(
    reducer,
    /* preloadedState, */
    (window as any).__REDUX_DEVTOOLS_EXTENSION__ && (window as any).__REDUX_DEVTOOLS_EXTENSION__()
);

let persistor = persistStore(Store);

const crossTabSync = (persistObj: any, config?: any) => {
    var config = config || {};
    var blacklist = config.blacklist || false;
    var whitelist = config.whitelist || false;
    var keyPrefix = config.keyPrefix || KEY_PREFIX;

    const handleStorageEvent = async e => {
        if (e.key && e.key.indexOf(keyPrefix) === 0) {
            var keyspace = e.key.substr(keyPrefix.length);
            if (whitelist && whitelist.indexOf(keyspace) === -1) {
                return;
            }

            if (blacklist && blacklist.indexOf(keyspace) !== -1) {
                return;
            }
            if (!isEqual(e.oldValue, e.newValue)) {
                let rehydrate = true;
                try {
                    let oldParse = JSON.parse(e.oldValue);
                    let newParse = JSON.parse(e.newValue);

                    let oldKeys = Object.keys(oldParse);
                    let newKeys = Object.keys(newParse);

                    if (!isEqual(oldKeys, newKeys)) {
                        // console.log(oldKeys, newKeys);
                        rehydrate = false;
                    }
                } catch (error) {}
                if (rehydrate) {
                    let state = await getStoredState({ key: keyspace, storage: storage });

                    if (state) {
                        Store.dispatch({
                            type: REHYDRATE,
                            key: keyspace,
                            payload: state
                        });
                    }
                }
            } else {
                return;
            }
        }
    };
    window.addEventListener("storage", handleStorageEvent, false);
};

crossTabSync(persistor, {});

export { Store, persistor };
