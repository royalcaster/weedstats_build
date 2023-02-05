//React
import React, { useContext, useEffect, useRef, useState } from "react";
import { View, StyleSheet, Animated, Dimensions, Image, TextInput, Text } from "react-native";

//Service
import { LanguageContext } from "../../data/LanguageContext";

//Custom Components
import LoginNumber from "./LoginNumber/LoginNumber";
import LoginLine from "./LoginLine/LoginLine";
import Button from '../common/Button'
import { responsiveFontSize } from "react-native-responsive-dimensions";
import CreatePanel from "./CreatePanel/CreatePanel";

const Login = ({ handleLogin, handleCreate, wrongPassword, emailInUse, userNotFound }) => {

  const screen_width = Dimensions.get("screen").width;
  const fadeAnim = useRef(new Animated.Value(0)).current;

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [showCreatePanel, setShowCreatePanel] = useState(false);

  const passwordInput = useRef().current;

  const language = useContext(LanguageContext);

  useEffect(() => {
    emailInUse ? setShowCreatePanel(true) : null;
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 400,
      useNativeDriver: true,
    }).start();

    }, []);

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
        <Text style={styles.label}>E-Mail Adresse</Text>
        <TextInput  textContentType="emailAddress" style={[styles.textinput, styles.email_input]} value={email} onChangeText={(text) => setEmail(text)}/>
        {userNotFound ? <Text style={{color: "#FC2044", textAlign: "center"}}>{language.login_user_not_found}</Text> : null }
        <Text style={styles.label}>Kennwort</Text>
        <TextInput onChangeText={(text) => setPassword(text)} secureTextEntry={true} textContentType="password" style={[styles.textinput, styles.password_input]} value={password} />
        {wrongPassword ? <Text style={{color: "#FC2044", textAlign: "center"}}>{language.login_wrong_password}</Text> : null }
      </View>

      <View style={{ zIndex: 2, flex: 2, justifyContent: "center"}}>
      <Button
          fontColor={"white"}
          title={language.login}
          borderradius={100}
          color={"#0080FF"}
          onPress={() => handleLogin(email, password)}
          hovercolor={"rgba(255,255,255,0.3)"}
          color2={"#004080"}
      />
      <Text style={{fontFamily: "PoppinsMedium", color: "white", fontSize: responsiveFontSize(1.5), textAlign: "center", marginBottom: 10}}>ODER</Text>
      <Button
          fontColor={"white"}
          title={"Ein Konto erstellen"}
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
  login_heading: {
    color: "#1E2132",
    fontSize: responsiveFontSize(2),
    fontFamily: "PoppinsBlack",
    textAlign: "center",
    textAlignVertical: "center",
    marginTop: 10,
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
  login_pressable_text: {
    color: "white",
    alignSelf: "center",
    fontFamily: "PoppinsLight",
    fontSize: 18,
    color: "#1E2132",
  },
  login_logo: {
    width: 60,
    height: 60,
    alignSelf: "center",
  },
  info_container: {
    width: "85%",
    flex: 4,
    backgroundColor: "#1E2132",
    alignSelf: "center",
    borderRadius: 20,
  },
  info_icon: {
    color: "white",
    alignSelf: "center",
    fontSize: 70,
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
  valid_label: {
    fontFamily: "PoppinsMedium",
    fontSize: responsiveFontSize(1.5),
    alignSelf: "center",
    marginTop: 10
  }
});

export default Login;
