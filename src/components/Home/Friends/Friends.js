//react
import React, { useRef, useEffect, useContext, useState } from "react";
import { StyleSheet, Animated, View, Text, Image, TouchableNativeFeedback, Easing } from "react-native";

//Third Party
import { responsiveFontSize, responsiveWidth, responsiveHeight } from "react-native-responsive-dimensions";
import Feather from 'react-native-vector-icons/Feather'

//Service
import { LanguageContext } from "../../../data/LanguageContext";
import { UserContext } from "../../../data/UserContext";

//Custom Components
import FriendList from "./FriendList/FriendList";
import AccountButton from "./AccountButton/AccountButton";
import SearchPanelButton from "./SearchPanelButton/SearchPanelButton";
import FriendRequestButton from "./FriendRequestButton/FriendRequestButton";

const Friends = ({ handleLogOut, toggleNavbar, deleteAccount, getFriendList, refreshUser, friendList }) => {

    //Context
    const user = useContext(UserContext);
    const language = useContext(LanguageContext);

    //Animations-Refs
    const fadeAnim = useRef(new Animated.Value(0)).current;

    useEffect(() => {
        Animated.timing(fadeAnim,
          {
            toValue: 1,
            duration: 500,
            useNativeDriver: true
          }).start()
      },[]);

    return (<>
    
    <Animated.View style={[{ opacity: fadeAnim }, styles.container]}>
        <View style={{ height: responsiveHeight(7) }}></View>
        <View style={{ alignItems: "center", flexDirection: "row", marginBottom: 0}}>
          <Text style={styles.bold_heading}>{language.friends_friends}</Text>
  
            <View style={{flex: 1}}></View>

            <SearchPanelButton />

            <FriendRequestButton refreshUser={refreshUser} getFriendList={getFriendList}/>

            <View style={{ width: 20 }}></View>
        </View>

        <FriendList toggleNavbar={toggleNavbar} friendList={friendList} getFriendList={getFriendList} refreshUser={refreshUser} />

        <AccountButton handleLogOut={handleLogOut} toggleNavbar={toggleNavbar} deleteAccount={deleteAccount} refreshUser={refreshUser}/>

      </Animated.View>

    </>)
}

export default Friends

const styles = StyleSheet.create({
container: {
    backgroundColor: "#1E2132",
    height: "100%",
    width: "100%",
    zIndex: 0
    },
    heading: {
    fontFamily: "PoppinsMedium",
    color: "white",
    fontSize: responsiveFontSize(2.3),
    marginLeft: 30,
    },
    icon: {
    textAlignVertical: "center",
    color: "white",
    fontSize: responsiveFontSize(2.3),
    marginLeft: 10,
    marginRight: 10,
    marginBottom: 10
    },
    text: {
    textAlignVertical: "center",
    marginLeft: 10,
    color: "#c4c4c4",
    fontFamily: "PoppinsLight",
    fontSize: 16,
    },
    touchable: {
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
    backgroundColor: "#131520"
    },
    empty: {
        color: "rgba(255,255,255,0.5)",
        alignSelf: "center",
        fontFamily: "PoppinsLight",
        fontSize: 12
    },
    bold_heading: {
        color: "white",
        fontFamily: "PoppinsBlack",
        fontSize: responsiveFontSize(4),
        marginLeft: responsiveWidth(5)
    }
});