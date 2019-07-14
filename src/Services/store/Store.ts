import { createStore, combineReducers } from "redux";
import { MapSets } from "../assetLoading/MapSets";

const mapReducer = (
    state: any = {
        activeMap: MapSets.goblinCave
    }
) => {
    return { ...state };
};
const reducer = combineReducers({
    map: mapReducer
});

const Store = createStore(reducer);

export default Store;
