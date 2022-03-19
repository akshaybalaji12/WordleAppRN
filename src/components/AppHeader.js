import React from 'react';
import { View, Image, StyleSheet, TouchableOpacity, Text } from 'react-native';
import { connect } from "react-redux";
import * as actions from '../actions';

import { width, height } from '../utils/constants';
import { Colors } from "../utils/constants";

const AppHeader = (props) => {

    const settingsIcon = require('../../img/settings_white.png');
    const statsIcon = require('../../img/stats_white.png');

    const onStatPressed = () => {

        props.setVisibility(true);

    }

    return (

        <View style={styles.container}>

            <View style={styles.imageContainer}/>

            <Text style={styles.headerFont}>Wordle</Text>

            <View style={styles.imageContainer}>
                <TouchableOpacity onPress={onStatPressed} style={{ width: 30, height: 30 }}>
                    <Image source={statsIcon} style={styles.image}/>
                </TouchableOpacity>
                
                <TouchableOpacity style={{ width: 30, height: 30 }}>
                    <Image source={settingsIcon} style={styles.image}/>
                </TouchableOpacity>
            </View>
                    
            
            
        </View>

    )

}

function mapStateToProps(state) {
    return {
    };
}

export default connect(
    mapStateToProps,
    actions
)(AppHeader);

const styles = StyleSheet.create({

    container: {
        backgroundColor: Colors.background,
        height: 50,
        width: width,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },

    headerFont: {
        fontFamily: 'ProductSansBold',
        color: Colors.white,
        textAlign: 'center',
        fontSize: 30
    },

    imageContainer: {
        flexDirection:'row',
        justifyContent: 'space-evenly',
        alignItems: 'center',
        height: 40,
        width: 100
    },

    image: {
        height: 30,
        width: 30,
        padding: 5,
        resizeMode: 'contain',
    }

})