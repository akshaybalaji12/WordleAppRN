import React from 'react';
import { useEffect, useState } from 'react';
import { View, StyleSheet, Text, Image, TouchableOpacity, Modal } from 'react-native';
import { connect } from "react-redux";
import * as actions from '../actions';

import { width, height } from '../utils/constants';
import { Colors } from "../utils/constants";
import TimerComponent from './TimerComponent';

const StatsComponent = (props) => {
    
    const statsIcon = require('../../img/close_white.png');
    const arr = [0,1,2,3,4,5];
    let isEmpty = props.winDistributions.toString() === [0,0,0,0,0,0].toString();
    let maxWin = Math.max(...props.winDistributions);
    let graphContainerHeight = isEmpty ? 100 : 250;

    const onClosePressed = () => {
        props.setVisibility(false);
    }

    const renderGraphView = (row, index) => {

        let flex = props.winDistributions[index] === 0 ? 0.075 : (props.winDistributions[index] / maxWin);
        let viewColor = (props.isGameOver && row + 1 === props.currentRow) ? Colors.correctGuess : Colors.wrongGuess;

        return (

            <View style={styles.graphItem} key={row}>
                <Text style={[ styles.text, { fontSize: 12 } ]}>
                    {row+1}
                </Text>
                <View style={[ styles.graphBar, { flex: flex, backgroundColor: viewColor } ]}>
                    <Text style={[ styles.text, { fontFamily: 'ProductSansBold', fontSize: 12, marginEnd: 5 } ]}>
                        {props.winDistributions[index]}
                    </Text>
                </View>
            </View>
            
        )
    
    }

    const winPerc = props.played === 0 ? 0 : Math.round((props.wonGames / props.played) * 100);

    return (

        <Modal
            visible={props.isStatsVisible}
            animationType="slide"
            transparent={true}>

            <View style={styles.modalContainer}>
                <View style={styles.modalView}>
                    <TouchableOpacity onPress={onClosePressed} style={styles.imageContainer}>
                        <Image source={statsIcon} style={styles.image}/>
                    </TouchableOpacity>
                    <Text style={[styles.text, { fontSize: 20, textTransform: 'uppercase' }]}>Statistics</Text>
                    <View style={styles.statsView}>
                        <View style={styles.statView}>
                            <Text style={[styles.text, { fontSize: 20 }]}>{props.played}</Text>
                            <Text style={[styles.text, { fontSize: 12 }]}>Played</Text>
                        </View>
                        <View style={styles.statView}>
                            <Text style={[styles.text, { fontSize: 20 }]}>{winPerc}</Text>
                            <Text style={[styles.text, { fontSize: 12 }]} numberOfLines={2}>Win %</Text>
                        </View>
                        <View style={styles.statView}>
                            <Text style={[styles.text, { fontSize: 20 }]}>{props.currentStreak}</Text>
                            <Text style={[styles.text, { fontSize: 12 }]} numberOfLines={2}>Current Streak</Text>
                        </View>
                        <View style={styles.statView}>
                            <Text style={[styles.text, { fontSize: 20 }]}>{props.maxStreak}</Text>
                            <Text style={[styles.text, { fontSize: 12 }]} numberOfLines={2}>Max. Streak</Text>
                        </View>
                    </View>
                    <View style={[styles.graphContainer, { height: graphContainerHeight }]}>
                        <Text style={[styles.text, { fontSize: 20, textTransform: 'uppercase' }]}>Guess Distribution</Text>
                        {isEmpty && 
                        <Text style={[styles.text, { fontSize: 18, margin: 10 }]}>No Data</Text>}
                        {!isEmpty && 
                        arr.map((row, index) => {
                            return (
                                renderGraphView(row, index)
                            )
                        })}
                    </View>
                    {props.isGameOver &&
                    <View style={styles.timerView}>
                        <TimerComponent />
                    </View>}
                </View>
            </View>

        </Modal>

    )

}

function mapStateToProps(state) {
    return {
        isGameOver: state.gameState.isGameOver,
        currentRow: state.gameState.currentRow,
        isStatsVisible: state.stats.isStatsVisible,
        played: state.stats.playedGames,
        currentStreak: state.stats.currentStreak,
        maxStreak: state.stats.maxStreak,
        wonGames: state.stats.wonGames,
        winDistributions: state.stats.winDistributions
    };
}

export default connect(
    mapStateToProps,
    actions
)(StatsComponent);

const styles = StyleSheet.create({

    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: Colors.backgroundRGB,
    },

    modalView: {
        backgroundColor: Colors.background,
        height: height / 2,
        width: width - 50,
        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignItems: 'center',
        alignSelf: 'center',
        borderColor: Colors.white,
        borderWidth: 1,
        borderRadius: 5,
        padding: 20
    },

    statsView: {
        flex: 1,
        flexDirection: 'row',
        height: 70,
        justifyContent: 'space-evenly',
        alignItems: 'center'
    },

    statView: {
        justifyContent: 'center',
        alignItems: 'center',
        height: 70,
        width: 70,
        margin: 5
    },

    text: {
        fontFamily: 'ProductSans',
        color: Colors.white,
        textAlign: 'center'
    },

    timerView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        height: 200,
    },

    imageContainer: {
        height: 20,
        width: 20,
        alignSelf: 'flex-end',
        margin: 5
    },

    image: {
        height: 20,
        width: 20,
        padding: 5,
        resizeMode: 'contain',
    },

    graphContainer: {
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        width: width - 100,
        margin: 5
    },

    graphItem: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
        height: 30,
        width: width - 150,
        margin: 5
    },

    graphBar: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
        alignItems: 'center',
        height: 30,
        marginStart: 5
    },

})