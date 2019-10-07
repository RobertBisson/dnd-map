export const CharacterReducer = (state: any = { activeChar: null }, action: any) => {
    switch (action.type) {
        case "Character/SET_ACTIVE":
            return { ...state, activeChar: action.token };

        case "Character/RESET":
            return { ...state, activeChar: null };
        default:
            return { ...state };
    }
};
