//react
import React, { useRef, useEffect, useContext } from "react";
import { StyleSheet, Animated, View, Text } from "react-native";

//Third Party
import { responsiveFontSize, responsiveWidth, responsiveHeight } from "react-native-responsive-dimensions";

//Service
import { LanguageContext } from "../../../data/LanguageContext";
import { UserContext } from "../../../data/UserContext";

//Custom Components
import FriendList from "./FriendList/FriendList";
import SearchPanelButton from "./SearchPanelButton/SearchPanelButton";
import FriendRequestButton from "./FriendRequestButton/FriendRequestButton";

const Friends = ({ toggleNavbar, getFriendList, refreshUser, friendList }) => {

    //Context
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
        <View style={{ alignItems: "center", flexDirection: "row", marginBottom: 0, zIndex: 10000}}>
          <Text style={styles.bold_heading}>{language.friends_friends}</Text>
  
            <View style={{flex: 1}}></View>

            <SearchPanelButton />

            <FriendRequestButton refreshUser={refreshUser} getFriendList={getFriendList}/>

            <View style={{ width: 20 }}></View>
        </View>

        <FriendList toggleNavbar={toggleNavbar} friendList={friendList} getFriendList={getFriendList} refreshUser={refreshUser} />

      </Animated.View>

    </>)
}

export default Friends

const styles = StyleSheet.create({
container: {
    backgroundColor: "#1E2132",
    height: "100%",
    width: "100%",
    zIndex: 10
    },
    bold_heading: {
        color: "white",
        fontFamily: "PoppinsBlack",
        fontSize: responsiveFontSize(4),
        marginLeft: responsiveWidth(5)
    }
});