//React
import React, { useEffect, useRef, useContext } from "react";
import { Animated, Dimensions, StyleSheet, View, Text } from "react-native";

//Custom Components
import Button from "./Button";
import CustomLoader from "./CustomLoader";

//Service
import { LanguageContext } from "../../data/LanguageContext";
import { responsiveFontSize } from "react-native-responsive-dimensions";
import { LinearGradient } from "expo-linear-gradient";

//Expo
import * as NavigationBar from 'expo-navigation-bar'

const CounterModal = ({ onExit, writeComplete, sayingNr, borderColor, loadingColor}) => {

    const language = useContext(LanguageContext);

    const screen_height = Dimensions.get("screen").height;

    return (
      <>
        <View
            style={[styles.container, {
              alignItems: "center",
              justifyContent: "center",
              backgroundColor: "rgba(0,0,0,0.85)",
              flex: 1,
              height: screen_height
            }]}
          >
            
            <View
                style={{
                  width: "100%",
                  height: "70%",
                  alignSelf: "center",
                  borderRadius: 25,
                }}
              >
            {writeComplete ? (
              <>
                <View style={{ flex: 5, justifyContent: "center"}}>
                  <Text style={[styles.text, { fontSize: responsiveFontSize(3) }]}>
                    {language.sayings[sayingNr].saying}
                  </Text>
                  <Text
                    style={[
                      styles.text,
                      { fontSize: 15, fontStyle: "italic", marginTop: 10 },
                    ]}
                  >
                    {language.sayings[sayingNr].from}
                  </Text>
                </View>
                <View style={{ flex: 1, justifyContent: "center" }}>
                  <Button
                    title={"Ok"}
                    color={borderColor == null ? "#0080FF" : borderColor}
                    borderradius={25}
                    fontColor={"white"}
                    onPress={() => {
                      onExit();
                    }}
                    hovercolor={"rgba(255,255,255,0.3)"}
                  />
                </View></>
              
            ) : (
              <View style={{height: "100%", width: "100%", justifyContent: "center"}}>
              <CustomLoader x={80} color={"#484F78"} special={true}/></View>
            )}
            </View>
          </View>
          </>
    );
}

export default CounterModal

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#1E2132",
  },
  button: {
    borderRadius: 10,
    padding: 10,
    elevation: 2,
  },
  text: {
    alignSelf: "center",
    fontFamily: "PoppinsMedium",
    fontSize: 18,
    color: "white",
    maxWidth: 250,
    textAlign: "center",
  },
});
