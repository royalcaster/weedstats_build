//React
import React, { useContext, useEffect, useRef, useState } from "react";
import { View, StyleSheet, Animated, Dimensions, Image, TextInput, Text, Touchable, TouchableNativeFeedback } from "react-native";
import { useNavigation } from "@react-navigation/native";

//Service
import { LanguageContext } from "../../data/LanguageContext";

//Third Party
import Entypo from 'react-native-vector-icons/Entypo'

//Custom Components
import Button from '../common/Button'
import { responsiveFontSize } from "react-native-responsive-dimensions";
import CreatePanel from "./CreatePanel/CreatePanel";

const Login = ({ handleLogin, handleCreate, wrongPassword, emailInUse, userNotFound }) => {

  //navigation
  const navigation = useNavigation();

  //Context
  const language = useContext(LanguageContext);

  //Constants
  const screen_width = Dimensions.get("screen").width;

  //State
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showCreatePanel, setShowCreatePanel] = useState(false);
  const [securePassword, setSecurePassword] = useState(true);

  //Ref
  const passwordInput = useRef().current;
  const fadeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    emailInUse ? setShowCreatePanel(true) : null;
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 400,
      useNativeDriver: true,
    }).start();

    }, []);

    const checkForSpace = () => {
      let email_without_space;
      if (email.slice(-1) == " ") {
          email_without_space = email.substring(0, email.length-1);
          setEmail(email_without_space)
      }
    }

  return (
    <Animated.View style={[{ opacity: fadeAnim }, styles.login_container]}>

      {showCreatePanel ? <CreatePanel onExit={() => setShowCreatePanel(false)} handleCreate={handleCreate} emailInUse={emailInUse}/> : null}

      <View
        style={{
          flex: 3,
          zIndex: 2,
          justifyContent: "center"
        }}
      >
        
        <Image
          style={{ height: 100, width: 100, alignSelf: "center"}}
          source={require("../../data/img/logo.png")}
        />
        <Text
          style={{
            color: "white",
            fontSize: responsiveFontSize(3.5),
            fontFamily: "PoppinsBlack",
            textAlign: "center",
            marginTop: 0,
          }}
        >
          WeedStats
        </Text>
      </View>

      <View style={{ zIndex: 2, flex: 5, justifyContent: "center"}}>
        <Text style={styles.label}>E-Mail Adress</Text>
        <TextInput  onBlur={() => checkForSpace()} textContentType="emailAddress" style={[styles.textinput, styles.email_input]} value={email} onChangeText={(text) => setEmail(text)}/>
        {userNotFound ? <Text style={{color: "#FC2044", textAlign: "center"}}>{language.login_user_not_found}</Text> : null }
        <Text style={styles.label}>Password</Text>
        <TextInput onChangeText={(text) => setPassword(text)} secureTextEntry={securePassword} textContentType="password" style={[styles.textinput, styles.password_input]} value={password} />
        <TouchableNativeFeedback background={TouchableNativeFeedback.Ripple("rgba(255,255,255,0.25)", false)} onPress={() => securePassword ? setSecurePassword(false) : setSecurePassword(true)}>
          <View style={styles.touchable}>
            {securePassword ? <><Text style={styles.icon}><Entypo name="eye" style= {styles.icon}/> Show</Text></> : <><Text style= {styles.icon}><Entypo name="eye-with-line" style={styles.icon}/> Hide</Text></>}
          </View>
        </TouchableNativeFeedback>
        {wrongPassword ? <Text style={{color: "#FC2044", textAlign: "center"}}>{language.login_wrong_password}</Text> : null }
      </View>

      <View style={{ zIndex: 2, flex: 2, justifyContent: "center"}}>
      <Button
          fontColor={"white"}
          title={language.login}
          borderradius={100}
          color={"#0080FF"}
          onPress={() => handleLogin(email, password, () => navigation.navigate("home"))}
          hovercolor={"rgba(255,255,255,0.3)"}
          color2={"#004080"}
      />
      <Text style={{fontFamily: "PoppinsMedium", color: "white", fontSize: responsiveFontSize(1.5), textAlign: "center", marginBottom: 10}}>OR</Text>
      <Button
          fontColor={"white"}
          title={"Create your account"}
          borderradius={100}
          color={"#484F78"}
          onPress={() => setShowCreatePanel(true)}
          hovercolor={"rgba(255,255,255,0.3)"}
        />
      </View>

    </Animated.View>
  );
};

const styles = StyleSheet.create({
  login_container: {
    backgroundColor: "#1E2132",
    flex: 1
  },
  login_pressable: {
    borderWidth: 2,
    borderRadius: 100,
    width: 300,
    height: 60,
    justifyContent: "center",
    marginTop: 20,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "white",
    overflow: "hidden",
  },
  text: {
    color: "white",
    fontFamily: "PoppinsLight",
    width: "85%",
    alignSelf: "center",
    textAlign: "center",
    fontSize: 15,
  },
  image: {
      height: 60,
      width: 20,
      alignSelf: "center"
  },
  textinput: {
    backgroundColor: "#131520",
    borderRadius: 10,
    padding: 15,
    width: "80%",
    alignSelf: "center",
    marginVertical: 5,
    fontFamily: "PoppinsMedium",
    fontSize: responsiveFontSize(2),
    color: "white"
  },
  label: {
    color: "white",
    fontSize: responsiveFontSize(1.5),
    fontFamily: "PoppinsMedium",
    left: "10%",
    marginTop: 20
  },
  touchable: {
    alignItems: "center",
  },
  icon: {
    color: "white",
    fontSize: responsiveFontSize(2),
    fontFamily: "PoppinsMedium",
    marginVertical: 10
  }
});

export default Login;
