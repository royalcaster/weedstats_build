//React
import React, { useContext } from "react";
import { StyleSheet, Text, View, Animated } from "react-native";

//Service
import { LanguageContext } from "../../../../../data/LanguageContext";
import { responsiveFontSize } from "react-native-responsive-dimensions";
import TypeImage from "../../../../common/TypeImage";

const DailyAveragePanel = ({selectedType, value}) => {

    //Context
    const language = useContext(LanguageContext);

    return (<View  style={{borderRadius: 10, padding: 20, width: "100%"}}>

    <View style={{alignSelf: "center"}}>
      {selectedType == "main" ? <TypeImage x={60}/> : 
      <TypeImage type={selectedType} x={60}/>}
    </View>

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