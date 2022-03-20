import React from 'react';
import { View, Image, StyleSheet, TouchableOpacity, Text } from 'react-native';
import { connect } from "react-redux";
import * as actions from '../actions';

import { width, height } from '../utils/constants';
import { Colors, ColorModes } from "../utils/constants";

const AppHeader = (props) => {
    
    const contrast = props.isContrastMode ? ColorModes.contrast : ColorModes.nonContrast;
    const theme = props.isDarkMode ? { ...ColorModes.dark, ...contrast } : { ...ColorModes.light, ...contrast }

    const settingsIcon = require('../../img/settings_white.png');
    const statsIcon = require('../../img/stats_white.png');

    const onStatPressed = () => {

        props.setVisibility(true);

    }


    const onSettingsPressed = () => {

        props.setSettingsVisibility(true);

    }

    return (

        <View style={styles(theme).container}>

            <View style={styles(theme).imageContainer}/>

            <Text style={styles(theme).headerFont}>Wordle</Text>

            <View style={styles(theme).imageContainer}>
                <TouchableOpacity onPress={onStatPressed} style={{ width: 30, height: 30 }}>
                    <Image source={statsIcon} style={styles(theme).image}/>
                </TouchableOpacity>
                
                <TouchableOpacity onPress={onSettingsPressed} style={{ width: 30, height: 30 }}>
                    <Image source={settingsIcon} style={styles(theme).image}/>
                </TouchableOpacity>
            </View>
                    
            
            
        </View>
    )

}

function mapStateToProps(state) {
    return {
        isDarkMode: state.settings.isDarkMode,
        isContrastMode: state.settings.isContrastMode
    };
}

export default connect(
    mapStateToProps,
    actions
)(AppHeader);

const styles = (theme) => StyleSheet.create({

    container: {
        backgroundColor: theme.background,
        height: 50,
        width: width,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },

    headerFont: {
        fontFamily: 'ProductSansBold',
        color: theme.white,
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
        tintColor: theme.white
    }

})