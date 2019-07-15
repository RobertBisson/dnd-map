import { MapSets } from "Services/assetLoading/MapSets";
import { getKeyforGridRef } from "Services/util/GridUtil";

const GridReducer = (state: any = {}, action: any) => {
    switch (action.type) {
        case "Map/ACTIVE_MAP":
        case "Grid/SETUP":
            return { ...state, ...reduceInstantiateGrid(state, action.map) };
        case "Grid/UPDATE_GRID_ITEMS":
            return { ...state, ...reduceUpdateGridItems(state, action.mapKey, action.gridRef, action.items) };
        case "Grid/UPDATE_GRID_ITEM":
            return {
                ...state,
                ...reduceUpdateGridItem(state, action.mapKey, action.gridRef, action.index, action.item)
            };
        case "Grid/TOGGLE_VISIBILITY":
            return { ...state, ...reduceToggleGridVisibility(state, action.mapKey, action.gridRef) };

        case "Grid/MOVE_GRID_ITEMS":
            return reduceMoveGridItems(state, action.mapKey, action.source, action.destination);
        case "Grid/REMOVE_GRID_ITEMS":
            return reduceRemoveGridItem(state, action.mapKey, action.gridRef, action.index);
        case "Grid/UPDATE_GRID_VISIBILITY":
        default:
            return { ...state };
    }
};

export default GridReducer;

const reduceToggleGridVisibility = (state: any, mapKey: string, gridRef: string) => {
    const current = { ...state[mapKey][gridRef] };
    return {
        ...state,
        [mapKey]: { ...state[mapKey], [gridRef]: { ...current, visible: !current.visible } }
    };
};
const reduceInstantiateGrid = (state: any, mapKey: string) => {
    const existingGrid = state[mapKey];
    if (existingGrid) {
        return state;
    }

    const { rows, columns, gridCustom } = MapSets[mapKey];
    let newGrid: any = {};
    for (let i = 0; i < rows; i++) {
        for (let colI = 0; colI < columns; colI++) {
            let gridKey = getKeyforGridRef(i, colI);
            if (gridCustom && gridCustom[gridKey]) {
                newGrid[gridKey] = {
                    items: gridCustom[gridKey].items ? gridCustom[gridKey].items : [],
                    visible: gridCustom[gridKey].visible !== false
                };
            } else {
                newGrid[gridKey] = {
                    items: [],
                    visible: true
                };
            }
        }
    }

    return {
        ...state,
        [mapKey]: newGrid
    };
};

const reduceRemoveGridItem = (state: any, mapKey: string, gridRef: string, index: number) => {
    let originalGrid = { ...state[mapKey][gridRef] };
    originalGrid.items = originalGrid.items.concat([]);
    let [moved] = originalGrid.items.splice(index, 1);
    return {
        ...state,
        [mapKey]: {
            ...state[mapKey],
            [gridRef]: originalGrid
        }
    };
};

const reduceMoveGridItems = (state: any, mapKey: string, source: any, destination: any) => {
    if (source.droppableId === destination.droppableId) {
        return state;
    }

    let originalGrid = { ...state[mapKey][source.droppableId] };
    originalGrid.items = originalGrid.items.concat([]);
    let newGrid = { ...state[mapKey][destination.droppableId] };
    newGrid.items = newGrid.items.concat([]);
    let [moved] = originalGrid.items.splice(source.index, 1);
    newGrid.items.splice(destination.index, 0, moved);

    return {
        ...state,
        [mapKey]: {
            ...state[mapKey],
            [source.droppableId]: originalGrid,
            [destination.droppableId]: newGrid
        }
    };
};
const reduceUpdateGridItems = (state: any, mapKey: string, gridRef: string, newItem: any[] | any) => {
    return {
        ...state,
        [mapKey]: {
            ...state[mapKey],
            [gridRef]: {
                ...state[mapKey][gridRef],
                items: state[mapKey][gridRef].items.concat(newItem)
            }
        }
    };
};

const reduceUpdateGridItem = (state: any, mapKey: string, gridRef: string, index: number, newItem: any) => {
    let items = state[mapKey][gridRef].items.concat([]);

    items[index] = newItem;
    return {
        ...state,
        [mapKey]: {
            ...state[mapKey],
            [gridRef]: {
                ...state[mapKey][gridRef],
                items: items
            }
        }
    };
};
