//React
import React, { useEffect, useRef, useState } from "react";
import { Animated, Dimensions, StyleSheet, Easing, View, ScrollView, Text } from "react-native";
import { responsiveFontSize, responsiveHeight } from "react-native-responsive-dimensions";

import news from '../../data/news.json'
import Button from "./Button";

const NewsPanel = ({ language, onExit }) => {

    const [content, setContent] = useState([]);

    useEffect(() => {
        language == "de" ? setContent(news.de) : setContent(news.en)
    },[]);

    const renderNote = (note) => {
        return <View style={styles.note_container}>
            <Text style={styles.title}>{note.title}</Text>
            <Text style={styles.text}>{note.text}</Text>
        </View>
    }

    return (
        <Animated.View style={styles.container}>
            
        <View style={{backgroundColor: "#1E2132", height: "80%", width: "95%", borderRadius: 25}}>

        <View style={{flex: 1}}>
            <View style={{height: responsiveHeight(2)}}></View>
            <View style={styles.knob}></View>
            <View style={{height: responsiveHeight(2)}}></View>
            <Text style={styles.heading}>What's new?</Text>
        </View>

        <View style={{flex: 5, width: "90%", alignItems: "center"}}>
        <ScrollView>

        {
            content != null ?
                content.map((note) => {
                    return renderNote(note)
                })
            : null
        }

        </ScrollView>
        </View>

        <View style={{flex: 1}}>
            <Button title={"Alles klar"} color={"#0781E1"} fontColor={"white"} onPress={() => onExit()}/>
        </View>

        </View>
            
        </Animated.View>
    );
}

export default NewsPanel

const styles = StyleSheet.create({
    container: {
        position: "absolute",
        height: Dimensions.get("screen").height,
        width: Dimensions.get("window").width,
        backgroundColor: "rgba(0,0,0,0.75)",
        zIndex: 100,
        alignItems: "center",
        justifyContent: "center"
    },
    knob: {
        width: "40%",
        height: 15,
        borderRadius: 20,
        backgroundColor: "rgba(255,255,255,0.1)",
        alignSelf: "center"
      },
    heading: {
        color: "white",
        fontSize: responsiveFontSize(3),
        fontFamily: "PoppinsBlack",
        marginLeft: 30
    },
    note_container: {
        marginVertical: 10
    },
    title: {
        color: "white",
        fontSize: responsiveFontSize(2),
        fontFamily: "PoppinsBlack",
        marginLeft: 30
    },
    text: {
        color: "white",
        fontSize: responsiveFontSize(1.75),
        fontFamily: "PoppinsMedium",
        marginLeft: 30
    }
});