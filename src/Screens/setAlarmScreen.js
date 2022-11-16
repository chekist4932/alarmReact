import React from 'react';
import {Text, View, FlatList, TouchableOpacity, Platform} from 'react-native';
import {globStyles} from "../UI/styles";
import DateTimePicker from '@react-native-community/datetimepicker';
import {RadioButton} from 'react-native-paper';
import {Entypo} from '@expo/vector-icons';
import {AlarmContext} from "../AlarmContext";
import MainScreen from "./MainScreen";


const stations =
    [
        {
            station: 'Morrow Med',
            url: 'https://stream.fr.morow.com/morow_med.mp3',
        },
        {
            station: 'Moscow speak',
            url: 'http://video.govoritmoskva.ru:8880/rufm.mp3',
        },

        {
            station: 'Romantic chanson',
            url:'http://chanson.hostingradio.ru:8041/chanson-romantic128.mp3',
        },

    ]


// const [date, setDate] = useState(new Date());
// const [show, setShow] = useState(true);
// const [checked, setChecked] = React.useState(stations[0].station);
//


class SetAlarmScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            date: new Date(),
            show: true,
            checked: stations[0].station,

        };
    }

    onChange = (event, selectedDate) => {
        if (Platform.OS === 'android') {
            this.setState({show: false});
        }

        this.setState({date: selectedDate});

    };

    render() {

        return (
            <View style={globStyles.default_screen}>
                {this.state.show && (
                    <DateTimePicker
                        style={{
                            backgroundColor: "#ccc",
                        }}
                        mode="time"
                        display="spinner"
                        format="HH:MM"
                        value={this.state.date}
                        is24Hour={true}
                        confirmBtnText="Confirm"
                        cancelBtnText="Cancel"
                        onChange={this.onChange}
                    />
                )}
                <View style={globStyles.view_in_set_alarm}>
                    <View style={globStyles.view_in_icon_save}>
                        <Entypo style={globStyles.icon_save} name="save" size={44} color="black"
                                onPress={() => this.props.navigation.navigate("MainScreen", this.context.addAlarm({
                                    time: String(this.state.date.getHours()).padStart(2, '0') + ":" + String(this.state.date.getMinutes()).padStart(2, '0'),
                                    name: "New Alarm",
                                    flag: true,
                                    station: this.state.checked,
                                }))}/></View>
                    <View style={globStyles.scroll_list_set_alarm}>
                        <FlatList data={stations} renderItem={({item}) =>
                            (<TouchableOpacity onPress={() => this.setState({checked: item.station})}>
                                    <View style={globStyles.view_row_set_alarm}>
                                        <RadioButton
                                            color="black"
                                            value={item.station}
                                            status={this.state.checked === item.station ? 'checked' : 'unchecked'}
                                            onPress={() => this.setState({checked: item.station})}/>
                                        <Text style={{
                                            flex: 1,
                                            fontWeight: "500",
                                            fontSize: 14,
                                            marginLeft: "5%",
                                            marginTop: "3%"

                                        }}>{item.station}</Text>

                                    </View>
                                </TouchableOpacity>
                            )}/>
                    </View>
                </View>
            </View>
        );
    }

}

SetAlarmScreen.contextType = AlarmContext;
export default SetAlarmScreen;
export {stations}