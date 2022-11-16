import React from 'react';
import { Text, View} from 'react-native';
import { globStyles } from "../UI/styles";

export default function AlarmInfo({ route }) {
    return (
        <View style={globStyles.default_screen}>
            <Text style={globStyles.text_in_alarm_info}>{route.params.time}</Text>
            <Text style={globStyles.text_in_alarm_info}>{route.params.station}</Text>
        </View>
    );

}