import React from 'react';
import { useEffect, useState } from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { connect } from "react-redux";
import * as actions from '../actions';

import moment from 'moment';
import { Colors, ColorModes } from "../utils/constants";

const TimerComponent = (props) => {
    
    const contrast = props.isContrastMode ? ColorModes.contrast : ColorModes.nonContrast;
    const theme = props.isDarkMode ? { ...ColorModes.dark, ...contrast } : { ...ColorModes.light, ...contrast }

    let todayDate = moment().format('YYYY-MM-DD HH:mm:ss');
    const tomorrowDate = moment().add(1, 'days').format('YYYY-MM-DD').toString() + ' 00:00:00';
    let difference = moment.duration(moment(tomorrowDate).diff(moment(todayDate)));
    let remaining = {
        hours: parseInt(difference.asHours()),
        minutes: parseInt(difference.minutes()),
        seconds: parseInt(difference.seconds())
    }
    
    const[remainingTime, setRemainingTime] = useState(remaining);

    const countdown = () => {

        if(remainingTime.hours === 0 && remainingTime.minutes === 0 && remainingTime.seconds == 0) {
            let date = moment().utcOffset('+05:30').format('YYYY-MM-DD hh:mm:ss');
            props.setCurrentDate(date);
        } else if(remainingTime.minutes === 0 && remainingTime.seconds == 0) {
            setRemainingTime({
                hours: remainingTime.hours - 1,
                minutes: 59,
                seconds: 59
            });
        } else if(remainingTime.seconds == 0) {
            setRemainingTime({
                ...remainingTime,
                minutes: remainingTime.minutes - 1,
                seconds: 59
            });
        } else {
            setRemainingTime({
                ...remainingTime,
                seconds: remainingTime.seconds - 1
            });
        }

    }

    useEffect(() => {
        const timer = setInterval(() => countdown(), 1000);
        return () => clearInterval(timer);
    })

    return (

            <View style={styles(theme).container}>
                <Text style={[styles(theme).text, { fontSize: 20, textTransform: 'uppercase' }]}>Next Wordle In</Text>
                <View style={styles(theme).timerView}>
                        <Text style={[styles(theme).text, { fontSize: 20 }]}>{remainingTime.hours < 10 ? `0${remainingTime.hours}` : remainingTime.hours}</Text>
                        <Text style={[styles(theme).text, { fontSize: 20 }]}>:</Text>
                        <Text style={[styles(theme).text, { fontSize: 20 }]}>{remainingTime.minutes < 10 ? `0${remainingTime.minutes}` : remainingTime.minutes}</Text>
                        <Text style={[styles(theme).text, { fontSize: 20 }]}>:</Text>
                        <Text style={[styles(theme).text, { fontSize: 20 }]}>{remainingTime.seconds < 10 ? `0${remainingTime.seconds}` : remainingTime.seconds}</Text>
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
)(TimerComponent);

const styles = (theme) => StyleSheet.create({

    container: {
        flex: 1,
        height: 100,
        justifyContent: 'center',
        alignItems: 'center',
    },

    timerView: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        alignItems: 'center'
    },

    text: {
        fontFamily: 'ProductSans',
        color: theme.white,
        textAlign: 'center',
        margin: 2
    }

})