//React
import React, { useContext, useState } from "react";
import { StyleSheet, View, Image, Text, TouchableNativeFeedback } from "react-native";

//Third Party
import { responsiveFontSize, responsiveHeight, responsiveWidth } from "react-native-responsive-dimensions";
import { LanguageContext } from "../../../../data/LanguageContext";

//Custom Component
import TypeImage from '../../../common/TypeImage'

const ConfigItem = ({ type, config, onToggle }) => {

  const [active, setActive] = useState(config);

  const language = useContext(LanguageContext)

  return (
    <View style={[styles.container, {backgroundColor: config ? "#484F78" : "#131520"}]}>
      <TouchableNativeFeedback 
      onPress={() => {
        onToggle(type);
        setActive(!active);
      }}
      background={TouchableNativeFeedback.Ripple(
        "rgba(255,255,255,0.1)",
        true
      )}>
        <View style={styles.touchable}>
          <TypeImage x={50} type={type}/>
        </View>
      </TouchableNativeFeedback>
    </View>
  );
};

export default ConfigItem;

const styles = StyleSheet.create({
  container: {
    margin: 2.5,
    borderRadius: 10,
    justifyContent: "center",
    textAlign: "center",
    backgroundColor: "#131520",
    flex: 1,
  },
  container_active: {
    padding: 10,
    margin: 2.5,
    marginBottom: 30,
    borderRadius: 5,
    justifyContent: "center",
    textAlign: "center",
    flex: 1,
    backgroundColor: "#484F78",
  },
  touchable: {
    padding: 10,
    justifyContent: "center",
    alignItems: "center"
  },
  bong_img: {
    height: responsiveHeight(6),
    width: responsiveWidth(7),
    alignSelf: "center",
    opacity: 0.8,
  },
  bong_img_active: {
    height: responsiveHeight(6),
    width: responsiveWidth(7),
    alignSelf: "center",
  },
  joint_img: {
    height: responsiveHeight(6),
    width: responsiveWidth(3),
    alignSelf: "center",
    opacity: 0.8,
  },
  joint_img_active: {
    height: responsiveHeight(6),
    width: responsiveWidth(3),
    alignSelf: "center",
  },
  vape_img: {
    height: responsiveHeight(6),
    width: responsiveWidth(5),
    alignSelf: "center",
    opacity: 0.8,
  },
  vape_img_active: {
    height: responsiveHeight(6),
    width: responsiveWidth(5),
    alignSelf: "center",
  },
  pipe_img: {
    height: responsiveHeight(6),
    width: responsiveWidth(6),
    alignSelf: "center",
    opacity: 0.8,
  },
  pipe_img_active: {
    height: responsiveHeight(6),
    width: responsiveWidth(6),
    alignSelf: "center",
  },
  cookie_img: {
    height: responsiveHeight(5),
    width: responsiveWidth(10),
    alignSelf: "center",
    opacity: 0.8,
  },
  cookie_img_active: {
    height: responsiveHeight(5),
    width: responsiveWidth(10),
    alignSelf: "center",
  },
  label: {
    color: "white",
    fontSize: responsiveFontSize(1.5),
    fontFamily: "PoppinsLight",
    marginTop: 10,
    marginBottom: 5,
    opacity: 0.8,
    alignSelf: "center",
  },
  label_active: {
    color: "white",
    fontSize: responsiveFontSize(1.5),
    fontFamily: "PoppinsLight",
    marginTop: 10,
    marginBottom: 5,
    alignSelf: "center",
  },
  checkbox: {
    color: "#666666",
    fontSize: 20,
    position: "absolute",
    top: 10,
    left: 10,
  },
  checkbox_active: {
    color: "#0781E1",
    fontSize: 20,
    position: "absolute",
    top: 10,
    left: 10
  },
  outer_container: {
    flex: 1,
    overflow: "hidden",
    marginHorizontal: 0
  }
});
