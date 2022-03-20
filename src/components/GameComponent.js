import React from "react";
import { useState } from "react";
import { View, StyleSheet, Text} from "react-native";
import { connect } from "react-redux";
import * as actions from '../actions';

import { Colors, keys, ColorModes } from "../utils/constants";
import { width, height } from '../utils/constants';
import WordRow from "./WordRow";
import KeyboardRow from './KeyboardRow';
import StatsComponent from "./StatsComponent";
import SettingsComponent from "./SettingsComponent";

import { solutions } from "../utils/solutions";
import { guessesSorted } from "../utils/guessesSorted";

import moment from 'moment';

const GameComponent = (props) => {
    
    const contrast = props.isContrastMode ? ColorModes.contrast : ColorModes.nonContrast;
    const theme = props.isDarkMode ? { ...ColorModes.dark, ...contrast } : { ...ColorModes.light, ...contrast }

    let isInvalidGuess = props.isInvalidGuess;
    let isChancesOver = props.currentRow > 5 && props.isGameOver;

    const [isMessageShown, setMessageShown] = useState(false);

    const onEnterPressed = () => {

        if(props.guesses[props.currentRow].length < 5) {
            props.setInvalidGuess(true);
        } else {
            checkGuess();
        }

    }

    const getErrorMessage = () => {
        
        return props.guesses[props.currentRow].length < 5 ? "Not enough letters" : "Not in word list";

    }

    const getWinningMessage = () => {

        setTimeout(() => {
            setMessageShown(false);
            props.setVisibility(true);
        }, 2500);

        switch(props.currentRow) {
            
            case 1:
                return "Genius";
                
            case 2:
                return "Magnificent";
                
            case 3:
                return "Impressive";
                
            case 4:
                return "Splendid";
                
            case 5:
                return "Great";
                
            case 6:
                return "Phew";

        }

    }

    const checkGuess = () => {

        let guessLetters = props.guesses[props.currentRow];
        let guessStatus = [-1, -1, -1, -1, -1];
        let solution = props.solution.split('');

        let currentRow = props.currentRow;
        let wonGames = props.wonGames;
        let playedGames = props.played;
        let currentStreak = props.currentStreak;
        let maxStreak = props.maxStreak;
        let winCount = props.winDistributions[currentRow] + 1;
        let payload = {
            row: currentRow,
            count: winCount
        };

        if(solutions.includes(guessLetters.join("")) || guessesSorted.includes(guessLetters.join(""))) {

            if(props.solution === guessLetters.join("")) {

                let todayDate = moment().utcOffset('+05:30').format('YYYY-MM-DD');

                guessStatus = [1,1,1,1,1];
                props.setGuessStatus(props.currentRow, guessStatus);
                props.setCurrentRow(currentRow + 1);
                props.setWonGames(wonGames + 1);
                props.setPlayedGames(playedGames + 1);
                props.setStreak(currentStreak + 1);
                props.setDistribution(payload);

                if(currentStreak >= maxStreak) {
                    props.setMaxStreak(currentStreak + 1);
                }

                guessLetters.forEach(letter => {
                    props.addCorrectLetter(letter);
                });

                props.setGameStatus(true);
                props.setLastWon(todayDate);
                setMessageShown(true);

                return;

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

                    if(guessStatus[index] != 1) {

                        guessStatus[index] = 0;
                        solution[position] = "";
                        setTimeout(() => {
                            props.addIncorrectLetter(letter);
                        }, 1400);

                    }

                }

            });
            
            props.setGuessStatus(props.currentRow, guessStatus);
            props.setCurrentRow(props.currentRow + 1);

            if(props.currentRow > 5) {

                props.setPlayedGames(props.played + 1);
                props.setGameStatus(true);
                props.setStreak(0);

            }

        } else {

            props.setInvalidGuess(true);

        }

    }

    return (

        <View style={styles(theme).container}>
            {props.isStatsVisible && <StatsComponent />}
            {props.isSettingsVisible && <SettingsComponent />}
            <View style={styles(theme).gameView}> 
                <WordRow rowId={0}/>
                <WordRow rowId={1} />
                <WordRow rowId={2} />
                <WordRow rowId={3} />
                <WordRow rowId={4} />
                <WordRow rowId={5} />
            </View>
            {isInvalidGuess ? 
            <View style={styles(theme).errorView}>
                <Text style={styles(theme).solutionText}>{getErrorMessage()}</Text>
            </View> 
            : null}
            {isMessageShown ? 
            <View style={styles(theme).errorView}>
                <Text style={styles(theme).solutionText}>{getWinningMessage()}</Text>
            </View> 
            : null}
            {isChancesOver ? 
            <View style={styles(theme).solutionView}>
                <Text style={styles(theme).solutionText}>The solution is {props.solution.toUpperCase()}</Text>
            </View> 
            : null}
            <View style={styles(theme).keyboardContainer}>
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
        isGameOver: state.gameState.isGameOver,
        solution: state.gameState.solution,
        guesses: state.gameState.guesses,
        currentRow: state.gameState.currentRow,
        correctLetters: state.gameState.correctLetters,
        incorrectLetters: state.gameState.incorrectLetters,
        isInvalidGuess: state.gameState.isInvalidGuess,
        played: state.stats.playedGames,
        currentStreak: state.stats.currentStreak,
        maxStreak: state.stats.maxStreak,
        wonGames: state.stats.wonGames,
        winDistributions: state.stats.winDistributions,
        isStatsVisible: state.stats.isStatsVisible,
        isSettingsVisible: state.settings.isSettingsVisible,
        isDarkMode: state.settings.isDarkMode,
        isContrastMode: state.settings.isContrastMode
    };
}

export default connect(
    mapStateToProps,
    actions
)(GameComponent);

const styles = (theme) => StyleSheet.create({
    
    container: {
        flex: 1,
        backgroundColor: theme.background,
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
        backgroundColor: theme.outline,
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
        color: theme.white,
        textAlign: 'center'
    },
    
    keyboardContainer: {
        backgroundColor: theme.background,
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