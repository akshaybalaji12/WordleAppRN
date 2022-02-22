import React from 'react';
import { Provider } from 'react-redux';
import { store, persistor } from './src/store';
import { PersistGate } from 'redux-persist/integration/react';
import GameScreen from './src/screens/GameScreen';

export default function App() {

    return(

        <Provider store={store}>
            <PersistGate persistor={persistor}>
              <GameScreen />
            </PersistGate>
        </Provider>

    )

}
