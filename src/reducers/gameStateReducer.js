import { ACTION_TYPES } from "../utils/constants";

const INITIAL_STATE = { 

    isGameOver: false,
    solution: "champ",
    currentRow: 0,
    guesses: [
        [], [], [], [], [], []
    ],
    correctLetters: [],
    incorrectLetters: [],
    wrongLetters: [],
    isInvalidGuess: false,
    
};

export default function(state = INITIAL_STATE, action) {

    switch(action.type) {

        case ACTION_TYPES.gameStatus:
            return {
                ...state,
                isGameOver: action.payload
            }

        case ACTION_TYPES.setSolution:
            return {
                ...state,
                solution: action.payload
            }

        case ACTION_TYPES.setRow:
            return {
                ...state,
                currentRow: action.payload
            }

        case ACTION_TYPES.setGuesses:
            return {
                ...state,
                guesses: action.payload
            }

        case ACTION_TYPES.addGuess:

            let guesses = [...state.guesses];
            guesses[action.payload.rowId].push(action.payload.value);

            return {
                ...state,
                guesses
            }

        case ACTION_TYPES.removeGuess:

            guesses = [...state.guesses];
            guesses[action.payload.rowId].pop();

            return {
                ...state,
                guesses
            }

        case ACTION_TYPES.addCorrectLetter:

            let correctLetters = [...state.correctLetters];
            correctLetters.push(payload);

            return {
                ...state,
                correctLetters
            }

        case ACTION_TYPES.addIncorrectLetter:

            let incorrectLetters = [...state.incorrectLetters];
            incorrectLetters.push(payload);

            return {
                ...state,
                incorrectLetters
            }
                
        case ACTION_TYPES.addWrongLetter:

            let wrongLetters = [...state.wrongLetters];
            wrongLetters.push(payload);

            return {
                ...state,
                wrongLetters
            }

        case ACTION_TYPES.isInvalid:

            return {
                ...state,
                isInvalidGuess: action.payload
            }

        default:
            return state;

    }

}