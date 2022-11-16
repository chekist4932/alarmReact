import React, {useEffect, useRef, useState} from "react"
import * as Notifications from "expo-notifications";
import {Alert, Platform, View} from 'react-native';

import MainScreen from "./src/Screens/MainScreen";
import SetAlarmScreen from "./src/Screens/setAlarmScreen";
import AlarmInfo from "./src/Screens/Alarm"

import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';


import {stations} from "./src/Screens/setAlarmScreen";
import {AlarmContext} from "./src/AlarmContext"
import {Ionicons} from "@expo/vector-icons";
import {globStyles} from "./src/UI/styles";
import Constants from "expo-constants";
import {playRadio, stopRadio} from "./src/Radio";


const Stack = createNativeStackNavigator();


const find_url_for_radio_station = (station_name) => {
    for (let i = 0; i < stations.length; i++) {
        if (stations[i].station === station_name) {
            return stations[i].url
        }
    }
}

const time_row_to_time_in_min = (time_row) => {

    return Number(time_row.slice(0, 2)) * 60 + Number(time_row.slice(3, 5))
}


class App extends React.Component {

    last_alarm_id;

    myAlert = () =>
    {
        Alert.alert("Alarm", "WAKE UP", [{
            text: "OK", onPress: async () => {
                for (let i = 0; i < this.state.alarms.length; i++) {
                    if (this.state.alarms[i].id === this.last_alarm_id) {
                        stopRadio()
                        await this.changeAlarm(this.state.alarms[i].key)
                    }
                }
            }
        }])
    }

    constructor(props) {
        super(props)
        this.state = {
            last_alarm: "",
            alarms: [
            ],
        }

        Notifications.setNotificationHandler({
            handleNotification: async () => ({
                shouldShowAlert: true,
                shouldPlaySound: true,
                shouldSetBadge: true,
            }),
            handleSuccess: async () => (this.myAlert())

        })


    }


    Notification = () => {
        const [expoPushToken, setExpoPushToken] = useState("");
        const [notification, setNotification] = useState(false);
        const notificationListener = useRef();
        const responseListener = useRef();

        useEffect(() => {
            this.registerForPushNotificationsAsync().then((token) =>
                setExpoPushToken(token)
            );

            notificationListener.current =
                Notifications.addNotificationReceivedListener(async (notification) => {
                    this.last_alarm_id = notification.request.identifier
                    for (let i = 0; i < this.state.alarms.length; i++) {
                        if (this.state.alarms[i].id === notification.request.identifier) {
                            let url = find_url_for_radio_station(this.state.alarms[i].station)
                            await playRadio(url)
                        }
                    }

                    setNotification(notification);
                });

            responseListener.current =
                Notifications.addNotificationResponseReceivedListener((response) => {
                    console.log(response);
                    this.last_alarm_id = response.notification.request.identifier
                    for (let i = 0; i < this.state.alarms.length; i++) {
                        if (this.state.alarms[i].id === response.notification.request.identifier) {
                            let url = find_url_for_radio_station(this.state.alarms[i].station)
                            playRadio(url)
                        }
                    }
                    this.myAlert()
                });

            return () => {
                Notifications.removeNotificationSubscription(
                    notificationListener.current
                );
                Notifications.removeNotificationSubscription(responseListener.current);
            };
        }, []);
        return null;
    }

    schedulePushNotification = async (
        AlarmName,
        hours,
        minutes
        ) => {

        const id = await Notifications.scheduleNotificationAsync({
            content: {
                title: AlarmName,
                body: "Alarm BRO"
            },
            trigger: {
                hour: hours,
                minute: minutes,
                repeats: true,
            },
        });
        return id;
    }

    registerForPushNotificationsAsync = async () => {
        let token;
        if (Constants.isDevice) {
            const {status: existingStatus} =
                await Notifications.getPermissionsAsync();
            let finalStatus = existingStatus;
            if (existingStatus !== "granted") {
                const {status} = await Notifications.requestPermissionsAsync();
                finalStatus = status;
            }
            if (finalStatus !== "granted") {
                alert("Failed to get push token for push notification!");
                return;
            }
            token = (await Notifications.getExpoPushTokenAsync()).data;
            console.log(token);
        } else {
            alert("Must use physical device for Push Notifications");
        }

        if (Platform.OS === "android") {
            await Notifications.setNotificationChannelAsync("default", {
                name: "default",
                importance: Notifications.AndroidImportance.MAX,
                sound: true,
                lightColor: "#FF231F7C",
                lockscreenVisibility: Notifications.AndroidNotificationVisibility.PUBLIC,
                bypassDnd: true,
            });
        }

        return token;
    }

    cancelNotification = async (notify_Id) => {
        await Notifications.cancelScheduledNotificationAsync(notify_Id);
    }


    checkerAlarm = async () => {
        if (this.state.alarms[0] !== undefined) {
            const {alarms} = this.state
            for (let i = 0; i < alarms.length; i++) {
                if (alarms[i].flag === true && alarms[i].id === "null") {
                    const mp_id = await this.schedulePushNotification(alarms[i].key, Number(alarms[i].time.slice(0, 2)), Number(alarms[i].time.slice(3, 5)))
                    alarms[i].id = mp_id
                    console.log("shedul done", mp_id)
                    this.changeAlarm(alarms[i].key, alarms[i].id)
                } else if (alarms[i].flag === false && alarms[i].id !== "null") {
                    console.log("CancelSchedule", alarms[i].id)
                    this.cancelNotification(alarms[i].id);
                    this.changeAlarm(alarms[i].key, "null");
                }
            }
        }
    }

    delAlarm = (key) => {
        let {alarms} = this.state
        for (let i = 0; i < alarms.length; i++) {
            if (alarms[i].key === key) {
                if (alarms[i].flag === true && alarms[i].id !== 'null') {
                    this.cancelNotification(alarms[i].id);
                }
                alarms.splice(i, 1)
            }
        }
        this.setState({alarms})
    }

    changeAlarm = (key, id = undefined) => {
        const {alarms} = this.state
        if (id === undefined) {
            for (let i = 0; i < alarms.length; i++) {
                if (alarms[i].key === key) {
                    alarms[i].flag = !alarms[i].flag
                }
            }
            console.log("Switch touched")
        } else {
            for (let i = 0; i < alarms.length; i++) {
                if (alarms[i].key === key) {
                    alarms[i].id = id
                }
            }

        }
        console.log("LOOK AT ME",alarms)
        this.setState({alarms})

    }

    addAlarm = (send_) => {
        const {alarms} = this.state
        const adder = {
            name: send_.name,
            time: send_.time,
            flag: send_.flag,
            id: "null",
            station: send_.station,
            key: Math.random().toString(36).substring(7)
        }
        alarms.push(adder)

        alarms.sort((a, b) => {
            return time_row_to_time_in_min(a.time) - time_row_to_time_in_min(b.time)
        })
        this.setState({alarms})
    }

    render() {
        this.checkerAlarm()
        return (
            <View style={globStyles.view_in_main}>

                <AlarmContext.Provider
                    value={
                        {
                            alarms: this.state.alarms,
                            addAlarm: this.addAlarm,
                            delAlarm: this.delAlarm,
                            changeAlarm: this.changeAlarm
                        }
                    }>
                    <NavigationContainer>
                        <this.Notification/>
                        <Stack.Navigator>
                            <Stack.Screen
                                name="MainScreen"
                                component={MainScreen}
                                options={params => ({
                                    title: "Main",
                                    headerRight: () => (
                                        <Ionicons name="add" size={32} color="black" style={globStyles.icon_plus}
                                                  onPress={() => params.navigation.navigate('SetAlarmScreen')}/>
                                    )
                                })}
                            />
                            <Stack.Screen
                                name="Alarm"
                                component={AlarmInfo}
                                options={{
                                    title: "Alarm"
                                }}/>
                            <Stack.Screen
                                name="SetAlarmScreen"
                                component={SetAlarmScreen}
                                options={{
                                    title: "Set Alarm"
                                }}/>
                        </Stack.Navigator>
                    </NavigationContainer>
                </AlarmContext.Provider>
            </View>
        );
    }
}

export default App;