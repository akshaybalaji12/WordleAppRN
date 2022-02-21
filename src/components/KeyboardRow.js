import React from 'react';
import { View, Image, StyleSheet, TouchableOpacity, Text } from 'react-native';
import { connect } from "react-redux";
import * as actions from '../actions';

import { width, height } from '../utils/constants';
import { Colors } from "../utils/constants";

const KeyboardRow = (props) => {

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

        <View style={styles.container}>

            {props.rowItems.map((key, index) => {

                let keyFontSize = (key === 'enter') ? 16 : 18;
                let keyWidth = (key === 'enter' || key === 'delete') ? 65 : 40;
                let keyColor = Colors.keyboardDefault;
                let isDisabled = false;

                if(props.correctLetters.includes(key)){
                    keyColor = Colors.correctGuess;
                } else if(props.incorrectLetters.includes(key)) {
                    keyColor = Colors.incorrectGuess;
                } else if(props.wrongLetters.includes(key)) {
                    isDisabled = true;
                    keyColor = Colors.wrongGuess;
                }
                
                return (
                    
                        <TouchableOpacity onPress={() => onKeyPressed(key)} disabled={isDisabled} key={index} style={[styles.keyboardKey, { width: keyWidth, backgroundColor: keyColor }]}>
                            {key === 'delete' ? 
                            <Image source={backspaceIcon} style={[styles.backspaceImage, { width: keyWidth - 40 }]}/> :
                            <Text style={[styles.keyboardFont, { fontSize: keyFontSize }]}>{key}</Text>
                            }
                        </TouchableOpacity>

                )

            })}
            
        </View>

    )

}

function mapStateToProps(state) {
    return {
        guesses: state.gameStateReducer.guesses,
        currentRow: state.gameStateReducer.currentRow,
        correctLetters: state.gameStateReducer.correctLetters,
        incorrectLetters: state.gameStateReducer.incorrectLetters,
        wrongLetters: state.gameStateReducer.wrongLetters,
        isInvalidGuess: state.gameStateReducer.isInvalidGuess
    };
}

export default connect(
    mapStateToProps,
    actions
)(KeyboardRow);

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