import { combineReducers } from 'redux';
import gameStateReducer from './gameStateReducer';
import { ACTION_TYPES } from "../utils/constants";
import AsyncStorage from '@react-native-async-storage/async-storage';

const reducers = combineReducers({
    gameStateReducer
});

const rootReducer = (state, action) => {

    if(action === ACTION_TYPES.clearState) {
        AsyncStorage.removeItem('persist:root');
        state = undefined;
    }

    return reducers(state, action);

}

export default rootReducer;