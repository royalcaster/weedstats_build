//React
import React, { useState, useRef, useContext, useEffect } from "react";
import {
  Animated,
  StatusBar,
  StyleSheet,
  Vibration,
  View,
} from "react-native";

//Custom Components
import Stats from "./Stats/Stats";
import Main from "./Main/Main";
import Map from "./Map/Map";
import Config from "./Config/Config";
import Groups from "./Friends/Groups";
import MenuButton from "./MenuButton";
import Friends from "./Friends/Friends";
import Intro from "../common/Intro";

//Expo
import * as NavigationBar from 'expo-navigation-bar'
import { LinearGradient } from "expo-linear-gradient";

//Third Party
import FontAwesome from "react-native-vector-icons/FontAwesome";
import Entypo from "react-native-vector-icons/Entypo";
import { responsiveHeight } from "react-native-responsive-dimensions"
import { ConfigContext } from "../../data/ConfigContext";

export default function Home({ friendList, handleLogOut, toggleCounter, toggleLanguage, deleteAccount, getFriendList, loadSettings, onSetBorderColor, borderColor, refreshUser, handleIntroFinish }) {

  //Context
  const config = useContext(ConfigContext);

  //States
  const [view, setView] = useState("main");

  //Refs
  const navSlide = useRef(new Animated.Value(0)).current;
  
  useEffect(() => {
    StatusBar.setBackgroundColor("rgba(0,0,0,0)");
  }, [view]);

  const toggleNavbar = (x) => {
    x == 1 ? 
    Animated.timing(
      navSlide,{
        toValue: 0,
        duration: 200,
        useNativeDriver: true,
      }
    ).start()
    : Animated.timing(
      navSlide,{
        toValue: 100,
        duration: 200,
        useNativeDriver: true,
      }
    ).start();
  }

  const toggleBorderColor = ( color ) => {
    onSetBorderColor(color);
    StatusBar.setBackgroundColor(color);
    NavigationBar.setBackgroundColorAsync(color);
  }

  return (
    <>

    {config.first ? <Intro onExit={(introConfig) => handleIntroFinish(introConfig)}/> :

    <Animated.View style={[{ opacity: 1}, styles.container]}>
      <View style={styles.content_container}>
        {view == "main" ? (
          <Main toggleCounter={toggleCounter} toggleBorderColor={toggleBorderColor} borderColor={borderColor}/>
        ) : null}
        {view == "stats" ? <Stats/> : null}
        {view == "map" ? <Map getFriendList={getFriendList}/> : null}
        {view == "config" ? <Config deleteAccount={deleteAccount} toggleLanguage={toggleLanguage} loadSettings={loadSettings} refreshUser={refreshUser}/> : null}
        {view == "groups" ? (
          <Friends
            friendList={friendList}
            handleLogOut={handleLogOut}
            toggleNavbar={toggleNavbar}
            deleteAccount={deleteAccount}
            getFriendList={getFriendList}
            refreshUser={refreshUser}/>
        ) : null}
      </View>

      <Animated.View style={[styles.footer_container,{transform:[{translateY: navSlide}]}]}>
        <View style={styles.options_container}>
          <View style={{ flexDirection: "row", width: "100%"}}>
            <MenuButton
              disabled={view == "stats"}
              onPress={() => {
                Vibration.vibrate(25);
                setView("stats");
              }}
              selected={view == "stats"}
              title={"Stats"}
              icon={
                <Entypo
                  name="area-graph"
                  style={[
                    { color: view == "stats" ? "white" : "#1E2132" },
                    styles.settings_icon,
                  ]}
                />
              }
            />
            <MenuButton
              disabled={view == "map"}
              onPress={() => {
                Vibration.vibrate(25);
                setView("map");
              }}
              selected={view == "map"}
              title={"Karte"}
              icon={
                <FontAwesome
                  name="map-marker"
                  style={[
                    { color: view == "map" ? "white" : "#1E2132" },
                    styles.settings_icon,
                  ]}
                />
              }
            />
            <MenuButton
              disabled={view == "main"}
              type={"img"}
              url={
                view == "main"
                  ? require("../../../assets/icon.png")
                  : require("../../data/img/logo_bw.png")
              }
              onPress={() => {
                Vibration.vibrate(25);
                setView("main");
              }}
            />
            <MenuButton
            disabled={view == "config"}
              onPress={() => {
                Vibration.vibrate(25);
                setView("config");
              }}
              selected={view == "config"}
              title={"Settings"}
              icon={
                <FontAwesome
                  name="sliders"
                  style={[
                    { color: view == "config" ? "white" : "#1E2132" },
                    styles.settings_icon,
                  ]}
                />
              }
            />
            <MenuButton
              disabled={view == "groups"}
              onPress={() => {
                Vibration.vibrate(25);
                setView("groups");
              }}
              selected={view == "groups"}
              title={"Social"}
              icon={
                <FontAwesome
                  name="user"
                  style={[
                    { color: view == "groups" ? "white" : "#1E2132" },
                    styles.settings_icon,
                  ]}
                />
              }
            />
          </View>
        </View>
        <View style={styles.gradient_container}>
          <LinearGradient colors={["rgba(0,0,0,0)", "#1E2132","#1E2132"]} style={{height: "100%", width: "100%"}}/>
        </View>
      </Animated.View>
    </Animated.View>
    }</>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#1E2132",
    alignItems: "center",
    borderRadius: 40,
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 0
  },
  content_container: {
    width: "100%",
    position: "relative",
    height: "100%"
  },
  settings_icon: {
    fontSize: 25,
    textAlign: "center"
  },
  options_container: {
    width: "95%",
    bottom: responsiveHeight(1),
    position: "absolute",
    flexDirection: "column",
    height: "100%",
    backgroundColor: "#484F78",
    borderRadius: 20
  },
  options_pressable: {
    flex: 1,
    alignSelf: "center",
    justifyContent: "center",
    height: "100%",
  },
  footer_container: {
    width: "100%",
    height: "8%",
    bottom: -2,
    position: "absolute",
    flexDirection: "row",
    justifyContent: "center",
    zIndex: 10,
  },
  gradient_container: {
    height: responsiveHeight(10),
    width: "100%",
    position: "absolute",
    bottom: 0,
    zIndex: -1
  }
});
