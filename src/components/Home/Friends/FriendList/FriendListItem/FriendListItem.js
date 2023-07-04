//React
import React, { useEffect, useRef, useState } from "react";
import { View, Animated, StyleSheet, Text, Easing, Image, TouchableNativeFeedback } from "react-native";

//Custom Components
import ProfileImage from "../../../../common/ProfileImage";
import FriendPage from './FriendPage/FriendPage'

//Konstanten
import levels from "../../../../../data/Levels.json";

//Third Party
import { responsiveFontSize, responsiveHeight, responsiveWidth } from "react-native-responsive-dimensions";

//Firebase
import { doc, getDoc } from "@firebase/firestore";
import { firestore } from "../../../../../data/FirebaseConfig";

const FriendListItem = ({ friend, toggleNavbar, onPress, friendList }) => {

  //State
  const [user, setUser] = useState();
  const [counters, setCounters] = useState();
  const [isLoading, setIsLoading] = useState(true);

  /* const [showFriend, setShowFriend] = useState(false);
  const [activeFriend, setActiveFriend] = useState(null); */

  const opacityAnim = useRef(new Animated.Value(0)).current;
  const slide1Anim = useRef(new Animated.Value(100)).current;
  const slide2Anim = useRef(new Animated.Value(100)).current;
  const scale = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    animate();
  },[]);

  const animate = () => {
    Animated.timing(opacityAnim, {
      toValue: 1,
      duration: 200,
      useNativeDriver: true,
    }).start();

    /* Animated.timing(slide1Anim, {
      toValue: 0,
      duration: 250,
      useNativeDriver: true,
      easing: Easing.bezier(0, 1.02, 0.21, 0.97),
    }).start();

    Animated.timing(slide2Anim, {
      toValue: 0,
      duration: 250,
      useNativeDriver: true,
      easing: Easing.bezier(0, 1.02, 0.21, 0.97),
    }).start(); */

    setIsLoading(false);
  };
/* 
  const calcLevelName = (counter) => {
    let indicator = Math.floor(counter / 70);
    return indicator > levels.length - 1
      ? levels[levels.length - 1].name
      : levels[Math.floor(counter / 70)].name;
  };
 */
  return (
    <>

      {/* <FriendPage
        show={showFriend}
        user={activeFriend}
        onExit={() => {setShowFriend(false); setActiveFriend(null);}}
        refresh={() => {getFriendList(); setActiveFriend(null); setShowFriend(false);}}
        toggleNavbar={toggleNavbar}
      /> */}

      {!isLoading ? (
        <Animated.View style={[{ opacity: opacityAnim, transform: [{scale: scale}]}, styles.container]}>
          <TouchableNativeFeedback delayPressIn={50} background={TouchableNativeFeedback.Ripple("rgba(255,255,255,0.15)", false)} onPress={onPress}>
            <View style={styles.touchable}>
              <View style={{ flexDirection: "row", alignItems: "center" }}>
                <View style={{ width: 20 }}></View>
                <Animated.View
                  style={{ transform: [{ translateY: 0}], zIndex: 2}}
                >
                  {!isLoading ? <ProfileImage x={45} type={1} url={friend.photoUrl} /> : null}
                </Animated.View>
                <View style={{ width: responsiveWidth(3) }}></View>
                <Animated.View
                  style={{
                    flexDirection: "row",
                    transform: [{ translateY: 0}],
                    zIndex: 1,
                  }}
                >
                  {!isLoading ? 
                  <Text style={styles.username}>{friend.username}</Text> :null}
                </Animated.View>
              </View>
            </View>
            </TouchableNativeFeedback>
        </Animated.View>
      ) : null}
    </>
  );
};

export default FriendListItem;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row"
  },
  username: {
    color: "rgba(255,255,255,1)",
    fontFamily: "PoppinsMedium",
    fontSize: responsiveFontSize(1.8),
  },
  touchable: {
    width: "100%",
    justifyContent: "center",
    paddingVertical: 15
  }
});
