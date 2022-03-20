import { combineReducers } from 'redux';
import gameState from './gameState';
import stats from './stats';
import settings from './settings'
import { ACTION_TYPES } from "../utils/constants";

const reducers = combineReducers({
    gameState,
    stats,
    settings
});

const rootReducer = (state, action) => {

    if(action === ACTION_TYPES.clearState) {
        
        const { stats, settings } = state;
        state = { stats, settings };
        
    }

    return reducers(state, action);

}

export default rootReducer;