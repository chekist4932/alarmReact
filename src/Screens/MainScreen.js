import React from 'react';
import {FlatList, Switch, Text, TouchableOpacity, View} from 'react-native';
import {globStyles} from "../UI/styles";
import {AlarmContext} from "../AlarmContext"
import {MaterialCommunityIcons} from "@expo/vector-icons";


class MainScreen extends React.Component {
    render() {
        return (
            <View style={globStyles.default_screen}>
                <FlatList data={this.context.alarms} renderItem={({item}) =>
                    (
                        <View style={globStyles.view_in_main}>
                            <Switch
                                onValueChange={() => this.context.changeAlarm(item.key)}
                                value={item.flag}
                            />
                            <MaterialCommunityIcons name="delete-outline" size={32} color="black"
                                                    style={globStyles.icon_delete}
                                                    onPress={() => this.context.delAlarm(item.key)}/>
                            <TouchableOpacity onPress={() => this.props.navigation.navigate('Alarm', item)}>
                                <Text style={globStyles.time_style}>{item.time}</Text>
                                <Text style={globStyles.alarm_name}>{item.name}</Text>
                            </TouchableOpacity>

                        </View>
                    )}/>
                <Text style={globStyles.text_in_alarm_info} onPress={() => {
                    console.log(this.context.alarms)
                }}>"Console"</Text>
            </View>
        );
    }
}

MainScreen.contextType = AlarmContext;
export default MainScreen;