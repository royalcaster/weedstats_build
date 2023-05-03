//React
import { useBackHandler } from "@react-native-community/hooks";
import React, { useEffect, useRef, useState, useContext } from "react";
import { View, StyleSheet, Animated, Dimensions, Easing, Text, TextInput, ScrollView } from 'react-native'
import { responsiveFontSize, responsiveHeight } from "react-native-responsive-dimensions";
import * as ImagePicker from 'expo-image-picker';

//Custom Components
import BackButton from "../../../../../common/BackButton";
import Button from "../../../../../common/Button";
import CustomLoader from "../../../../../common/CustomLoader"
import ProfileImage from "../../../../../common/ProfileImage";

//Service
import { createUsernameArray } from "../../../../../../data/Service";
import { ref, uploadBytes, getDownloadURL } from '@firebase/storage'
import { storage } from "../../../../../../data/FirebaseConfig";

//Data
import { LanguageContext } from "../../../../../../data/LanguageContext";
import { UserContext } from "../../../../../../data/UserContext";

const ProfileEditor = ({ onExit, refreshUser}) => {

    //Context
    const language = useContext(LanguageContext);
    const user = useContext(UserContext);

    //State
    const [showWarning, setShowWarning] = useState(false);
    const [image, setImage] = useState(user.photoUrl);
    const [userName, setUserName] = useState(user.username);
    const [loading, setLoading] = useState(false);

    //Ref
    const slideAnim = useRef(new Animated.Value(Dimensions.get("window").width)).current;
    
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
            easing: Easing.bezier(0,.79,0,.99),
        }).start();
    },[]);

    const hide = () => {
        Animated.timing(slideAnim,
        {
            toValue: Dimensions.get("screen").width,
            duration: 300,
            useNativeDriver: true
        }).start((finished) => {
            if (finished){
                onExit();
            }
        });
    }

      const pickImage = async () => {
        // No permissions request is necessary for launching the image library
        let result = await ImagePicker.launchImageLibraryAsync({
          mediaTypes: ImagePicker.MediaTypeOptions.Images,
          allowsEditing: true,
          aspect: [1,1],
          quality: 1,
          allowsMultipleSelection: false
        });
    
        if (!result.canceled) {
            setImage(result.assets[0].uri);
        }
      };

    const saveChanges = async () => {
        if (image != null && userName.length > 0) {
            setLoading(true);
            let downloadUri = await uploadImageAsync(image);
            await refreshUser({
                username: userName,
                photoUrl: downloadUri,
                username_array: createUsernameArray(userName)
            });
            setLoading(false);
            hide();
        }
        else {
            setShowWarning(true);
        }
    }

    //1:1 aus einem Expo Beispiel geklaut, als ob ich plan von http hab lol
    async function uploadImageAsync(uri) {
        setLoading(true);
        // Why are we using XMLHttpRequest? See:
        // https://github.com/expo/expo/issues/2402#issuecomment-443726662
        const blob = await new Promise((resolve, reject) => {
          const xhr = new XMLHttpRequest();
          xhr.onload = function () {
            resolve(xhr.response);
          };
          xhr.onerror = function (e) {
            console.log(e);
            reject(new TypeError("Network request failed"));
          };
          xhr.responseType = "blob";
          xhr.open("GET", uri, true);
          xhr.send(null);
        });
      
        const fileRef = ref(storage, "profile-pictures/" + user.id + ".png");
        const result = await uploadBytes(fileRef, blob);
        // We're done with the blob, close and release it
        blob.close();
        return await getDownloadURL(fileRef);
      }

    return (
        <Animated.View style={[styles.container, {transform:  [{translateX: slideAnim}]}]}>
        <ScrollView>

        <View style={{height: responsiveHeight(5)}}></View>

          <View style={{flexDirection: "row", alignContent: "center", alignItems: "center"}}>
          <View style={{marginLeft: 20}}>
              <BackButton onPress={() => hide()}/>
          </View>
          <Text style={styles.heading}>{language.edit_your_profile}</Text>
        </View>

        <Text style={styles.label}>{language.profile_image}</Text>
        {loading ? <CustomLoader x={50}/> :
            <View style={{width: responsiveHeight(20), height: responsiveHeight(20), position: "relative", alignSelf: "center"}}>
                <ProfileImage url={image} type={1}/>
            </View>
        }
        <View style={{height: responsiveHeight(2)}}></View>

        <Button
          fontColor={"white"}
          title={language.search_gallery}
          borderradius={100}
          color={"#484F78"}
          onPress={async () => await pickImage()}
          hovercolor={"rgba(255,255,255,0.3)"}
        />

        <Text style={styles.label}>{language.username}</Text>
        <TextInput onChangeText={(text) => setUserName(text)} style={[styles.textinput, styles.password_input]} value={userName}/>

        <View style={{height: 10}}></View>

        {showWarning ? <Text style={styles.warning}>{language.please_check_your_entries}</Text> : null}

        <View style={{height: 40}}></View>
        
        <Button
          fontColor={"white"}
          title={language.config_save}
          borderradius={100}
          color={"#0080FF"}
          onPress={() => saveChanges()}
          hovercolor={"rgba(255,255,255,0.3)"}
          color2={"#004080"}
        />
        <Button
            fontColor={"white"}
            title={language.account_delete_account_cancel}
            borderradius={100}
            color={"#484F78"}
            onPress={() => hide()}
            hovercolor={"rgba(255,255,255,0.3)"}
            />

        </ScrollView>
        </Animated.View>
    )
}

export default ProfileEditor

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
      },
      warning: {
        color: "#eb4034",
        fontFamily: "PoppinsMedium",
        textAlign: "center"
      },
      heading: {
        color: "white",
        fontSize: 20,
        fontFamily: "PoppinsMedium",
        marginLeft: 20,
        textAlign: "left",
        marginTop: 3
  },
});