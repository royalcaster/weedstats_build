//React
import React, { useContext, useEffect, useRef } from "react";
import { StyleSheet, Text, View, Image, Animated, Easing } from "react-native";

//Custom Components
import Statusbar from "./StatusBar/Statusbar";
import Slider from './Slider/Slider'

//Service
import { LanguageContext } from "../../../../data/LanguageContext";
import { responsiveFontSize, responsiveHeight, responsiveWidth } from "react-native-responsive-dimensions";
import LevelBar from "./LevelBar/LevelBar";
import TypeImage from "../../../common/TypeImage";
import LevelImage from "../../../common/LevelImage";

const CounterItem = ({ type, counter, toggleCounter, toggleBorderColor }) => {

  const language = useContext(LanguageContext);

  const fadeAnim = useRef(new Animated.Value(0)).current;
  const scaleAnim = useRef(new Animated.Value(200)).current;

  useEffect(() => {
    Animated.timing(scaleAnim, {
      toValue: 0,
      useNativeDriver: true,
      duration: 400,
      easing: Easing.bezier(0, 1.02, 0.21, 0.97),
    }).start();
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 200,
      useNativeDriver: true,
    }).start();
  }, []);

  React.useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 200,
      useNativeDriver: true,
    }).start();
  }, [fadeAnim]);

  const calcLevelStatus = (counter) => {

    if (counter == null) {
      return 0;
    }

    if (counter >= 420) {
      return 100;
    } else if (counter == 0) {
      return 0;
    } else {
      var indicator = Math.ceil(counter / 70);
      return (100 * (counter - 70 * (indicator - 1))) / 70;
    }
  };

  const getGradientColors = (counter) => {
    if (counter) {
      if (counter == 0) {
        return ["rgba(255,255,255,0.75), rgba(255,255,255,0.5)"]
      }
      else {
        let indicator = Math.floor(counter / 70);
        return indicator > language.levels.length - 1
          ? language.levels[language.levels.length - 1].colors
          : language.levels[indicator].colors;
      }
    }
    else {
      return ["#484F78", "#484F78", "#1E2132"]
    }
  };

  const convertToRGB = ( hex, a) => {
    if(hex.length != 6){
        throw "Only six-digit hex colors are allowed.";
    }

    var aRgbHex = hex.match(/.{1,2}/g);
    var aRgb = [
        parseInt(aRgbHex[0], 16),
        parseInt(aRgbHex[1], 16),
        parseInt(aRgbHex[2], 16),
        a
    ];
    return "rgba(" + aRgb[0] + ", " + aRgb[1] + ", " + aRgb[2] + ", " + a + ")";
  }

  return (
    <Animated.View style={[styles.container, { transform: [{ translateY: scaleAnim }], opacity: fadeAnim }]}>

      <View style={{position: "absolute", alignSelf: "center", zIndex: 10000, justifyContent: "center", width: "100%", top: -30}}>
        <LevelImage index={Math.floor(counter / 70)} style={{width: responsiveHeight(8), height: responsiveHeight(8), alignSelf: "center"}}/>
      </View>

      <Animated.View style={[styles.card_opener, {backgroundColor: convertToRGB(getGradientColors(counter)[0].substring(1,7), 0.4), borderColor: getGradientColors(counter)[0], borderWidth: 0.5, transform: [{translateX: scaleAnim}]}]}>
        <View style={{backgroundColor: getGradientColors(counter)[0], height: responsiveHeight(6.5), width: responsiveHeight(6.5), justifyContent: "center", borderRadius: 10}}>
          <TypeImage type={type} x={responsiveHeight(5)}/>
        </View>
      </Animated.View>
      
      <View style={[styles.card_content]}>
        <View style={{flex: 6}}>
        <View style={styles.grab}></View>
          <View style={{flex: 1, flexDirection: "row", padding: 5, paddingBottom: 0}}>
            <View style={{flex: 2, alignItems: "center", flexGrow: 3}}>
              <Text style={styles.counter_number}>{counter > 0 ? counter : "0"}</Text>
            </View>
            <View style={{flex: 5, padding: 5, maxHeight: responsiveHeight(7)}}>
              <Statusbar status={calcLevelStatus(counter)} />
            </View>
          </View> 
          <View style={{flex: 1, padding: 10, paddingTop: 5}}>
            <Slider firstColor={getGradientColors(counter)[0]} secondColor={getGradientColors(counter)[2]} onToggleCounter={() => {toggleCounter(type.toLowerCase(), getGradientColors(counter)[0]); toggleBorderColor(getGradientColors(counter)[0])}}/>
          </View>
        </View>  
        <View style={{flex: 1, flexDirection: "column"}}>
          <LevelBar index={Math.floor(counter / 70)} counter={counter}/>
        </View>
      </View> 

    </Animated.View>
  );
};

export default CounterItem;

const styles = StyleSheet.create({
  container: {
    margin: 5,
    marginVertical: 15,
    flexDirection: "row"
  },
  counter_number: {
    color: "white",
    fontSize: responsiveFontSize(6),
    fontFamily: "PoppinsMedium",
    marginBottom: responsiveHeight(1) * -1
  },
  card_opener: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    borderTopLeftRadius: 10,
    borderBottomLeftRadius: 10,
    paddingRight: 20
  },
  card_content: {
    flex: 5,
    backgroundColor: "#131520",
    borderRadius: 10,
    marginLeft: -20,
    flexDirection: "row"
  },
  grab: {
    alignSelf: "center",
    height: 5,
    width: "25%",
    borderRadius: 10,
    zIndex: 1000,
    marginVertical: 15,
    marginBottom: 5
  }
});
