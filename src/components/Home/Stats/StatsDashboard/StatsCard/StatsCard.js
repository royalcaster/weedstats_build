//React
import React from "react";
import { StyleSheet, Text, View, Image, Animated } from "react-native";
import { responsiveFontSize } from "react-native-responsive-dimensions";

//Third-Party

const StatsCard = ({title, value}) => {

    return (
    <View style={styles.card_container}>
        <Text style={styles.card_label}>{title}</Text>
        <Animated.Text style={[styles.card_value]}>
          {value}
        </Animated.Text>
      </View>
    )
}

export default StatsCard

const styles = StyleSheet.create({
    card_container: {
        backgroundColor: "#131520",
        width: "30%",
        padding: 10,
        paddingLeft: 20,
        borderRadius: 10
      },
      card_label: {
        color: "white",
        fontFamily: "PoppinsLight",
        fontSize: 14,
        marginTop: 5,
        textAlign: "left",
      },
      card_value: {
        color: "white",
        fontFamily: "PoppinsBlack",
        fontSize: responsiveFontSize(2.5),
        marginTop: -5,
        textAlign: "left",
      }
});