import { combineReducers } from 'redux';
import gameState from './gameState';
import stats from './stats';
import { ACTION_TYPES } from "../utils/constants";

const reducers = combineReducers({
    gameState,
    stats
});

const rootReducer = (state, action) => {

    if(action === ACTION_TYPES.clearState) {
        
        const { stats } = state;
        state = { stats };
        
    }

    return reducers(state, action);

}

export default rootReducer;