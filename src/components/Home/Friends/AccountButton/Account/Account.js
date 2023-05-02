//React
import React, { useState, useRef, useContext } from "react";
import { View, StyleSheet, Text, Animated, Easing, Dimensions, TouchableNativeFeedback, PanResponder } from "react-native";

//Custom Components
import ProfileImage from "../../../../common/ProfileImage";
import Button from "../../../../common/Button";
import BackButton from "../../../../common/BackButton";
import CustomModal from "../../../../common/CustomModal";

//Third Party
import { responsiveFontSize, responsiveHeight, responsiveWidth } from "react-native-responsive-dimensions";

//Service
import { UserContext } from "../../../../../data/UserContext";
import { LanguageContext } from "../../../../../data/LanguageContext";
import MemberSince from "../../../../common/MemberSince";

const Account = ({ handleLogOut, onexit, show, toggleNavbar }) => {

  const user = useContext(UserContext);
  const language = useContext(LanguageContext);
  
  const screen_height = Dimensions.get("screen").height;

  const opacityAnim = useRef(new Animated.Value(0)).current;
  const pan = useRef(new Animated.Value(0)).current;

  const slide = () => {
    Animated.timing(opacityAnim, {
      toValue: 1,
      duration: 300,
      useNativeDriver: true,
    }).start();
    Animated.timing(pan, {
      toValue: responsiveHeight(-1),
      duration: 400,
      easing: Easing.bezier(0.2, 1, 0.21, 0.97),
      useNativeDriver: true,
    }).start();
  };

  const hide = () => {
    Animated.timing(pan, {
      toValue: screen_height,
      duration: 300,
      useNativeDriver: true,
    }).start(({ finished }) => {
      if (finished) {
       /*setShowAppInfo(false);
        setShowDonation(false);
        setShowLevels(false);
        setShowTutorial(false);*/
        onexit();
        opacityAnim.setValue(0);
      }
    });
  };

  show ? slide() : hide();
  const [showLogOut, setShowLogOut] = useState(false);

  //PanResponder test -> so funktionierts endlich, so ein dreck ehrlich
  const panResponder = PanResponder.create({
    onStartShouldSetPanResponder: () => {
      if (!showTutorial && !showProfileEditor) {
        return true;
      } 
    },
    onMoveShouldSetPanResponder: (event, gesture) => {
      if (!showTutorial && !showLogOut && !showProfileEditor) {
        return true;
      } 
    },
    onPanResponderMove: (event, gesture) => {
      if (gesture.dy > 0 && !showTutorial) {pan.setValue(gesture.dy);}
    },
    onPanResponderRelease: (event, gesture) =>  {
      if ((gesture.dy > screen_height/ 10 || gesture.vy > 1) && !showTutorial) {hide()} else{slide();}
    }
 });

 const logOutModalContent = <View
 style={{
   alignItems: "center",
   justifyContent: "center",
   backgroundColor: "rgba(0,0,0,0.5)",
   flex: 1
 }}
>
 <View
   style={{
     width: "90%",
     height: 300,
     backgroundColor: "#1E2132",
     alignSelf: "center",
     borderRadius: 25,
   }}
 >
   <View style={{ flex: 1 }}>
     <Text
       style={[
         styles.heading,
         {
           marginLeft: 0,
           textAlign: "center",
           height: "100%",
           textAlignVertical: "center",
           fontSize: responsiveFontSize(3.5),
           fontFamily: "PoppinsMedium"
         },
       ]}
     >
       {language.signout_title}
     </Text>
   </View>
   <View style={{ flex: 1, flexDirection: "row" }}>
     <View
       style={{
         flex: 1,
         justifyContent: "center",
         alignItems: "center",
       }}
     >
       <Button title={language.account_delete_account_cancel} onPress={() => setShowLogOut(false)} color={"#484F78"} fontColor={"white"}/>
     </View>
     <View
       style={{
         flex: 1,
         justifyContent: "center",
         alignItems: "center",
       }}
     >
       <Button title={language.account_sign_out} onPress={() => handleLogOut()} color={"#eb4034"} fontColor={"white"}/>
     </View>
   </View>
 </View>
</View>;

  return (
    <Animated.View
      style={[
        {
          opacity: opacityAnim,
          height: "100%",
          transform: [{ translateY: pan }],
        },
        styles.container,
      ]}
      {...panResponder.panHandlers}
    > 

      {/** log out modal */}
      <CustomModal show={showLogOut} child={logOutModalContent}/>


      <View
        style={{
          flex: 1,
          borderTopLeftRadius: 25,
          borderTopRightRadius: 25,
          backgroundColor: "#131520",
        }}
      >
        <View style={{height: responsiveHeight(2.5)}}></View>
        <View style={{width: "20%", height: 10, backgroundColor: "#1E2132", borderRadius: 50, alignSelf: "center"}}></View>
        <View style={{ width: "100%", justifyContent: "center", flex: 1}}>
          <View style={{ marginLeft: 5, position: "absolute" }}>
            <View style={{ transform: [{ rotate: "-90deg" }], zIndex: 20, left: responsiveWidth(7)}}>
              <BackButton
                onPress={() => {
                  onexit();
                  hide();
                }}
              />
            </View>
          </View>
          <Text
            style={{
              textAlign: "center",
              color: "rgba(255,255,255,1)",
              fontSize: responsiveFontSize(3),
              fontFamily: "PoppinsBlack"
            }}
          >
            {language.account_your_account}
          </Text>
        </View>

        <View
          style={{
            alignItems: "center",
            flex: 1,
            flexDirection: "row",
            width: "80%",
            alignSelf: "center",
            height: 100,
            backgroundColor: "#484F78",
            borderRadius: 15,
            overflow: "hidden"
          }}
        ><TouchableNativeFeedback background={TouchableNativeFeedback.Ripple("rgba(255,255,255,0.25)", false)} style={{overflow: "hidden"}} onPress={() => {setShowProfileEditor(true); toggleNavbar(0)}}>
        <View style={{width: "100%", flexDirection: "row", height: "100%"}}>
            <View
              style={{ flex: 1, justifyContent: "center", alignItems: "center"}}
            >            
                    <View style={styles.touchable_profileimage}>
                    </View>
              <ProfileImage url={user.photoUrl} x={70} type={1} circle={false}/>
              
            </View>

            <View style={{ flex: 2, justifyContent: "center"}}>
              <Text style={styles.username}>{user.username}</Text>
              <Text style={styles.email}>{user.email}</Text>
            </View>
          </View>
          </TouchableNativeFeedback>
        </View>
        
        <View style={{flex: 1, justifyContent: "center", width: "80%", alignSelf: "center"}}>
          <MemberSince backgroundColor={"#1E2132"} timestamp={user.member_since}/>
        </View>
      </View>
    </Animated.View>
  );
}

export default Account;

const styles = StyleSheet.create({
  container: {
    width: "100%",
    position: "absolute",
    backgroundColor: "#1E2132",
    alignSelf: "center",
    marginTop: 50,
    zIndex: 10000
  },
  username: {
    color: "white",
    fontSize: responsiveFontSize(2.2),
    fontFamily: "PoppinsMedium",
  },
  email: {
    color: "rgba(255,255,255,0.75)",
    fontSize: responsiveFontSize(1.4),
    fontFamily: "PoppinsLight",
  },
  money_icon: {
    fontSize: 25,
    color: "white",
    textAlignVertical: "center",
  },
  heading: {
    color: "white",
    textAlign: "center",
    fontFamily: "PoppinsBlack",
    fontSize: responsiveFontSize(3),
    alignSelf: "center",
  },
  touchable: {
    height: "100%",
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
  },
  icon: {
    fontSize: 40,
  },
  text: {
    color: "white",
    fontFamily: "PoppinsMedium",
    textAlign: "center",
    alignSelf: "center"
  },
  touchable_profileimage: {
    zIndex: 1,
    position: "absolute",
    height: 70,
    width: 70,
    borderRadius: 100
  }
});
