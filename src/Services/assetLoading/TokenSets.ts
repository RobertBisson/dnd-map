import { rollD, rollBinary, rollBinaryRare, rollXD, rollBinaryCommon } from "Services/util/RollUtil";

export interface TokenBase {
    tokenFile: string;
    randomToken: string[];
    shortname: string;
    baseHealth: () => number;
    baseArmor: () => number;
    initiativeBonus?: number;
    addBackground?: boolean;
}
export interface Token extends TokenBase {
    tokenID: string;
    color: string;
    initiative?: number;
    health: number;
    armor: number;
    wounded?: boolean;
}

export const TokenSets = {
    monster: {
        goblin: {
            tokenFile: `monsterToken/goblin/Goblin_EqbxPIV.png`,
            randomToken: [
                `monsterToken/goblin/Goblin_EqbxPIV.png`,
                `monsterToken/goblin/Goblin2.png`,
                `monsterToken/goblin/Goblin3.png`,
                `monsterToken/goblin/Goblin8.png`,
                `monsterToken/goblin/Goblin9.png`,
                `monsterToken/goblin/Goblin11.png`,
                `monsterToken/goblin/Goblin13.png`,
                `monsterToken/goblin/Goblin16.png`,
                `monsterToken/goblin/Goblin19.png`
            ],
            baseHealth: () => rollXD(2, 6),
            baseArmor: () => 13 + (rollBinary() ? 2 : 0),
            initiativeBonus: 2,
            shortname: "Goblin"
        },
        goblin_archer: {
            tokenFile: `monsterToken/goblin/Goblin_archer.png`,
            randomToken: [`monsterToken/goblin/Goblin_archer.png`, `monsterToken/goblin/Goblin_archer2.png`],
            shortname: "Goblin A",
            baseHealth: () => rollXD(2, 6),
            baseArmor: () => 13,
            initiativeBonus: 2
        },
        goblin_special: {
            tokenFile: `monsterToken/goblin/special/Goblin1.png`,
            randomToken: [
                `monsterToken/goblin/special/Goblin1.png`,
                `monsterToken/goblin/special/Goblin10.png`,
                `monsterToken/goblin/special/Goblin12.png`,
                `monsterToken/goblin/special/Goblin17.png`,
                `monsterToken/goblin/special/Goblin18.png`
            ],
            shortname: "Goblin S",
            baseHealth: () => rollXD(2, 6) + 2,
            baseArmor: () => 13 + (rollBinary() ? 2 : 0),
            initiativeBonus: 2
        },

        orc: {
            tokenFile: `monsterToken/Orc_6gTUCJV.png`,
            shortname: "Orc",

            baseHealth: () => rollXD(2, 8) + 2,
            baseArmor: () => 13 + (rollBinaryRare() ? 2 : 0),
            initiativeBonus: 1
        },

        nothic: {
            tokenFile: `monsterToken/Nothic_o206aNl.png`,
            shortname: "Nothic",

            baseHealth: () => rollXD(6, 8) + 18,
            baseArmor: () => 15,
            initiativeBonus: 3
        },
        skeleton: {
            tokenFile: `monsterToken/skeleton.png`,
            shortname: "Skeleton",

            baseHealth: () => rollXD(2, 8) + 4,
            baseArmor: () => 13,
            initiativeBonus: 2
        },
        kobold: {
            tokenFile: `monsterToken/Kobold_u6elUK2.png`,
            shortname: "kobold",
            baseHealth: () => Math.max(rollXD(2, 6) - 2, 4),
            baseArmor: () => 12,
            initiativeBonus: 2
        },
        bugbear: {
            tokenFile: `monsterToken/bugbear/Bugbear Chief_TC1iFM8.png`,
            shortname: "bugbear",
            randomToken: [
                `monsterToken/bugbear/Bugbear Chief_TC1iFM8.png`,
                `monsterToken/bugbear/Bugbear1.png`,
                `monsterToken/bugbear/Bugbear2.png`,
                `monsterToken/bugbear/Bugbear3.png`,
                `monsterToken/bugbear/Bugbear4.png`,
                `monsterToken/bugbear/Bugbear5.png`
            ],
            baseHealth: () => Math.max(rollXD(5, 8) + 5, 20),
            baseArmor: () => 14 + (rollBinaryCommon() ? 2 : 0),
            initiativeBonus: 2
        },
        youngGreenDragon: {
            tokenFile: `monsterToken/Green Dragon Wyrmling_O72WpHn.png`,
            shortname: "JustInCase",
            baseHealth: () => Math.max(rollXD(16, 10) + 48, 140),
            baseArmor: () => 18,
            initiativeBonus: 1
        },
        wolf: {
            tokenFile: `monsterToken/wolf/Wolf_8xXaNbR.png`,
            randomToken: [
                `monsterToken/wolf/Wolf_8xXaNbR.png`,
                `monsterToken/wolf/Wolf1.png`,
                `monsterToken/wolf/Wolf2.png`,
                `monsterToken/wolf/Wolf3.png`,
                `monsterToken/wolf/Wolf4.png`,
                `monsterToken/wolf/Wolf5.png`,
                `monsterToken/wolf/Wolf6.png`
            ],
            shortname: "Wolf",
            baseHealth: () => Math.max(rollXD(2, 8) + 2, 8),
            baseArmor: () => 13,
            initiativeBonus: 2
        },
        owlbear: {
            tokenFile: `monsterToken/Owlbear_p7RG0z1.png`,
            shortname: "Owlbear",
            baseHealth: () => Math.max(rollXD(7, 10) + 21, 40),
            baseArmor: () => 13,
            initiativeBonus: 1
        },
        ghoul: {
            tokenFile: `monsterToken/Ghoul_iOmCIvm.png`,
            shortname: "Ghoul",

            baseHealth: () => Math.max(rollXD(5, 8), 16),
            baseArmor: () => 12,
            initiativeBonus: 2
        },
        hobgoblin: {
            tokenFile: `monsterToken/Hobgoblin Warlord_zHyI1cG.png`,
            shortname: "Hobgoblin",
            baseHealth: () => rollXD(2, 8) + 2,
            baseArmor: () => 16 + (rollBinaryCommon() ? 2 : 0),
            initiativeBonus: 1
        },

        ogre: {
            tokenFile: `monsterToken/Ogre_iFhtpMS.png`,
            shortname: "Ogre",
            baseHealth: () => Math.max(rollXD(7, 10) + 21, 40),
            baseArmor: () => 11,
            initiativeBonus: -1
        },
        stirge: {
            tokenFile: `monsterToken/Stirge_skKyJLp.png`,
            shortname: "Stirge",
            baseHealth: () => Math.max(rollXD(1, 4), 1),
            baseArmor: () => 14,
            initiativeBonus: 3
        },
        tarrasque: {
            tokenFile: `monsterToken/Tarrasque_vZWB5JP.png`,
            shortname: "Tarrasque",
            baseHealth: () => Math.max(rollXD(33, 20) + 330, 600),
            baseArmor: () => 25,
            initiativeBonus: 0
        }
    },
    player: {
        orcLady: {
            tokenFile: `playerToken/image74.png`,
            shortname: "Zune",
            baseHealth: () => 35,
            baseArmor: () => 15,
            initiativeBonus: 2
        },
        helmetGuy: {
            tokenFile: `playerToken/image138.png`,
            shortname: "Mort",
            baseHealth: () => 28,
            baseArmor: () => 19,
            initiativeBonus: 2
        },
        dragonBornDude: {
            tokenFile: `playerToken/image113.png`,
            shortname: "Alkrazor",
            baseHealth: () => 23,
            baseArmor: () => 16,
            initiativeBonus: 1
        },
        goblor: {
            tokenFile: `playerToken/goblor.png`,
            shortname: "Goblor",
            addBackground: true,
            baseHealth: () => 21,
            baseArmor: () => 14,
            initiativeBonus: 3
        },

        mustacheMan: {
            tokenFile: `playerToken/image37.png`,
            shortname: "Tove",
            baseHealth: () => 24,
            baseArmor: () => 11,
            initiativeBonus: -1
        }
    },
    npc: {
        dirtyPirate: {
            tokenFile: `playerToken/image45.png`,
            shortname: "DirtyPirate"
        },

        bustyHalfOrc: {
            tokenFile: `playerToken/image129.png`,
            shortname: "HalfOrcLady"
        },

        genericFighter: {
            tokenFile: `playerToken/image167.png`,
            shortname: "GenericFighter"
        },
        dwarfElf: {
            tokenFile: `playerToken/image161.png`,
            shortname: "DwarfElf"
        },

        wizardyOldGuy: {
            tokenFile: `playerToken/image137.png`,
            shortname: "WizardOG"
        },
        haflingRanger: {
            tokenFile: `playerToken/image111.png`,
            shortname: "HaflingRanger"
        },
        elfRogueBoy: {
            tokenFile: `playerToken/image92.png`,
            shortname: "ElfRogue"
        },
        haflingFemaleBard: {
            tokenFile: `playerToken/image91.png`,
            shortname: "HaflingFBard"
        },
        bandits: {
            tokenFile: `npcToken/bandit/Thug01.png`,
            shortname: "Bandits",
            randomToken: [
                `npcToken/bandit/Thug01.png`,
                `npcToken/bandit/Thug02.png`,
                `npcToken/bandit/Thug03.png`,
                `npcToken/bandit/Thug04.png`
            ],
            baseHealth: () => Math.max(rollXD(2, 8) + 2, 8),
            baseArmor: () => 12,
            initiativeBonus: 1
        },
        barmaids: {
            tokenFile: `npcToken/shops/barmaid.png`,
            shortname: "Barmaids",
            randomToken: [`npcToken/shops/barmaid.png`, `npcToken/shops/Barmaid3.png`]
        }
    }
};
