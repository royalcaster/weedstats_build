//React
import React, { useContext, useState } from "react";
import { StyleSheet, View, TouchableNativeFeedback } from "react-native";

//Third Party
import { responsiveFontSize, responsiveHeight, responsiveWidth } from "react-native-responsive-dimensions";
import { LanguageContext } from "../../../../data/LanguageContext";

//Custom Component
import TypeImage from '../../../common/TypeImage'

const ConfigItem = ({ type, config, onToggle }) => {

  const [active, setActive] = useState(config);

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
  touchable: {
    padding: 10,
    justifyContent: "center",
    alignItems: "center"
  }
});
