import { useBackHandler } from "@react-native-community/hooks";
import { hide } from "expo-splash-screen";
import React, { useEffect, useRef, useState, useContext } from "react";
import { View, StyleSheet, Animated, Dimensions, Easing, Text, TextInput, ScrollView } from 'react-native'
import { responsiveFontSize } from "react-native-responsive-dimensions";
import Button from "../../common/Button";
import { LanguageContext } from "../../../data/LanguageContext";

const CreatePanel = ({ handleCreate, onExit, emailInUse }) => {

    const slideAnim = useRef(new Animated.Value(Dimensions.get("window").width)).current;

    const language = useContext(LanguageContext);
    
    const [userName, setUserName] = useState("");
    const [email, setEmail] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");
    const [password, setPassword] = useState("");
    const [passwordSubmit, setPasswordSubmit] = useState("");

    const [emailIsValid, setEmailIsValid] = useState(false);
    const [passwordLengthValid, setPasswordLengthValid] = useState(false);
    const [passwordNumberValid, setPasswordNumberValid] = useState(false);
    const [passwordMatch, setPasswordMatch] = useState(false);

    useBackHandler(() => {
        hide();
        return true;
    });

    useEffect(() => {
        Animated.timing(slideAnim,
        {
            toValue: 0,
            duration: 300,
            useNativeDriver: true,
            easing: Easing.bezier(0.07, 1, 0.33, 0.89)
        }).start();
    },[]);

    useEffect(() => {
        checkMatch();
    },[password, passwordSubmit]);

    const hide = () => {
        Animated.timing(slideAnim,
        {
            toValue: Dimensions.get("screen").width,
            duration: 300,
            useNativeDriver: true,
            easing: Easing.bezier(0.07, 1, 0.33, 0.89)
        }).start((finished) => {
            if (finished){
                
                onExit();
            }
        });
    }

    const validateEmail = (text) => {
        let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w\w+)+$/;
        if (reg.test(text) === false) {
            setEmailIsValid(false);
        }
        else {
            setEmailIsValid(true);
        }
    }

    const validatePassword = (text) => {
        if (/\d/.test(text) ) {
          setPasswordNumberValid(true);
        }
        else {
            setPasswordNumberValid(false);
        }
        if (text.length > 7) {
            setPasswordLengthValid(true);
        }
        else {
            setPasswordLengthValid(false);
        }
      }

      const checkMatch = () => {
        if (passwordSubmit === password) {
            setPasswordMatch(true);
        }
        else {
            setPasswordMatch(false);
        }
      }

    return (
        <Animated.View style={[styles.container, {transform:  [{translateX: slideAnim}]}]}>
        <ScrollView>
        <View style={{height: 50}}></View>

        <Text style={[styles.label, {fontSize: responsiveFontSize(3)}]}>Dein Konto erstellen</Text>

        <Text style={styles.label}>Nutzername</Text>
        <TextInput onChangeText={(text) => setUserName(text)} style={[styles.textinput, styles.password_input]} value={userName}/>

        <Text style={styles.label}>
            Email-Adresse
            <Text style={[styles.valid_label, {color: emailIsValid ? "#00DB4D" : "#FC2044"}]}>   Gültig</Text>
        </Text>
        <TextInput onChangeText={(text) => {setEmail(text); validateEmail(text)}} style={[styles.textinput, styles.password_input]} value={email}/>
        {emailInUse ? <Text style={{color: "#FC2044", textAlign: "center"}}>Email-Adresse wird bereits verwendet</Text> : null}

        {/* <Text style={styles.label}>Telefonnummer</Text>
        <TextInput onChangeText={(text) => setPhoneNumber(text)} style={[styles.textinput, styles.password_input]} value={phoneNumber}/> */}

        <Text style={styles.label}>
            Passwort 
            <Text style={[styles.valid_label, {color: passwordLengthValid ? "#00DB4D" : "#FC2044"}]}>   Mindestens 8 Stellen</Text> 
            <Text style={[styles.valid_label, {color: passwordNumberValid ? "#00DB4D" : "#FC2044"}]}>   Mindestens eine Zahl</Text>
        </Text>
             
        
        <TextInput onChangeText={(text) => {setPassword(text); validatePassword(text)}} secureTextEntry={true} style={[styles.textinput, styles.password_input]} value={password}/>

        <Text style={styles.label}>
            Passwort bestätigen
            <Text style={[styles.valid_label, {color: passwordMatch ? "#00DB4D" : "#FC2044"}]}>   Übereinstimmung</Text>
        </Text>
        <TextInput onChangeText={(text) => {setPasswordSubmit(text); checkMatch()}} secureTextEntry={true} style={[styles.textinput, styles.password_input]} value={passwordSubmit}/>

        <View style={{height: 40}}></View>
        
        <Button
          fontColor={!emailIsValid || !passwordLengthValid || !passwordNumberValid || !passwordMatch || userName.length == 0 ? "#484F78" : "white"}
          title={"Mein Konto erstellen"}
          borderradius={100}
          color={"#0080FF"}
          onPress={() => handleCreate(userName, email, password)}
          hovercolor={"rgba(255,255,255,0.3)"}
          color2={"#004080"}
          disabled={!emailIsValid || !passwordLengthValid || !passwordNumberValid || !passwordMatch || userName.length == 0}
        />
        <Button
            fontColor={"white"}
            title={"Abbrechen"}
            borderradius={100}
            color={"#484F78"}
            onPress={() => hide()}
            hovercolor={"rgba(255,255,255,0.3)"}
            />

        </ScrollView>
        </Animated.View>
    )
}

export default CreatePanel

const styles = StyleSheet.create({
    container: {
        position: "absolute",
        backgroundColor: "#1E2132",
        borderRadius: 10,
        height: "100%",
        width: "100%",
        zIndex: 10
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
        fontSize: responsiveFontSize(1.25),
        alignSelf: "center",
        marginTop: 10
      }
});