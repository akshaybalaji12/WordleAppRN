import { Dimensions } from "react-native";

export const { width , height } = Dimensions.get("window");

export const keys = [
    ["q", "w", "e", "r", "t", "y", "u", "i", "o", "p"],
    ["a", "s", "d", "f", "g", "h", "j", "k", "l"],
    ["enter", "z", "x", "c", "v", "b", "n", "m", "delete"]
];

export const Colors = {

    white: "#fafafa",
    correctGuess: "#42713e",
    incorrectGuess: "#917f2f",
    wrongGuess: "#2c3032",
    correctGuessRGB: "rgb(66,113,62)",
    incorrectGuessRGB: "rgb(145,127,47)",
    wrongGuessRGB: "rgb(44,48,50)",
    background: "#0e0f10",
    backgroundRGB: "rgba(14,15,16, 0.5)",
    keyboardDefault: "#5e666a",
    outline: "#5e666a"

}

export const ACTION_TYPES = {
    gameStatus: "GAME_STATUS",
    setSolution: "SET_SOLUTION",
    setRow: "SET_CURRENT_ROW",
    setGuessStatus: "SET_GUESS_STATUS",
    addCorrectLetter: "ADD_CORRECT_LETTER",
    addIncorrectLetter: "ADD_INCORRECT_LETTER",
    addWrongLetter: "ADD_WRONG_LETTER",
    addGuess: "ADD_GUESS",
    removeGuess: "REMOVE_GUESS",
    isInvalid: "SET_INVALID_GUESS",
    clearState: "CLEAR_STATE",
    playedGames: "SET_PLAYED_GAMES",
    wonGames: "SET_WON_GAMES",
    currentStreak: "SET_STREAK",
    maxStreak: "SET_MAX_STREAK",
    isStatsVisible: "SET_STATS_VISIBLITY",
    distribution: "SET_DISTRIBUTION",
    currentDate: "SET_CURRENT_DATE",
    lastWon: "SET_LAST_WON"
}