import { ACTION_TYPES } from "../utils/constants";


export const setSolution = (solution) => {

    return { type: ACTION_TYPES.setSolution, payload: solution };

}

export const setGameStatus = (gameStatus) => {

    return { type: ACTION_TYPES.gameStatus, payload: gameStatus };

}

export const setCurrentRow = (rowNo) => {

    return { type: ACTION_TYPES.setRow, payload: rowNo };

}

export const addCorrectLetter = (correctLetter) => {

    return { type: ACTION_TYPES.addCorrectLetter, payload: correctLetter };

}

export const addIncorrectLetter = (incorrectLetter) => {

    return { type: ACTION_TYPES.addIncorrectLetter, payload: incorrectLetter };

}

export const addWrongLetter = (wrongLetter) => {

    return { type: ACTION_TYPES.addWrongLetter, payload: wrongLetter };

}

export const setGuesses = (guesses) => {

    return { type: ACTION_TYPES.setGuesses, payload: guesses };

}

export const addGuess = (payload) => {

    return { type: ACTION_TYPES.addGuess, payload: payload };

}

export const removeGuess = (payload) => {

    return { type: ACTION_TYPES.removeGuess, payload: payload };

}

export const setInvalidGuess = (isInvalid) => {

    return { type: ACTION_TYPES.isInvalid, payload: isInvalid };

}