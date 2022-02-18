import { createStore, compose, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import reducers from '../reducers';
import { persistStore, persistReducer } from 'redux-persist';
import AsyncStorage from '@react-native-async-storage/async-storage';

const persistConfig = {

    key: 'root',
    version: 0,
    storage: AsyncStorage

};

const persistedReducer = persistReducer(persistConfig, reducers);

export const store = createStore(persistedReducer, compose(applyMiddleware(thunk)));
export const persistor = persistStore(store);