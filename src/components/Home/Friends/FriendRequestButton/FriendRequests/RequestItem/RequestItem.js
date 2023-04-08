//React
import React, { useEffect, useRef, useState } from "react";
import { Animated, View, StyleSheet, Text, Easing, TouchableNativeFeedback } from "react-native";

//Custom Components
import ProfileImage from "../../../../../common/ProfileImage";

//Firebase
import { doc, getDoc } from "@firebase/firestore";
import { firestore } from "../../../../../../data/FirebaseConfig";

//Third Party
import Feather from "react-native-vector-icons/Feather";

const RequestItem = ({ userid, onAccept, onDecline }) => {
  
  const opacityAnim = useRef(new Animated.Value(0)).current;
  const slide1Anim = useRef(new Animated.Value(-500)).current;
  const slide2Anim = useRef(new Animated.Value(-500)).current;

  useEffect(() => {
    loadUser();
  }, []);

  const animate = () => {
    Animated.timing(opacityAnim, {
      toValue: 1,
      duration: 600,
      useNativeDriver: true,
      easing: Easing.bezier(0, 1.02, 0.21, 0.97),
    }).start();

    Animated.timing(slide1Anim, {
      toValue: 0,
      duration: 550,
      useNativeDriver: true,
      easing: Easing.bezier(0, 1.02, 0.21, 0.97),
    }).start();

    Animated.timing(slide2Anim, {
      toValue: 0,
      duration: 250,
      useNativeDriver: true,
      easing: Easing.bezier(0, 1.02, 0.21, 0.97),
    }).start();
  };

  const [user, setUser] = useState();
  const [isLoading, setIsLoading] = useState(true);

  const loadUser = async () => {
    try {
      const docRef = doc(firestore, "users", userid);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        setUser({
          username: docSnap.data().username,
          photoUrl: docSnap.data().photoUrl,
          email: docSnap.data().email
        });
      }
    } catch (e) {
      console.log("Error:", e);
    }
    setIsLoading(false);
    animate();
  };

  return (
    <>
      {!isLoading ? (
        <Animated.View style={[{ opacity: opacityAnim, transform: [{translateX: 0}] }, styles.container]}>
          <View
            style={{
              flexDirection: "column",
              width: "100%",
              height: "100%",
              alignItems: "center",
              justifyContent: "center"
            }}
          >
            <View style={{ flex: 3, flexDirection: "row", width: "100%", height: "100%", padding: 10}}>
              <Animated.View
                style={{ transform: [{ translateX: 0 }], zIndex: 2, justifyContent: "center"}}
              >
                <ProfileImage x={80} type={1} url={user.photoUrl} />
              </Animated.View>
              <View style={{ width: 20 }}></View>
              <Animated.View
                style={{
                  flexDirection: "column",
                  transform: [{ translateX: 0 }],
                  zIndex: 1,
                  justifyContent: "center",
                  flex: 1,
                }}
              >
                <View style={{flex: 3, justifyContent: "center"}}>
                  <Text style={styles.username}>{user.username}</Text>
                  <Text
                    style={[
                      styles.username,
                      { fontFamily: "PoppinsLight", fontSize: 12, marginTop: -3 },
                    ]}
                  >
                    {user.email}
                  </Text>
                </View>

            <View style={{flex: 2, flexDirection: "row", maxHeight: 50}}>
            <View style={{ flex: 1, backgroundColor: "#eb4034", borderRadius: 10, overflow: "hidden"}}>
              <TouchableNativeFeedback
                background={TouchableNativeFeedback.Ripple(
                  "rgba(255,255,255,0.05)",
                  false
                )}
                onPress={() => onDecline()}
              >
                <View style={styles.touchable}>
                  <Feather
                    name="x"
                    style={[styles.icon, { color: "white" }]}
                  />
                </View>
              </TouchableNativeFeedback>
            </View>
            <View style={{width: 10}}></View>
            <View style={{ flex: 1, borderRadius: 10, backgroundColor: "#00DB4D"}}>
              <TouchableNativeFeedback
                background={TouchableNativeFeedback.Ripple(
                  "rgba(255,255,255,0.05)",
                  false
                )}
                onPress={() => onAccept()}
              >
                <View style={styles.touchable}>
                  <Feather
                    name="check"
                    style={[styles.icon, { color: "white" }]}
                  />
                </View>
              </TouchableNativeFeedback>
            </View>
            </View>
              </Animated.View>
            </View>
          </View>
        </Animated.View>
      ) : null}
    </>
  );
};

export default RequestItem;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    height: 120,
    width: "90%",
    backgroundColor: "#1E2132",
    alignSelf: "center",
    marginBottom: 10,
    borderRadius: 15,
    overflow: "hidden"
  },
  username: {
    color: "rgba(255,255,255,0.8)",
    fontFamily: "PoppinsBlack",
    fontSize: 15,
  },
  touchable: {
    width: "100%",
    justifyContent: "center",
    height: "100%",
  },
  icon: {
    textAlign: "center",
    fontSize: 30,
  },
});
