import React from 'react';
import { View, StyleSheet } from 'react-native';
import { width, height } from '../utils/constants';
import { Colors, keys } from "../utils/constants";
import { KeyboardRow } from './KeyboardRow';

export const GameKeyboard = (props) => {

    return (

        <View style={styles.container}>

            {keys.map((keyRows, index) => {

                return(
                    <KeyboardRow key={index} rowItems={keyRows} />
                )

            })}
            
        </View>

    )

}

const styles = StyleSheet.create({

    container: {
        backgroundColor: Colors.background,
        height: height / 5,
        width: width,
        paddingStart: 5,
        paddingEnd: 5,
        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignItems: 'center'
    },

})