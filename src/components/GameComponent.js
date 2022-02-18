import React from "react";
import { View, StyleSheet, Text} from "react-native";
import { connect } from "react-redux";
import * as actions from '../actions';

import { Colors, keys } from "../utils/constants";
import { width, height } from '../utils/constants';
import WordRow from "./WordRow";
import KeyboardRow from './KeyboardRow';

const GameComponent = (props) => {

    let isVisible = props.isInvalidGuess;

    const onEnterPressed = () => {

        if(props.guesses[props.currentRow].length < 5) {
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
            {isVisible ? 
            <View style={styles.solutionView}>
                <Text style={styles.solutionText}>Not enough letters!</Text>
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

    solutionView: {
        margin: 5,
        padding: 15,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: Colors.outline,
        borderRadius: 5
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