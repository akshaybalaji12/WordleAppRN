import React from 'react';
import { useEffect, useState } from 'react';
import { View, StyleSheet, Text, Animated } from 'react-native';
import { connect } from "react-redux";
import * as actions from '../actions';

import { width, height } from '../utils/constants';
import { Colors, ColorModes } from "../utils/constants";

const WordRow = (props) => {
    
    const contrast = props.isContrastMode ? ColorModes.contrast : ColorModes.nonContrast;
    const theme = props.isDarkMode ? { ...ColorModes.dark, ...contrast } : { ...ColorModes.light, ...contrast }

    const [shakeValue] = useState(new Animated.Value(0));
    let flipValuesArray = [];
    let translateValueArray = [];
    let interpolatedValuesFront = [];
    let interpolatedValuesBack = [];

    let colorFront = {
        backgroundColor: theme.background,
        borderColor: theme.outline
    }

    for(let i=0;i<5;i++) {
        flipValuesArray.push(new Animated.Value(0));
        translateValueArray.push(new Animated.Value(0));
    }

    const [flipValues] = useState(flipValuesArray);
    const [translateValues] = useState(translateValueArray);

    for(let i=0;i<5;i++) {

        let interpolateValueFront = flipValues[i].interpolate({
            inputRange: [0, 180],
            outputRange: ['0deg', '180deg'],
        });

        let interpolateValueBack = flipValues[i].interpolate({
            inputRange: [0, 180],
            outputRange: ['180deg', '360deg'],
        });

        interpolatedValuesFront.push(interpolateValueFront);
        interpolatedValuesBack.push(interpolateValueBack);

    }

    const animations = flipValues.map((value) => {

        return Animated.spring(value, {
            toValue: 180,
            friction: 8,
            tension: 10,
            useNativeDriver: true
        });

    });

    const translateAnimations = translateValues.map((value, index) => {

        return Animated.sequence([
            Animated.timing(value, { toValue: -20-(index * 0.1), duration: 100, useNativeDriver: true }),
            Animated.timing(value, { toValue: 0, duration: 100, useNativeDriver: true }),
            Animated.timing(value, { toValue: 10+(index * 0.1), duration: 100, useNativeDriver: true }),
            Animated.timing(value, { toValue: 0, duration: 100, useNativeDriver: true }),
        ]);

    });

    const getLetter = (index) => {

        try {
            return props.guesses[props.rowId][index];
        } catch (error) {
            return "";
        }

    }

    const getColorsBack = (index) => {

        let colors = {
            backgroundColor: theme.wrongGuess,
            borderColor: theme.wrongGuess
        }

        try {
            let status = props.guessStatus[props.rowId][index];
            switch(status) {

                case -1:
                    colors.backgroundColor = theme.wrongGuess;
                    colors.borderColor = theme.wrongGuess;
                    break;

                case 0:
                    colors.backgroundColor = theme.incorrectGuess;
                    colors.borderColor = theme.incorrectGuess;
                    break;
                
                case 1:
                    colors.backgroundColor = theme.correctGuess;
                    colors.borderColor = theme.correctGuess;
                    break;

                default:
                    colors.backgroundColor = theme.wrongGuess;
                    colors.borderColor = theme.wrongGuess;
                    break;

            }
        } catch (error) {
            
        }

        return colors;

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

    const correctGuessAnimation = () => {

        Animated.stagger(100, translateAnimations).start();

    }

    const flipAnimation = () => {

        Animated.stagger(300, animations).start();

    }

    useEffect(() => {

       if(props.rowId < props.currentRow) {
           flipAnimation();
       }

    }, []);

    useEffect(() => {

        if(props.isInvalidGuess && props.rowId === props.currentRow) {

            shakeAnimation();
            setTimeout(() => {
                props.setInvalidGuess(false);
            }, 1000);

        }

    }, [props.isInvalidGuess]);

    useEffect(() => {

        if(props.currentRow === (props.rowId + 1)) {
            flipAnimation();
        }

    }, [props.currentRow]);

    useEffect(() => {

        if(props.currentRow === (props.rowId + 1) && props.isGameOver) {

            setTimeout(() => {
                correctGuessAnimation();
            }, 1500);

        }

    }, [props.isGameOver]);

    return (

        <Animated.View style={[styles(theme).container, { transform: [{translateX: shakeValue}] }]}>

            <Animated.View style={[styles(theme).letterViewContainer, { transform: [{ translateY: translateValues[0] }] }]}>
                <Animated.View style={[styles(theme).frontView, { transform: [{rotateX: interpolatedValuesFront[0]}] }, colorFront]}>
                    <Text style={styles(theme).letterText}>{getLetter(0)}</Text>
                </Animated.View>
                <Animated.View style={[styles(theme).backView, { transform: [{rotateX: interpolatedValuesBack[0]}] }, getColorsBack(0)]}>
                    <Text style={styles(theme).letterTextBack}>{getLetter(0)}</Text>
                </Animated.View>
            </Animated.View>

            <Animated.View style={[styles(theme).letterViewContainer, { transform: [{ translateY: translateValues[1] }] }]}>
                <Animated.View style={[styles(theme).frontView, { transform: [{rotateX: interpolatedValuesFront[1]}] }, colorFront]}>
                    <Text style={styles(theme).letterText}>{getLetter(1)}</Text>
                </Animated.View>
                <Animated.View style={[styles(theme).backView, { transform: [{rotateX: interpolatedValuesBack[1]}] }, getColorsBack(1)]}>
                    <Text style={styles(theme).letterTextBack}>{getLetter(1)}</Text>
                </Animated.View>
            </Animated.View>
            
            <Animated.View style={[styles(theme).letterViewContainer, { transform: [{ translateY: translateValues[2] }] }]}>
                <Animated.View style={[styles(theme).frontView, { transform: [{rotateX: interpolatedValuesFront[2]}] }, colorFront]}>
                    <Text style={styles(theme).letterText}>{getLetter(2)}</Text>
                </Animated.View>
                <Animated.View style={[styles(theme).backView, { transform: [{rotateX: interpolatedValuesBack[2]}] }, getColorsBack(2)]}>
                    <Text style={styles(theme).letterTextBack}>{getLetter(2)}</Text>
                </Animated.View>
            </Animated.View>
            
            <Animated.View style={[styles(theme).letterViewContainer, { transform: [{ translateY: translateValues[3] }] }]}>
                <Animated.View style={[styles(theme).frontView, { transform: [{rotateX: interpolatedValuesFront[3]}] }, colorFront]}>
                    <Text style={styles(theme).letterText}>{getLetter(3)}</Text>
                </Animated.View>
                <Animated.View style={[styles(theme).backView, { transform: [{rotateX: interpolatedValuesBack[3]}] }, getColorsBack(3)]}>
                    <Text style={styles(theme).letterTextBack}>{getLetter(3)}</Text>
                </Animated.View>
            </Animated.View>

            <Animated.View style={[styles(theme).letterViewContainer, { transform: [{ translateY: translateValues[4] }] }]}>
                <Animated.View style={[styles(theme).frontView, { transform: [{rotateX: interpolatedValuesFront[4]}] }, colorFront]}>
                    <Text style={styles(theme).letterText}>{getLetter(4)}</Text>
                </Animated.View>
                <Animated.View style={[styles(theme).backView, { transform: [{rotateX: interpolatedValuesBack[4]}] }, getColorsBack(4)]}>
                    <Text style={styles(theme).letterTextBack}>{getLetter(4)}</Text>
                </Animated.View>
            </Animated.View>

        </Animated.View>

    )

}

function mapStateToProps(state) {
    return {
        guesses: state.gameState.guesses,
        guessStatus: state.gameState.guessStatus,
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
)(WordRow);

const styles = (theme) => StyleSheet.create({

    container: {
        backgroundColor: theme.background,
        height: 80,
        width: width - 20,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center'
    },

    letterViewContainer: {
        height: 70,
        width: 70,
        marginStart: 3,
        marginEnd: 3
    },

    frontView: {
        justifyContent: 'center',
        alignItems: 'center',
        height: 70,
        width: 70,
        borderWidth: 2,
        borderRadius: 2,
        position: 'absolute',
        top: 0
    },

    backView: {
        justifyContent: 'center',
        alignItems: 'center',
        height: 70,
        width: 70,
        borderWidth: 2,
        borderRadius: 2,
        backfaceVisibility: 'hidden'
    },

    letterText: {
        fontFamily: 'ProductSansBold',
        color: theme.white,
        textAlign: 'center',
        fontSize: 40,
        textTransform: 'uppercase'
    },

    letterTextBack: {
        fontFamily: 'ProductSansBold',
        color: Colors.white,
        textAlign: 'center',
        fontSize: 40,
        textTransform: 'uppercase'
    }

})