import { ACTION_TYPES } from "../utils/constants";

export const setVisibility = (isVisible) => {

    return { type: ACTION_TYPES.isStatsVisible, payload: isVisible }

}

export const setPlayedGames = (playedGames) => {

    return { type: ACTION_TYPES.playedGames, payload: playedGames };

}

export const setWonGames = (wonGames) => {

    return { type: ACTION_TYPES.wonGames, payload: wonGames };

}

export const setStreak = (streak) => {

    return { type: ACTION_TYPES.currentStreak, payload: streak };

}

export const setMaxStreak = (maxStreak) => {

    return { type: ACTION_TYPES.maxStreak, payload: maxStreak };

}

export const setDistribution = (payload) => {

    return { type: ACTION_TYPES.distribution, payload: payload };

}

export const setCurrentDate = (date) => {

    return { type: ACTION_TYPES.currentDate, payload: date };

}

export const setLastWon = (date) => {

    return { type: ACTION_TYPES.lastWon, payload: date };

}