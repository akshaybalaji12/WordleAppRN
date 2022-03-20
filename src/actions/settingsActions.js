import { ACTION_TYPES } from "../utils/constants";

export const setSettingsVisibility = (isVisible) => {
    
    return { type: ACTION_TYPES.isSettingsVisible, payload: isVisible }

}

export const setDarkMode = (isDarkMode) => {

    return { type: ACTION_TYPES.darkMode, payload: isDarkMode };

}

export const setHardMode = (isHardMode) => {

    return { type: ACTION_TYPES.hardMode, payload: isHardMode };

}

export const setContrastMode = (isContrastMode) => {

    return { type: ACTION_TYPES.contrastMode, payload: isContrastMode };

}