import React from "react";
import { View, StatusBar, StyleSheet, Text } from "react-native";
import { connect } from "react-redux";
import * as actions from '../actions';

import { Colors } from "../utils/constants";
import GameComponent from "../components/GameComponent";

import { solutions } from "../utils/solutions";

class GameScreen extends React.Component {

    constructor(props) {
        super(props);
        this.state = {

        };

    }

    componentDidMount = () => {

        if(this.props.isGameOver || this.props.solution === "") {
            this.props.clearState();
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


    render() {

        return (

            <View style={styles.container}>
                <StatusBar backgroundColor={Colors.background} />
                <Text style={styles.heading}>WORDLE</Text>
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
        isGameOver: state.gameStateReducer.isGameOver,
        solution: state.gameStateReducer.solution
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