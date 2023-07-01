//React
import React, { useEffect, useRef, useState } from "react";
import { Animated, Dimensions, StyleSheet, Easing, View, ScrollView, Text } from "react-native";
import { responsiveFontSize, responsiveHeight } from "react-native-responsive-dimensions";
import { LogBox } from "react-native";

//Data
import News from "../../data/News";

//Custom Components
import Button from "./Button";

//Service
import { doc, updateDoc, getDoc, collection } from "@firebase/firestore";
import { app, firestore } from "../../data/FirebaseConfig";

//Expo
import Constants from "expo-constants";

LogBox.ignoreLogs(['Warning: Each child in a list should have a unique "key" prop.']);

const NewsPanel = ({ language, onExit, refreshUser }) => {

    //State
    const [news, setNews] = useState([]);

    //Constants
    const app_version = Constants.manifest.version;

    useEffect(() => {
        loadNews();
    },[]);

    const loadNews = async () => {
        const docSnap = await getDoc(doc(firestore, "news", app_version));
        fillNews(docSnap.data());
    }

    const fillNews = (data) => {
        let news_buffer = []
        for (let i = 0; i < data.titles.length; i++) {
            news_buffer.push({
                title: data.titles[i],
                text: data.texts[i]
            })
        }
        setNews(news_buffer);
    }

    const setRead = async () => {
        refreshUser({
            news_read: true
        })
        onExit();
    }

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
            <View style={{height: responsiveHeight(0.5)}}></View>
            <Text style={[styles.heading, {fontFamily: "PoppinsMedium", fontSize: responsiveFontSize(1.5)}]}>{app_version}</Text>
        </View>

        <View style={{flex: 3, width: "100%", alignSelf: "center"}}>
        <ScrollView>

        {
            news != null ?
                news.map((note) => {
                    return renderNote(note)
                })
            : null
        }

        </ScrollView>
        </View>

        <View style={{flex: 1}}>
            <Button title={"Ok"} color={"#0781E1"} fontColor={"white"} onPress={() => setRead()}/>
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
        marginHorizontal: 20
    },
    text: {
        color: "white",
        fontSize: responsiveFontSize(1.5),
        fontFamily: "PoppinsMedium",
        marginHorizontal: 20
    }
});