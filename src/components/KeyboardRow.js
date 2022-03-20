import React from 'react';
import { View, Image, StyleSheet, TouchableOpacity, Text } from 'react-native';
import { connect } from "react-redux";
import * as actions from '../actions';

import { width, height } from '../utils/constants';
import { Colors, ColorModes } from "../utils/constants";

const KeyboardRow = (props) => {
    
    const contrast = props.isContrastMode ? ColorModes.contrast : ColorModes.nonContrast;
    const theme = props.isDarkMode ? { ...ColorModes.dark, ...contrast } : { ...ColorModes.light, ...contrast }

    const backspaceIcon = require('../../img/backspace_white.png');

    const onKeyPressed = (letter) => {

        let payload = {
            rowId: props.currentRow,
            value: letter
        }

        let currentGuesses = props.guesses;

        if(letter === 'delete') {

            try {
                if(currentGuesses[props.currentRow].length > 0){
                    props.removeGuess(payload);
                }
            } catch (error) {
                console.log('Index error');
            }

        } else if(letter === 'enter') {

            props.onEnterPressed();

        } else {
            
            try {
                if(currentGuesses[props.currentRow].length < 5){
                    props.addGuess(payload);
                }
            } catch (error) {
                console.log('Index error');
            }

        }

    }

    return (

        <View style={styles(theme).container}>

            {props.rowItems.map((key, index) => {

                let keyFontSize = (key === 'enter') ? 16 : 18;
                let keyWidth = (key === 'enter' || key === 'delete') ? 65 : 40;
                let keyColor = theme.keyboardDefault;

                if(props.correctLetters.includes(key)){
                    keyColor = theme.correctGuess;
                } else if(props.incorrectLetters.includes(key) && !props.correctLetters.includes(key)) {
                    keyColor = theme.incorrectGuess;
                } else if(props.wrongLetters.includes(key) && !props.correctLetters.includes(key)) {
                    keyColor = theme.wrongGuess;
                }
                
                return (
                    
                        <TouchableOpacity onPress={() => onKeyPressed(key)} disabled={props.isGameOver} key={index} style={[styles(theme).keyboardKey, { width: keyWidth, backgroundColor: keyColor }]}>
                            {key === 'delete' ? 
                            <Image source={backspaceIcon} style={[styles(theme).backspaceImage, { width: keyWidth - 40 }]}/> :
                            <Text style={[styles(theme).keyboardFont, { fontSize: keyFontSize }]}>{key}</Text>
                            }
                        </TouchableOpacity>

                )

            })}
            
        </View>

    )

}

function mapStateToProps(state) {
    return {
        guesses: state.gameState.guesses,
        currentRow: state.gameState.currentRow,
        correctLetters: state.gameState.correctLetters,
        incorrectLetters: state.gameState.incorrectLetters,
        wrongLetters: state.gameState.wrongLetters,
        isInvalidGuess: state.gameState.isInvalidGuess,
        isGameOver: state.gameState.isGameOver,
        isDarkMode: state.settings.isDarkMode,
        isContrastMode: state.settings.isContrastMode
    };
}

export default connect(
    mapStateToProps,
    actions
)(KeyboardRow);

const styles = (theme) => StyleSheet.create({

    container: {
        backgroundColor: theme.backgroundColor,
        height: (height / 15),
        width: width,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center'
    },

    keyboardKey: {
        justifyContent: 'center',
        alignItems: 'center',
        height: (height / 15) - 10,
        borderRadius: 5,
        margin: 4
    },

    keyboardFont: {
        fontFamily: 'ProductSans',
        color: Colors.white,
        textAlign: 'center',
        textTransform: 'uppercase'
    },

    backspaceImage: {
        height: (height / 15) - 30,
        padding: 5,
        resizeMode: 'contain',
        marginEnd: 5
    }

})