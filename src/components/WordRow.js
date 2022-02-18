import React from 'react';
import { useEffect, useState } from 'react';
import { View, StyleSheet, Text, Animated } from 'react-native';
import { connect } from "react-redux";
import * as actions from '../actions';

import { width, height } from '../utils/constants';
import { Colors } from "../utils/constants";

const WordRow = (props) => {

    const [shakeValue] = useState(new Animated.Value(0));

    const getLetter = (index) => {

        try {
            return props.guesses[props.rowId][index];
        } catch (error) {
            return "";
        }

    }

    const shakeAnimation = () => {

        Animated.sequence([
            Animated.timing(shakeValue, { toValue: 10, duration: 50, useNativeDriver: true }),
            Animated.timing(shakeValue, { toValue: -10, duration: 50, useNativeDriver: true }),
            Animated.timing(shakeValue, { toValue: 10, duration: 50, useNativeDriver: true }),
            Animated.timing(shakeValue, { toValue: -10, duration: 50, useNativeDriver: true }),
            Animated.timing(shakeValue, { toValue: 10, duration: 50, useNativeDriver: true }),
            Animated.timing(shakeValue, { toValue: -10, duration: 50, useNativeDriver: true }),
            Animated.timing(shakeValue, { toValue: 0, duration: 50, useNativeDriver: true }),
        ]).start();

    }

    useEffect(() => {

        if(props.isInvalidGuess && props.rowId === props.currentRow) {

            shakeAnimation();
            setTimeout(() => {
                props.setInvalidGuess(false);
            }, 1000);

        }

    }, [props.isInvalidGuess])

    return (

        <Animated.View style={[styles.container, { transform: [{translateX: shakeValue}] }]}>
            <View style={styles.letterView}>
                <Text style={styles.letterText}>{getLetter(0)}</Text>
            </View>
            <View style={styles.letterView}>
                <Text style={styles.letterText}>{getLetter(1)}</Text>
            </View>
            <View style={styles.letterView}>
                <Text style={styles.letterText}>{getLetter(2)}</Text>
            </View>
            <View style={styles.letterView}>
                <Text style={styles.letterText}>{getLetter(3)}</Text>
            </View>
            <View style={styles.letterView}>
                <Text style={styles.letterText}>{getLetter(4)}</Text>
            </View>
        </Animated.View>

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
)(WordRow);

const styles = StyleSheet.create({

    container: {
        backgroundColor: Colors.backgroundColor,
        height: 80,
        width: width - 20,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center'
    },

    letterView: {
        justifyContent: 'center',
        alignItems: 'center',
        height: 70,
        width: 70,
        borderColor: Colors.outline,
        borderWidth: 2,
        margin: 3,
    },

    letterText: {
        fontFamily: 'ProductSansBold',
        color: Colors.white,
        textAlign: 'center',
        fontSize: 20,
        textTransform: 'uppercase'
    }

})