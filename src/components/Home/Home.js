//React
import React, { useState, useRef, useContext, useEffect } from "react";
import {
  Animated,
  Platform,
  StatusBar,
  StyleSheet,
  Vibration,
  View,
  Image
} from "react-native";
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

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

export default function Home({ sendPushNotification, onSetUser, onWriteComplete, friendList, handleLogOut, toggleLanguage, deleteAccount, getFriendList, loadSettings, refreshUser, handleIntroFinish }) {

  //Navigation
  const Tab = createBottomTabNavigator();
  const main_screen = <Main onWriteComplete={onWriteComplete} onSetUser={onSetUser} sendPushNotification={sendPushNotification} toggleNavbar={toggleNavbar}/>

  //Context
  const config = useContext(ConfigContext);

  //States
  const [view, setView] = useState("main");

  //Refs
  const navSlide = useRef(new Animated.Value(0)).current;

  
  
  useEffect(() => {
    if (Platform.OS == "android") {
      NavigationBar.setBackgroundColorAsync("#484F78");
      StatusBar.setBackgroundColor("rgba(0,0,0,0)");
    }
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

  const test = () => {
    console.log("1");
  }

  return (
    <>

    {config.first ? <Intro onExit={(introConfig) => handleIntroFinish(introConfig)}/> :

    <Animated.View style={[{ opacity: 1}, styles.container]}>
      <View style={styles.content_container}>
        {/* {view == "main" ? (
          <Main onWriteComplete={onWriteComplete} onSetUser={onSetUser} sendPushNotification={sendPushNotification} toggleNavbar={toggleNavbar}/>
        ) : null}
        {view == "stats" ? <Stats/> : null}
        {view == "map" ? <Map getFriendList={getFriendList}/> : null}
        {view == "config" ? <Config deleteAccount={deleteAccount} handleLogOut={handleLogOut} toggleLanguage={toggleLanguage} loadSettings={loadSettings} refreshUser={refreshUser}/> : null}
        {view == "groups" ? (
          <Friends
            friendList={friendList}
            toggleNavbar={toggleNavbar}
            getFriendList={getFriendList}
            refreshUser={refreshUser}/>
        ) : null} */}

    <Tab.Navigator
    initialRouteName="main"
      screenOptions={
        {
          tabBarStyle: {
          backgroundColor: "#484F78",
          elevation: 0,   // for Android
          shadowOffset: {
              width: 0, height: 0 // for iOS
          }},
          headerShown: false,
          tabBarActiveTintColor: "white",
          tabBarInactiveTintColor: "#1E2132"
        }
      }
    >
      <Tab.Screen 
        options={
          {tabBarIcon: ({color, size}) => {
            return <Entypo name="area-graph" style={[styles.settings_icon, {color: color, fontSize: size}]} />},
          tabBarShowLabel: false}} 
        name="stats" 
        children={() => {
          return <Stats/>
          }} 
      />
      <Tab.Screen 
        options={
          {tabBarIcon: ({color, size}) => {
            return <FontAwesome name="map-marker" style={[styles.settings_icon, {color: color, fontSize: size}]}/>},
          tabBarShowLabel: false}} 
        name="map" 
        children={() => {
          return <Map getFriendList={getFriendList}/>
          }} 
      />
      <Tab.Screen 
        options={
          {tabBarIcon: ({color, focused, size}) => {
           if (focused) {
            return <Image style={{height: responsiveHeight(5), width: responsiveHeight(5)}} source={require('../../../assets/icon.png')}/>
           }
           else {
            return <Image style={{height: responsiveHeight(5), width: responsiveHeight(5)}} source={require('../../data/img/logo_bw.png')}/>
           }
          },
          tabBarShowLabel: false}} 
        name="main" 
        children={() => {
          return <Main onWriteComplete={onWriteComplete} onSetUser={onSetUser} sendPushNotification={sendPushNotification} toggleNavbar={toggleNavbar}/>
          }} 
      />
      <Tab.Screen 
        options={
          {tabBarIcon: ({color, size}) => {
            return <FontAwesome name="sliders" style={[styles.settings_icon, {color: color, fontSize: size}]}/>},
          tabBarShowLabel: false}} 
        name="config" 
        children={() => {
          return <Config deleteAccount={deleteAccount} handleLogOut={handleLogOut} toggleLanguage={toggleLanguage} loadSettings={loadSettings} refreshUser={refreshUser}/>
          }} 
      />
      <Tab.Screen 
        options={
          {tabBarIcon: ({color, size}) => {
            return <FontAwesome name="user" style={[styles.settings_icon, {color: color, fontSize: size}]}/>},
          tabBarShowLabel: false}} 
        name="friends" 
        children={() => {return <Friends friendList={friendList} toggleNavbar={toggleNavbar} getFriendList={getFriendList} refreshUser={refreshUser}/>
          }} 
      />
    </Tab.Navigator>

      </View>

      {/* <Animated.View style={[styles.footer_container,{transform:[{translateY: navSlide}]}]}>
        <View style={styles.options_container}>
          <View style={{ flexDirection: "row", width: "100%"}}>
            <MenuButton
              disabled={view == "stats"}
              onPress={() => {
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
                setView("main");
              }}
            />
            <MenuButton
            disabled={view == "config"}
              onPress={() => {
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
      </Animated.View> */}
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
