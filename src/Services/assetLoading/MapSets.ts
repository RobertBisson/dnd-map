import { getKeyforGridRef } from "Services/util/GridUtil";
import { TokenSets } from "./TokenSets";

export const MapSets = {
    ambush: {
        mapFile: "ambush.jpg",
        columns: 24,
        rows: 17,
        gridSize: 59,
        displayName: "Road 1",
        gridCustom: {
            [getKeyforGridRef(0, 0)]: { items: [{ ...TokenSets.monster.goblin, tokenID: "goblin-1" }], visible: true }
        }
    },
    goblinCave: {
        mapFile: `wave.jpg`,
        gridSize: 45,
        rows: 44,
        columns: 66,
        displayName: "Cave 1 - Small Grid"
    },

    gobFull: {
        mapFile: `wave.jpg`,
        gridSize: 180,
        rows: 22,
        columns: 33,
        displayName: "Cave 1 - Large Grid"
    }
};
