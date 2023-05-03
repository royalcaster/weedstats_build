//React
import React, { useEffect, useRef } from "react";
import { StyleSheet, View, Text, Animated, Easing, Image } from "react-native";

//Third Party
import { responsiveFontSize, responsiveHeight, responsiveWidth } from 'react-native-responsive-dimensions'

const Empty = ({ title, tip, icon }) => {

  const fadeAnim = useRef(new Animated.Value(100)).current;
  const opacityAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 0,
      duration: 300,
      useNativeDriver: true,
      easing: Easing.bezier(0, 1.02, 0.21, 0.97),
    }).start();
    Animated.timing(opacityAnim, {
      toValue: 1,
      duration: 300,
      useNativeDriver: true,
    }).start();
  });

  return (
    <View style={styles.container}>
      <Animated.View style={{ alignItems: "center", width: "90%", alignSelf: "center", transform: [{translateY: fadeAnim}], opacity: opacityAnim}}>
        <Image source={require("../../data/img/empty.png")} style={{height: responsiveHeight(10), width: responsiveHeight(10)}}/>
        <Text style={styles.heading}>{title}</Text>
        <Text style={[styles.heading, {color: "rgba(255,255,255,0.5)"}]}>
          {tip}
        </Text>
      </Animated.View>
    </View>
  );
};

export default Empty;

const styles = StyleSheet.create({
  container: {
    height: "100%",
    width: "100%",
    justifyContent: "center",
    zIndex: 0
  },
  heading: {
    fontFamily: "PoppinsMedium",
    textAlign: "center",
    color: "white",
    fontSize: responsiveFontSize(1.75),
    width: "70%"
  },
  heading2: {
    fontFamily: "PoppinsLight",
    textAlign: "center",
    color: "white",
    fontSize: responsiveFontSize(1.75)
  },
  smile: {
    fontSize: responsiveFontSize(14),
    color: "#484F78"
  }
});
