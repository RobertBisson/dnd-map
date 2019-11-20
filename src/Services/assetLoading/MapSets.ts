import { getKeyforGridRef } from "Services/util/GridUtil";
import { TokenSets } from "./TokenSets";

import { each } from "lodash";

export interface Map {
    mapFile: string;
    columns: number;
    rows: number;
    gridSize: number;
    displayName: string;
    noGrid: boolean;
}
export interface MapGroup {
    groupName: string;
    groupKey: string;
    mapList: {
        [mapKey: string]: Map;
    };
}

export const MapSetsBase = {
    general: {
        groupKey: "general",
        groupName: "General",
        mapList: {
            areaMap: {
                mapFile: "neverwinterArea.jpg",
                columns: 25,
                rows: 16,
                gridSize: 86,
                displayName: "Area",
                noGrid: true
            },
            neverwinter: {
                mapFile: "neverwinter1.jpg",
                columns: 16,
                rows: 11,
                gridSize: 50,
                displayName: "Neverwinter",
                noGrid: true
            }
        }
    },
    goblinCave: {
        groupKey: "goblinCave",
        groupName: "Act 1",
        mapList: {
            ambush: {
                mapFile: "ambush2.jpg",
                columns: 24,
                rows: 17,
                gridSize: 59,
                displayName: "Road 1"
            },
            entrance: {
                mapFile: "entrance.jpg",
                columns: 22,
                rows: 12,
                gridSize: 90,
                scalesAvailable: [1, 2],
                displayName: "Forest 1",
                gridCustom: {
                    [getKeyforGridRef(0, 0)]: { visible: false },
                    [getKeyforGridRef(0, 1)]: { visible: false },
                    [getKeyforGridRef(0, 2)]: { visible: false },
                    [getKeyforGridRef(0, 3)]: { visible: false },
                    [getKeyforGridRef(0, 4)]: { visible: false },
                    [getKeyforGridRef(0, 5)]: { visible: false },
                    [getKeyforGridRef(0, 6)]: { visible: false },
                    [getKeyforGridRef(0, 7)]: { visible: false },
                    [getKeyforGridRef(0, 8)]: { visible: false },
                    [getKeyforGridRef(0, 9)]: { visible: false },
                    [getKeyforGridRef(0, 10)]: { visible: false },
                    [getKeyforGridRef(0, 11)]: { visible: false },
                    [getKeyforGridRef(0, 12)]: { visible: false },
                    [getKeyforGridRef(0, 13)]: { visible: false },
                    [getKeyforGridRef(0, 14)]: { visible: false },
                    [getKeyforGridRef(0, 15)]: { visible: false },
                    [getKeyforGridRef(0, 16)]: { visible: false },
                    [getKeyforGridRef(0, 17)]: { visible: false },
                    [getKeyforGridRef(0, 18)]: { visible: false },
                    [getKeyforGridRef(0, 19)]: { visible: false },
                    [getKeyforGridRef(0, 20)]: { visible: false },
                    [getKeyforGridRef(0, 21)]: { visible: false }
                }
            },
            entranceLarger: {
                mapFile: "entrance2.jpg",
                columns: 12,
                rows: 16,
                gridSize: 90,
                displayName: "Forest 2"
            },
            right1: {
                mapFile: "right1.jpg",
                columns: 19,
                rows: 11,
                gridSize: 90,
                displayName: "R F 1"
            },
            right2: {
                mapFile: "topRight.jpg",
                columns: 20,
                rows: 13,
                gridSize: 90,
                displayName: "R F 2"
            },
            left1: {
                mapFile: "topleft.jpg",
                columns: 18,
                rows: 14,
                gridSize: 90,
                displayName: "LF 1"
            },

            goblinCave: {
                mapFile: `wave.jpg`,
                gridSize: 90,
                rows: 22,
                columns: 33,
                displayName: "All"
            }
        }
    },
    phand: {
        groupKey: "phand",
        groupName: "Act 2",
        mapList: {
            phand: {
                mapFile: "phandalin140.jpg",
                columns: 35,
                rows: 25,
                gridSize: 35,
                displayName: "Phandalin",
                noGrid: true
            },
            redbrand: {
                mapFile: "redbrand_1.jpg",
                columns: 29,
                rows: 19,
                gridSize: 45.75,
                displayName: "RBH",
                noGrid: false
            },
            animated: {
                mapFile: "https://www.youtube.com/embed/eKPB48VZPMw",
                columns: 32,
                rows: 18,
                animated: true,
                gridSize: 60,
                displayName: "anim",
                noGrid: false
            }
        }
    },
    act3: {
        groupKey: "act3",
        groupName: "Act 3",
        mapList: {
            wyvern: {
                mapFile: "wyvern.jpg",
                columns: 50,
                rows: 38,
                gridSize: 50,
                displayName: "Wyvern",
                noGrid: false
            },
            thunder: {
                mapFile: "Thundertree_1.jpg",
                columns: 60,
                rows: 41,
                gridSize: 50,
                displayName: "Thunder",
                noGrid: false
            },
            oldOwl: {
                mapFile: "old_owl_1.jpg",
                columns: 25,
                rows: 19,
                gridSize: 50,
                displayName: "Owl",
                noGrid: false
            },
            cragmaw: {
                mapFile: "cragmaw_castle.jpg",
                columns: 50,
                rows: 50,

                gridSize: 50,
                displayName: "Crag",
                noGrid: false
            }
        }
    },
    oneShot: {
        groupKey: "oneShot",
        groupName: "One Shot",
        mapList: {
            final: {
                mapFile: "finalRoom1.png",
                columns: 25,
                rows: 25,
                gridSize: 50,
                displayName: "F1",
                noGrid: false
            },
            manor: {
                mapFile: "manor1.png",
                columns: 25,
                rows: 25,
                gridSize: 50,
                displayName: "M1",
                noGrid: false
            },
            dock1: {
                mapFile: "dock1.png",
                columns: 5,
                rows: 2,
                gridSize: 350,
                displayName: "dock",
                noGrid: true
            },
            hut1: {
                mapFile: "hut1.png",
                columns: 5,
                rows: 2,
                gridSize: 350,
                displayName: "hut",
                noGrid: true
            },
            hut2: {
                mapFile: "hut2.png",
                columns: 10,
                rows: 10,
                gridSize: 125,
                displayName: "Hut2",
                noGrid: false
            },
            island: {
                mapFile: "island1.png",
                columns: 25,
                rows: 25,
                gridSize: 50,
                noGrid: true,
                displayName: "island"
            },
            island2: {
                mapFile: "island2.png",
                columns: 50,
                rows: 25,
                gridSize: 50,
                noGrid: true,
                displayName: "island 2"
            },
            hut3: {
                mapFile: "hut3.png",
                columns: 25,
                rows: 11,
                gridSize: 100,
                noGrid: true,
                displayName: "island 3"
            },
            manor2: {
                mapFile: "manor2.png",
                columns: 25,
                rows: 11,
                gridSize: 100,
                noGrid: true,
                displayName: "island 4"
            }
        }
    }
};
let MapSetScale: any = {};
each(MapSetsBase, (Map: any, key: string) => {
    MapSetScale[key + "2"] = {
        ...Map,
        columns: Map.columns * 2,
        rows: Map.rows * 2,
        gridSize: Map.gridSize / 2,
        displayName: Map.displayName + " Dense"
    };
});
/* let MapSetScale2: any = {};
each(MapSetsBase, (Map: any, key: string) => {
    MapSetScale2[key + "3"] = {
        ...Map,
        columns: Math.floor((Map.gridSize * Map.columns) / (Map.gridSize / 1.5)),
        rows: Math.floor((Map.gridSize * Map.rows) / (Map.gridSize / 1.5)),
        gridSize: Map.gridSize / 1.5,
        displayName: Map.displayName + " Denser"
    };
}); */
let MapLists: any = {};

const groupKeys = Object.keys(MapSetsBase);
for (let i = 0; i < groupKeys.length; i++) {
    const MapGroupKey = groupKeys[i];

    MapLists = { ...MapLists, ...MapSetsBase[MapGroupKey].mapList };
}

export const MapSets = MapLists;
export const MapGroups = MapSetsBase;
