import React from "react";
import { View, StatusBar, StyleSheet, Text } from "react-native";

import { Colors } from "../utils/constants";
import { GameKeyboard } from "../components/GameKeyboard";

export default class GameScreen extends React.Component {

    constructor(props) {
        super(props);
        this.state = {

        };

    }

    render() {

        return (

            <View style={styles.container}>
                <StatusBar backgroundColor={Colors.background} />
                <Text style={styles.heading}>Wordle</Text>
                <GameKeyboard />
            </View>

        )

    }

}


const styles = StyleSheet.create({
    
    container: {
        flex: 1,
        backgroundColor: Colors.background,
        flexDirection: 'column',
        justifyContent: 'space-between',
        alignItems: 'center',
    },

    heading: {
        color: Colors.white,
        fontSize: 20,
        fontFamily: 'ProductSansBold',
        textAlign: 'center',
        margin: 10
    }

})