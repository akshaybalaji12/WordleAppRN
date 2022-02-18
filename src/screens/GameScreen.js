import React from "react";
import { View, StatusBar, StyleSheet, Text } from "react-native";
import { connect } from "react-redux";
import * as actions from '../actions';

import { Colors } from "../utils/constants";
import GameComponent from "../components/GameComponent";

class GameScreen extends React.Component {

    constructor(props) {
        super(props);
        this.state = {

        };

    }

    componentDidMount = () => {
    }

    render() {

        return (

            <View style={styles.container}>
                <StatusBar backgroundColor={Colors.background} />
                <Text style={styles.heading}>WORDLE</Text>
                <GameComponent />
            </View>

        )

    }

}

function mapStateToProps(state) {
    return {
        guesses: state.gameStateReducer.guesses,
        currentRow: state.gameStateReducer.currentRow
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