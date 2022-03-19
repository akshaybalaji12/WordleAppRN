import { ACTION_TYPES } from "../utils/constants";

const INITIAL_STATE = { 

    isStatsVisisble: false,
    wonGames: 0,
    playedGames: 0,
    currentStreak: 0,
    maxStreak: 0,
    winDistributions: [
        0,0,0,0,0,0
    ],
    currentDate: "",
    lastWon: ""
    
};

export default function(state = INITIAL_STATE, action) {

    switch(action.type) {

        case ACTION_TYPES.isStatsVisible:
            return {
                ...state,
                isStatsVisible: action.payload
            }

        case ACTION_TYPES.playedGames:
            return {
                ...state,
                playedGames: action.payload
            }

        case ACTION_TYPES.wonGames:
            return {
                ...state,
                wonGames: action.payload
            }

        case ACTION_TYPES.currentStreak:

            return {
                ...state,
                currentStreak: action.payload
            }

        case ACTION_TYPES.maxStreak:

            return {
                ...state,
                maxStreak: action.payload
            }

        case ACTION_TYPES.distribution:

            let winDistributions = [...state.winDistributions];
            winDistributions[action.payload.row] = action.payload.count;
            return {
                ...state,
                winDistributions
            }

        case ACTION_TYPES.currentDate:
            return {
                ...state,
                currentDate: action.payload
            }

        case ACTION_TYPES.lastWon:
            return {
                ...state,
                lastWon: action.payload
            }
            
        default:
            return state;

    }

}