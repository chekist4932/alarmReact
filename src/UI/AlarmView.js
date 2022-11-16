// import * as React from 'react';
// import {Switch, Text, TouchableOpacity, View} from 'react-native';
// import {globStyles} from "./styles";
// import {MaterialCommunityIcons} from "@expo/vector-icons";
//
//
// const mySwitch = (setIsEn, value, changerAlarm, key) => {
//     changerAlarm(key);
//     setIsEn(value);
// }
//
// export default function ({navigation, delHead, changerAlarm, item}) {
//     const [isEnabled, setIsEnabled] = React.useState(item.flag);
//
//
//     return (<View style={globStyles.view_in_main}>
//         <Switch
//             onValueChange={(value) => mySwitch(setIsEnabled, value, changerAlarm, item.key)}
//             value={isEnabled}/>
//         <MaterialCommunityIcons name="delete-outline" size={32} color="black"
//                                 style={globStyles.icon_delete} onPress={() => delHead(item.key)}/>
//         <TouchableOpacity onPress={() => navigation.navigate('Alarm', item)}>
//             <Text style={globStyles.time_style}>{item.time}</Text>
//             <Text style={globStyles.alarm_name}>{item.name}</Text>
//         </TouchableOpacity>
//
//     </View>);
// }