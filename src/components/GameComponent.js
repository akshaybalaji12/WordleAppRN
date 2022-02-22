import React from "react";
import { useEffect } from "react";
import { View, StyleSheet, Text} from "react-native";
import { connect } from "react-redux";
import * as actions from '../actions';

import { Colors, keys } from "../utils/constants";
import { width, height } from '../utils/constants';
import WordRow from "./WordRow";
import KeyboardRow from './KeyboardRow';

import { solutions } from "../utils/solutions";

const GameComponent = (props) => {

    let isInvalidGUess = props.isInvalidGuess;
    let isChancesOver = props.currentRow > 5 && !props.isGameOver;
    let errorMessage = props.guesses[props.currentRow].length < 5 ? "Not enough letters" : "Not in word list";

    const onEnterPressed = () => {

        if(props.guesses[props.currentRow].length < 5) {
            props.setInvalidGuess(true);
        } else {
            checkGuess();
        }

    }

    const checkGuess = () => {

        let guessLetters = props.guesses[props.currentRow];
        let guessStatus = [-1, -1, -1, -1, -1];
        let solution = props.solution.split('');

        if(solutions.includes(guessLetters.join(""))) {

            if(props.solution === guessLetters.join("")) {
                guessStatus = [1,1,1,1,1];
                props.setGuessStatus(props.currentRow, guessStatus);
                props.setCurrentRow(props.currentRow + 1);
                props.setGameStatus(true);
            }

            for(let i=0; i<5; i++) {
                if(solution[i] === guessLetters[i]) {
                    guessStatus[i] = 1;
                    setTimeout(() => {
                        props.addCorrectLetter(guessLetters[i]);
                    }, 1400);
                    solution[i] = "";
                }
            }

            props.guesses[props.currentRow].forEach((letter, index) => {
                
                let correctIndex = props.correctLetters.indexOf(letter);
                let incorrectIndex = props.incorrectLetters.indexOf(letter);
                let position = solution.indexOf(letter);

                if(position === -1) {

                    if(correctIndex === -1 && incorrectIndex === -1) {
                        setTimeout(() => {
                            if(correctIndex === -1 && incorrectIndex === -1) {
                                props.addWrongLetter(letter);
                            }
                        }, 1400);
                    }

                } else if(position === index) {

                    //Do nothing

                } else {

                    guessStatus[index] = 0;
                    solution[position] = "";
                    setTimeout(() => {
                        props.addIncorrectLetter(letter);
                    }, 1400);

                }

            });
            
            props.setGuessStatus(props.currentRow, guessStatus);
            props.setCurrentRow(props.currentRow + 1);

        } else {

            props.setInvalidGuess(true);

        }

    }

    return (

        <View style={styles.container}>
            <View style={styles.gameView}> 
                <WordRow rowId={0}/>
                <WordRow rowId={1} />
                <WordRow rowId={2} />
                <WordRow rowId={3} />
                <WordRow rowId={4} />
                <WordRow rowId={5} />
            </View>
            {isInvalidGUess ? 
            <View style={styles.errorView}>
                <Text style={styles.solutionText}>{errorMessage}</Text>
            </View> 
            : null}
            {isChancesOver ? 
            <View style={styles.solutionView}>
                <Text style={styles.solutionText}>The solution is {props.solution.toUpperCase()}</Text>
            </View> 
            : null}
            <View style={styles.keyboardContainer}>
                {keys.map((keyRows, index) => {
                    return(
                        <KeyboardRow onEnterPressed={onEnterPressed} key={index} rowItems={keyRows}/>
                    )
                })}
            </View>
        </View>

    )

}

function mapStateToProps(state) {
    return {
        isGameOver: state.gameStateReducer.isGameOver,
        solution: state.gameStateReducer.solution,
        guesses: state.gameStateReducer.guesses,
        currentRow: state.gameStateReducer.currentRow,
        correctLetters: state.gameStateReducer.correctLetters,
        incorrectLetters: state.gameStateReducer.incorrectLetters,
        isInvalidGuess: state.gameStateReducer.isInvalidGuess
    };
}

export default connect(
    mapStateToProps,
    actions
)(GameComponent);

const styles = StyleSheet.create({
    
    container: {
        flex: 1,
        backgroundColor: Colors.background,
        flexDirection: 'column',
        justifyContent: 'space-between',
        alignItems: 'center',
    },

    gameView: {
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 50
    },

    errorView: {
        margin: 5,
        padding: 15,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: Colors.outline,
        borderRadius: 5
    },

    solutionView: {
        margin: 5,
        padding: 15,
        justifyContent: 'center',
        alignItems: 'center',
    },

    solutionText: {
        fontFamily: 'ProductSansBold',
        fontSize: 20,
        color: Colors.white,
        textAlign: 'center'
    },
    
    keyboardContainer: {
        backgroundColor: Colors.background,
        height: height / 5,
        width: width,
        paddingStart: 5,
        paddingEnd: 5,
        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignItems: 'center',
        marginBottom: 20
    },

})