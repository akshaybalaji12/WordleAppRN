import React from "react";
import { View, StatusBar, StyleSheet, Text } from "react-native";
import { connect } from "react-redux";
import * as actions from '../actions';

import { Colors } from "../utils/constants";
import AppHeader from "../components/AppHeader";
import GameComponent from "../components/GameComponent";

import { solutions } from "../utils/solutions";

import moment from 'moment';

class GameScreen extends React.Component {

    constructor(props) {
        super(props);
        this.state = {

        };

    }

    componentDidMount = () => {

        let todayDate = moment().utcOffset('+05:30').format('YYYY-MM-DD');
        
        if(this.props.currentDate === todayDate && this.props.isGameOver) {
        
            setTimeout(() => {
                
                this.props.setVisibility(true);

            }, 2000);

        }

        if(this.props.currentDate !== todayDate || this.props.solution === "") {

            if(!this.props.isGameOver && this.props.solution !== "") {
                this.props.setPlayedGames(this.props.played + 1);
                this.props.setStreak(0);
            }

            this.props.clearState();
            this.props.setCurrentDate(todayDate);
            let difference = moment.duration(moment(todayDate).diff(moment(this.props.lastWon)));
            if(difference > 2) {
                this.props.setStreak(0);
            }

            setTimeout(() => {
                
                this.props.setGameStatus(false);
                let size = solutions.length;
                let index = Math.floor(Math.random() * size);
                console.log('In new game');
                console.log('Solution is ' + solutions[index]);
                this.props.setSolution(solutions[index]);

            }, 1000);
        }

    }

    componentDidUpdate = (prevProps) => {

        if(prevProps.currentDate != this.props.currentDate && prevProps.solution !== "") {

            this.props.clearState();
            this.props.setGameStatus(false);
            let size = solutions.length;
            let index = Math.floor(Math.random() * size);
            console.log('In new game');
            console.log('Solution is ' + solutions[index]);
            this.props.setSolution(solutions[index]);
            this.props.setVisibility(false);

        }

    }


    render() {

        return (

            <View style={styles.container}>
                <StatusBar backgroundColor={Colors.background} />
                <AppHeader />
                {
                    this.props.solution !== '' &&
                    <GameComponent />
                }
                {
                    this.props.solution === '' &&
                    <Text style={[styles.heading, { fontSize: 25, margin: 150 }]}>
                        Setting up game...
                    </Text>
                }
            </View>

        )

    }

}

function mapStateToProps(state) {
    return {
        isGameOver: state.gameState.isGameOver,
        solution: state.gameState.solution,
        lastWon: state.stats.lastWon,
        currentDate: state.stats.currentDate,
        played: state.stats.playedGames,
    };
}

export default connect(
    mapStateToProps,
    actions
)(GameScreen);


const styles = StyleSheet.create({
    
    container: {
        flex: 1,
        backgroundColor: Colors.background,
        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignItems: 'center',
    },

    heading: {
        color: Colors.white,
        fontSize: 30,
        fontFamily: 'ProductSansBold',
        textAlign: 'center',
        margin: 10
    },

})