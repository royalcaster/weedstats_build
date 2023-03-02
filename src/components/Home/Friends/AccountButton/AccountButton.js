//React
import React, { useRef, useContext, useEffect, useState } from "react";
import { StyleSheet, Animated, TouchableNativeFeedback, View, Text, Image, Easing } from "react-native";

//Third Party
import { responsiveFontSize, responsiveHeight } from "react-native-responsive-dimensions";

//Service
import { UserContext } from "../../../../data/UserContext";

//Custom Components
import Account from './Account/Account'


const AccountButton = ({ handleLogOut, toggleNavbar, deleteAccount, refreshUser }) => {

    //Context
    const user = useContext(UserContext);

    //State
    const [showAccount, setShowAccount] = useState(false);

    //Animation Refs
    const accountAnim = useRef(new Animated.Value(100)).current;

    useEffect(() => {
        Animated.timing(accountAnim,
        {
            toValue: 0,
            duration: 300,
            useNativeDriver: true,
            easing: Easing.bezier(0, 1.02, 0.21, 0.97),
        }).start();
    },[]);

    return (<>

    <Account
        handleLogOut={handleLogOut}
        onexit={() => setShowAccount(false)}
        toggleNavbar={toggleNavbar}
        show={showAccount}
        deleteAccount={deleteAccount}
        refreshUser={refreshUser}
      />

    <Animated.View
          style={{
            transform: [{ translateY: accountAnim }],
            borderRadius: 10,
            overflow: "hidden",
            position: "relative",
            bottom: responsiveHeight(12),
            height: 60,
            width: "85%",
            alignSelf: "center",
            borderTopColor: "#131520",
            zIndex: 0
          }}
        >
          <TouchableNativeFeedback
            background={TouchableNativeFeedback.Ripple(
              "rgba(255,255,255,0.1)",
              true
            )}
            onPress={() => setShowAccount(true)}
            style={{ width: "100%", height: "100%" }}
          >
            <View style={styles.touchable}>
              <View style={{ flex: 1 }}>
                <Image
                  source={{ uri: user.photoUrl }}
                  style={{ height: "100%", width: "100%" }}
                ></Image>
              </View>
              <View style={{ flex: 4, justifyContent: "center" }}>
                <Text
                  style={{
                    left: 15,
                    fontFamily: "PoppinsMedium",
                    color: "white",
                    fontSize: responsiveFontSize(2.0),
                  }}
                >
                  {user.username}
                </Text>
              </View>
            </View>
          </TouchableNativeFeedback>
        </Animated.View>
    </>)
}

export default AccountButton;

const styles = StyleSheet.create({
    touchable: {
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "row",
        backgroundColor: "#131520"
        },
});