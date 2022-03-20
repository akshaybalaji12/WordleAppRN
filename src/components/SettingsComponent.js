import React from 'react';
import { View, StyleSheet, Text, Image, TouchableOpacity, Modal, Switch, Linking } from 'react-native';
import { connect } from "react-redux";
import * as actions from '../actions';

import { width, height } from '../utils/constants';
import { Colors, ColorModes } from "../utils/constants";

const SettingsComponent = (props) => {
    
    const contrast = props.isContrastMode ? ColorModes.contrast : ColorModes.nonContrast;
    const theme = props.isDarkMode ? { ...ColorModes.dark, ...contrast } : { ...ColorModes.light, ...contrast }

    const closeIcon = require('../../img/close_white.png');
    const faqURL = "https://help.nytimes.com/hc/en-us/articles/360029050872-Word-Games-and-Logic-Puzzles#h_01FVGCB2Z00ZQMDMCYWBPWJNXB";

    const onClosePressed = () => {
        props.setSettingsVisibility(false);
    }

    const onFAQPressed = () => {

        Linking.canOpenURL(faqURL).then(() => {
            Linking.openURL(faqURL);
        })

    }

    const onSwitchPressed = (id) => {
        switch(id) {
            case 0:
                props.setHardMode(!props.isHardMode);
                break;

            case 1:
                props.setDarkMode(!props.isDarkMode);
                break;

            case 2:
                props.setContrastMode(!props.isContrastMode);
                break;
        }
    }

    return (

        <Modal
            visible={true}
            animationType="slide">

            <View style={styles(theme).modalContainer}>
                <TouchableOpacity onPress={onClosePressed} style={styles(theme).imageContainer}>
                    <Image source={closeIcon} style={styles(theme).image}/>
                </TouchableOpacity>
                <Text style={[styles(theme).text, { fontSize: 20, textTransform: 'uppercase', marginBottom: 10, marginTop: 30 }]}>Settings</Text>
                <View style={styles(theme).settingView}>
                    <Text style={styles(theme).text}>Hard Mode</Text>
                    <Switch 
                        value={props.isHardMode}
                        onValueChange={() => onSwitchPressed(0)}
                        thumbColor={props.isHardMode ? theme.correctGuess : theme.outline}
                        trackColor={{ false: theme.keyboardDefault, true: theme.switchTrue }}
                    />
                </View>
                <View style={styles(theme).settingView}>
                    <Text style={styles(theme).text}>Dark Mode</Text>
                    <Switch 
                        value={props.isDarkMode}
                        onValueChange={() => onSwitchPressed(1)}
                        thumbColor={props.isDarkMode ? theme.correctGuess : theme.outline}
                        trackColor={{ false: theme.keyboardDefault, true: theme.switchTrue }}
                    />
                </View>
                <View style={styles(theme).settingView}>
                    <Text style={styles(theme).text}>High Contrast Mode</Text>
                    <Switch 
                        value={props.isContrastMode}
                        onValueChange={() => onSwitchPressed(2)}
                        thumbColor={props.isContrastMode ? theme.correctGuess : theme.outline}
                        trackColor={{ false: theme.keyboardDefault, true: theme.switchTrue }}
                    />
                </View>
                <View style={styles(theme).settingView}>
                    <Text style={styles(theme).text}>Questions?</Text>
                    <Text onPress={onFAQPressed} style={[styles(theme).text, { textDecorationLine: 'underline', marginRight: 15, color: theme.outline }]}>FAQ</Text>
                </View>
            </View>

        </Modal>

    )

}

function mapStateToProps(state) {
    return {
        isSettingsVisible: state.settings.isSettingsVisible,
        isHardMode: state.settings.isHardMode,
        isDarkMode: state.settings.isDarkMode,
        isContrastMode: state.settings.isContrastMode
    };
}

export default connect(
    mapStateToProps,
    actions
)(SettingsComponent);

const styles = (theme) => StyleSheet.create({

    modalContainer: {
        flex: 1,
        justifyContent: 'flex-start',
        alignItems: 'center',
        backgroundColor: theme.background,
    },

    settingView: {
        flexDirection: 'row',
        height: 80,
        width: width,
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 20
    },

    text: {
        fontFamily: 'ProductSans',
        color: theme.white,
        textAlign: 'center',
        fontSize: 20,
    },

    imageContainer: {
        height: 30,
        width: 30,
        position: 'absolute',
        top: 20,
        right: 20
    },

    image: {
        height: 30,
        width: 30,
        padding: 5,
        resizeMode: 'contain',
        tintColor: theme.white
    },

})