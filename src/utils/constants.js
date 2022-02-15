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
    background: "#0e0f10",
    keyboardDefault: "#5e666a",
    outline: "#5e666a"

}