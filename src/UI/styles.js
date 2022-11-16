import * as React from 'react';
import {StyleSheet} from 'react-native';


export const globStyles = StyleSheet.create(
    {
        default_screen: {
            flex: 1,
            paddingTop: 10,
            backgroundColor: '#ccc',

        },
        alarm_name:
            {
                marginLeft: '10%',
                width: "70%"
            },
        view_in_set_alarm: {
            flex: 1,
            padding: 2,
            //height: 100,
            borderRadius: 12,
            paddingTop: 10,
            marginTop: 5,
            marginHorizontal: 8,
            justifyContent: "space-between",
            flexDirection: "row-reverse",
            backgroundColor: "#ccc",
            //width: "100%",
        },
        scroll_list_set_alarm:
            {
                flex: 4,
                backgroundColor: "#fafafa",
                borderRadius: 12,
                paddingTop: 10,
                marginHorizontal: 2,
                height: "40%"
            },
        view_row_set_alarm:
            {
                flex: 1,
                marginHorizontal: 2,
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "flex-start",
                backgroundColor: "#fafafa",
                borderRadius: 5,
                marginTop: 5,
                width: "99%",
                borderBottomWidth: 0.5
            },
        time_style:
            {
                fontSize: 40,
                //padding: 20,
                //borderRadius: 10,
                // backgroundColor: "#fafafa",
                // marginTop: 2,
                marginLeft: '10%',
                marginTop: '2%',
                width: "80%",

            },

        view_in_main: {
            flex: 1,
            height: 100,
            borderRadius: 12,
            marginTop: 5,
            alignItems: "center",
            justifyContent: "space-around",
            flexDirection: "row-reverse",
            backgroundColor: "#fafafa",
            width: "100%",
        },

        text_in_alarm_info:
            {
                fontSize: 24,
                padding: 20,
                marginHorizontal: "2%",
                textAlign: "center",
                borderRadius: 12,
                backgroundColor: "#fafafa",
                marginTop: 5,
                width: "96%",
            },
        view_in_icon_save:
            {
                flex: 1,
                backgroundColor: "#fafafa",
                height: '40%',
                marginHorizontal: 2,
                borderRadius: 12,
                //paddingTop: 10,


            },
        icon_save:
            {
                flex: 1,
                textAlignVertical: "center",
                textAlign: "center",
                borderRadius: 12,

            },
        icon_close:
            {
                textAlign: "center",
                marginBottom: 5,
                marginTop: 50,
            },
        icon_delete: {
            alignItems: "center",
        },
        icon_plus:
            {
                textAlign: "center",
                marginBottom: 10,
                marginTop: 5,
            },
    });
