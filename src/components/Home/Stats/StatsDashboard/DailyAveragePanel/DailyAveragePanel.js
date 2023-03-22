//React
import React, { useContext } from "react";
import { StyleSheet, Text, View, Image, Animated } from "react-native";

//Third-Party
import { LinearGradient } from "expo-linear-gradient";

//Service
import { LanguageContext } from "../../../../../data/LanguageContext";
import { responsiveFontSize } from "react-native-responsive-dimensions";

const DailyAveragePanel = ({selectedType, value}) => {

    const language = useContext(LanguageContext);

    return (<View  style={{borderRadius: 10, padding: 20, width: "100%"}}>
    {selectedType === "main" ? (
      <Animated.View
        style={{width: "50%", alignSelf: "center"}}>
        <Image style={{height: 40, width: 15, position: "absolute"}} source={require("../../../../../data/img/joint.png")}/>
        <Image style={{height: 40, width: 25, position: "absolute", left: "12%"}} source={require("../../../../../data/img/bong.png")}/>
        <Image style={{height: 40, width: 25, position: "absolute", left: "30%"}} source={require("../../../../../data/img/vape.png")}/>
        <Image style={{height: 50, width: 25, position: "absolute", left: "53%", marginTop: -5}} source={require("../../../../../data/img/pipe.png")}/>
        <Image style={{height: 40, width: 38, position: "absolute", left: "74%"}} source={require("../../../../../data/img/cookie.png")}/>
       </Animated.View>
    ) : null}
    {selectedType === "joint" ? (
      <Animated.Image
        style={[styles.joint_img]}
        source={require("../../../../../data/img/joint.png")}
      />
    ) : null}
    {selectedType === "bong" ? (
      <Animated.Image style={[styles.bong_img]} source={require("../../../../../data/img/bong.png")} />
    ) : null}
    {selectedType === "vape" ? (
      <Animated.Image style={[styles.vape_img]} source={require("../../../../../data/img/vape.png")} />
    ) : null}
    {selectedType === "pipe" ? (
      <Animated.Image style={[styles.pipe_img]} source={require("../../../../../data/img/pipe.png")} />
    ) : null}
    {selectedType === "cookie" ? (
      <Animated.Image
        style={[styles.cookie_img]}
        source={require("../../../../../data/img/cookie.png")}
      />
    ) : null}
    <View style={{height: 40}}></View>
    <View style={{alignSelf: "center"}}>
    <Animated.Text
      style={styles.value}
    >
      {value}
    </Animated.Text>
    <Text
      style={styles.time_tag}
    >
      Ø {language.stats_day}
    </Text>
    </View>

    </View>)
}

export default DailyAveragePanel

const styles = StyleSheet.create({
    bong_img: {
        width: 35,
        height: 60,
        alignSelf: "center",
        position: "absolute",
        marginTop: 10,
        opacity: 1,
      },
      joint_img: {
        width: 20,
        height: 60,
        alignSelf: "center",
        position: "absolute",
        marginTop: 10,
        opacity: 1
      },
      vape_img: {
        width: 20,
        height: 60,
        alignSelf: "center",
        position: "absolute",
        marginTop: 10,
        opacity: 1,
      },
      pipe_img: {
        width: 45,
        height: 65,
        alignSelf: "center",
        position: "absolute",
        marginTop: 10,
        opacity: 1,
      },
      cookie_img: {
        width: 50,
        height: 50,
        alignSelf: "center",
        position: "absolute",
        marginTop: 10,
        opacity: 1,
      },
      time_tag: {
        fontSize: responsiveFontSize(2),
        color: "white",
        fontFamily: "PoppinsLight",
      },
      value: {
        fontSize: responsiveFontSize(5),
        color: "white",
        fontFamily: "PoppinsBlack",
        marginBottom: responsiveFontSize(-2)
      }
});