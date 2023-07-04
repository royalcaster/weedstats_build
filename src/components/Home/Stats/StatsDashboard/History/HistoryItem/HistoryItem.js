//React
import React from "react";
import { StyleSheet, View, Text, Image, Pressable, TouchableNativeFeedback } from "react-native";

//Tools
import toGermanDate from "../../../../../../data/DateConversion";

//Third Party
import AntDesign from "react-native-vector-icons/AntDesign";
import Fontisto from "react-native-vector-icons/Fontisto";
import Ionicons from "react-native-vector-icons/Ionicons";
import { responsiveFontSize } from "react-native-responsive-dimensions";
import IconButton from "../../../../../common/IconButton";
import TypeImage from "../../../../../common/TypeImage";

const HistoryTable = ({ event, showOnMap }) => {

  return (
    <View style={{
      flexDirection: "row",
      width: "90%",
      marginBottom: 5,
      borderTopColor: "#121212",
      borderTopWidth: 0,
      alignSelf: "center",
      backgroundColor: "#131520",
      justifyContent: "center",
      borderRadius: 10,
      overflow: "hidden"
    }}>
    <TouchableNativeFeedback background={TouchableNativeFeedback.Ripple("rgba(255,255,255,0.25)", false)} onPress={() => showOnMap(event)} delayPressIn={30}>
    <View
      style={[styles.touchable]}
    >
      <View style={{ flex: 1, alignItems: "center"}}>
        <TypeImage type={event.type} x={50}/>
      </View>
      
      <View style={{ flex: 2, justifyContent: "center" }}>
        <Text style={styles.date}>
          <Fontisto name="date" style={styles.icon_date} />{"  "}
          {toGermanDate(new Date(event.timestamp))}
        </Text>
      </View>
      <View style={{ flex: 2, justifyContent: "center" }}>
        <Text style={styles.time}>
          <Ionicons name="time-outline" style={styles.icon_time} />{" "}
          {new Date(event.timestamp).toLocaleTimeString("de-DE").substring(0,5)}
        </Text>
      </View>
    </View>
    </TouchableNativeFeedback>
    </View>
  );
};

export default HistoryTable;

const styles = StyleSheet.create({
  date: {
    textAlign: "center",
    fontFamily: "PoppinsLight",
    fontSize: responsiveFontSize(1.75),
    color: "white",
    alignSelf: "center",
  },
  time: {
    textAlign: "center",
    fontFamily: "PoppinsLight",
    fontSize: responsiveFontSize(1.75),
    color: "white",
  },
  icon_date: {
    fontSize: 13,
    color: "white",
  },
  icon_time: {
    fontSize: 16,
    color: "white",
  },
  touchable: {
    flexDirection: "row",
    width: "100%",
    padding: 10
  }
});
