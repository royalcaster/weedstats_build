//React
import React, { useState, useRef, useContext, useEffect } from "react";
import {
  Animated,
  Platform,
  StatusBar,
  StyleSheet,
  View,
  Image,
  TouchableNativeFeedback,
  TouchableOpacity
} from "react-native";
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

//Custom Components
import Stats from "./Stats/Stats";
import Main from "./Main/Main";
import Map from "./Map/Map";
import Config from "./Config/Config";
import Friends from "./Friends/Friends";
import Intro from "../common/Intro";

//Expo
import * as NavigationBar from 'expo-navigation-bar'

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

  return (
    <>

    {config.first ? <Intro onExit={(introConfig) => handleIntroFinish(introConfig)}/> :

    <Animated.View style={[{ opacity: 1}, styles.container]}>
      <View style={styles.content_container}>

    <Tab.Navigator
    sceneContainerStyle={{backgroundColor: "#1E2132"}}
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
          tabBarShowLabel: false,
          tabBarButton: props => <TouchableOpacity {...props} />}} 
        name="stats" 
        children={() => {
          return <Stats/>
          }} 
      />
      <Tab.Screen 
        options={
          {tabBarIcon: ({color, size}) => {
            return <FontAwesome name="map-marker" style={[styles.settings_icon, {color: color, fontSize: size}]}/>},
          tabBarShowLabel: false,
          tabBarButton: props => <TouchableOpacity {...props} />}} 
        name="map" 
        children={() => {
          return <Map getFriendList={getFriendList}/>
          }} 
      />
      <Tab.Screen 
        options={
          {tabBarIcon: ({ focused }) => {
           if (focused) {
            return <Image style={{height: responsiveHeight(5), width: responsiveHeight(5)}} source={require('../../../assets/icon.png')}/>
           }
           else {
            return <Image style={{height: responsiveHeight(5), width: responsiveHeight(5)}} source={require('../../data/img/logo_bw.png')}/>
           }
          },
          tabBarShowLabel: false,
          tabBarButton: props => <TouchableOpacity {...props} />}} 
        name="main" 
        children={() => {
          return <Main onWriteComplete={onWriteComplete} onSetUser={onSetUser} sendPushNotification={sendPushNotification} toggleNavbar={toggleNavbar} refreshUser={refreshUser}/>
          }} 
      />
      <Tab.Screen 
        options={
          {tabBarIcon: ({color, size}) => {
            return <FontAwesome name="sliders" style={[styles.settings_icon, {color: color, fontSize: size}]}/>},
          tabBarShowLabel: false,
          tabBarButton: props => <TouchableOpacity {...props} />}} 
        name="config" 
        children={() => {
          return <Config deleteAccount={deleteAccount} handleLogOut={handleLogOut} toggleLanguage={toggleLanguage} loadSettings={loadSettings} refreshUser={refreshUser}/>
          }} 
      />
      <Tab.Screen 
        options={
          {tabBarIcon: ({color, size}) => {
            return <FontAwesome name="user" style={[styles.settings_icon, {color: color, fontSize: size}]}/>},
          tabBarShowLabel: false,
          tabBarButton: props => <TouchableOpacity {...props} />}} 
        name="friends" 
        children={() => {return <Friends friendList={friendList} toggleNavbar={toggleNavbar} getFriendList={getFriendList} refreshUser={refreshUser}/>
          }} 
      />
    </Tab.Navigator>
      </View>
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
  }
});
