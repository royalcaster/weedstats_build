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
import * as Linking from 'expo-linking'

LogBox.ignoreLogs(['Warning: Each child in a list should have a unique "key" prop.']);

const UpdatePanel = ({ language, onExit, refreshUser }) => {

    //State

    //Constants
    const app_version = Constants.manifest.version;

    const linkToPlayStore = () => {
        Linking.openURL('https://play.google.com/store/apps/details?id=com.royalcaster.WeedStats_build_test');
    }

    return (
        <Animated.View style={styles.container}>
            
        <View style={{backgroundColor: "#1E2132", height: "80%", width: "95%", borderRadius: 25}}>

        <View style={{flex: 1}}>
            <View style={{height: responsiveHeight(2)}}></View>
            <View style={styles.knob}></View>
            <View style={{height: responsiveHeight(2)}}></View>
            <Text style={styles.heading}>Update available</Text>
        </View>

        <View style={{flex: 1, width: "100%", alignSelf: "center"}}>
            <Text style={[styles.text, {fontSize: responsiveFontSize(1.75), width: "80%", alignSelf: "center"}]}>Please update your app to the latest version to avoid errors and benefit from improvements and new features.</Text>
        </View>

        <View style={{flex: 1}}>
            <Button title={"Go to PlayStore"} color={"#0781E1"} fontColor={"white"} onPress={() => linkToPlayStore()}/>
            <Button title={"Update later"} color={"#484F78"} fontColor={"white"} onPress={() => onExit()}/>
        </View>

        </View>
            
        </Animated.View>
    );
}

export default UpdatePanel

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