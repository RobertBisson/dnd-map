export const getRandomInt = (min, max) => {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
};

export const rollD = (max: number) => getRandomInt(1, max);

export const rollBinary = () => Math.random() < 0.5;

export const rollBinaryRare = () => Math.random() < 0.25;
export const rollBinaryCommon = () => Math.random() < 0.75;

export const rollXD = (numDice: number, max: number) => {
    let i = 0;
    let diceTotal = 0;
    while (i < numDice) {
        diceTotal += rollD(max);
        i++;
    }
    return diceTotal;
};
