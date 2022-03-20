import { ACTION_TYPES } from "../utils/constants";

const INITIAL_STATE = { 

    isSettingsVisible: false,
    isDarkMode: false,
    isHardMode: true,
    isContrastMode: false,
    
};

export default function(state = INITIAL_STATE, action) {

    switch(action.type) {

        case ACTION_TYPES.isSettingsVisible:

            return {
                ...state,
                isSettingsVisible: action.payload
            }

        case ACTION_TYPES.darkMode:
            return {
                ...state,
                isDarkMode: action.payload
            }

        case ACTION_TYPES.hardMode:
            return {
                ...state,
                isHardMode: action.payload
            }

        case ACTION_TYPES.contrastMode:

            return {
                ...state,
                isContrastMode: action.payload
            }

        default:
            return state;

    }

}