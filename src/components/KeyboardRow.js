import React from 'react';
import { View, Image, StyleSheet, TouchableOpacity, Text } from 'react-native';
import { width, height } from '../utils/constants';
import { Colors } from "../utils/constants";

const KeyboardKeys = (props) => {

    let keyFontSize = (props.value === 'enter' | props.value === 'delete') ? 12 : 18;
    let keyWidth = (props.value === 'enter' | props.value === 'delete') ? 65 : 40;
    console.log(props.value);

    return (

        <TouchableOpacity style={[styles.keyboardKey, { width: keyWidth }]}>
            <Text style={[styles.keyboardFont, { fontSize: keyFontSize }]}>{props.value.toUpperCase()}</Text>
        </TouchableOpacity>

    )

}

export const KeyboardRow = (props) => {

    return (

        <View style={styles.container}>

            {props.rowItems.map((key, index) => {

                return (
                    <KeyboardKeys key={index} value={key} />
                )

            })}
            
        </View>

    )

}

const styles = StyleSheet.create({

    container: {
        backgroundColor: Colors.backgroundColor,
        height: (height / 15),
        width: width,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center'
    },

    keyboardKey: {
        justifyContent: 'center',
        backgroundColor: Colors.keyboardDefault,
        height: (height / 15) - 10,
        borderRadius: 5,
        margin: 4
    },

    keyboardFont: {
        fontFamily: 'ProductSans',
        color: Colors.white,
        textAlign: 'center'
    }

})