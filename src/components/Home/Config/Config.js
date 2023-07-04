//React
import React, { useState, useEffect, useRef, useContext } from "react";
import {
  Dimensions,
  View,
  LogBox,
  StyleSheet,
  Text,
  Animated,
  ScrollView,
  Modal,
  Vibration,
  TouchableNativeFeedback
} from "react-native";

//Custom Components
import Button from "../../common/Button";
import ConfigItem from "./ConfigItem/ConfigItem";
import CustomLoader from "../../common/CustomLoader";
import ConfigToggle from "./ConfigToggle/ConfigToggle";
import ProfileImage from "../../common/ProfileImage";
import ProfileEditor from "../Friends/AccountButton/Account/ProfileEditor/ProfileEditor";
import MemberSince from "../../common/MemberSince";

//Third Party
import {
  responsiveHeight,
  responsiveFontSize,
  responsiveWidth
} from "react-native-responsive-dimensions";
import LanguageSelector from "./LanguageSelector/LanguageSelector";
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import Feather from 'react-native-vector-icons/Feather'

//Service
import { LanguageContext } from "../../../data/LanguageContext";
import { useBackHandler } from "@react-native-community/hooks";
import { ConfigContext } from "../../../data/ConfigContext";
import CustomModal from "../../common/CustomModal";
import { UserContext } from "../../../data/UserContext";

const Config = ({ toggleLanguage, loadSettings, deleteAccount, refreshUser, handleLogOut }) => {

  //Context
  const user = useContext(UserContext);
  const language = useContext(LanguageContext);
  const config = useContext(ConfigContext);

  //State
  const [localConfig, setLocalConfig] = useState(config);
  const [loading, setLoading] = useState(true);
  const [saved, setSaved] = useState(true);
  const [lightmode, setLightMode] = useState(false);
  const [showProfileEditor, setShowProfileEditor] = useState(false);
  const [showDelete, setShowDelete] = useState(false);
  const [showLogOut, setShowLogOut] = useState(false);

  //Refs
  const fadeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    LogBox.ignoreAllLogs();
    config != null ? setLoading(false) : null;
  }, []);

  const vibrate = (ms) => {
    Vibration.vibrate(ms);
  }

  useBackHandler(() => {
    return true;
  });

  const storeSettings = async () => {
    console.log(localConfig);
    try {/* 
      const accessToken = JSON.parse(await AsyncStorage.getItem("accessToken"));
      await AsyncStorage.setItem("accessToken", JSON.stringify({
        email: accessToken.email,
        password: accessToken.password,
        localAuthenticationRequired: localConfig.localAuthenticationRequired  
      })); */
      toggleLanguage(localConfig.language);
      refreshUser({
        config: localConfig
      });
    } catch (e) {
      console.log("Error in Config beim Speichern: ", e);
    }
    loadSettings();
    setLoading(false);
    setSaved(true);
  };

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 200,
      useNativeDriver: true,
    }).start();
  }, [fadeAnim]);

  const handleLanguageSwitch = (lang) => {
    setLocalConfig({...localConfig, language: lang});
  }

  const lightmodeModalContent = <View
  style={{
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "rgba(0,0,0,0.5)",
    flex: 1,
    height: Dimensions.get("screen").height,
    top: 0,
    zIndex: 1000
  }}
>
  <View style={{flex:1, justifyContent: "flex-start"}}></View>
  <View
    style={{
      width: "90%",
      backgroundColor: "#1E2132",
      alignSelf: "center",
      borderRadius: 25,
      height: "50%"
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
          },
        ]}
      >
        {language.config_modal_title}
      </Text>
    </View>
    <View style={{ flex: 2 }}>
      <Text style={[styles.text, { fontSize: responsiveFontSize(1.8)}]}>
        {language.config_modal_text}
      </Text>
    </View>
    <View style={{ flex: 1 }}>
      <Button
        title={language.config_modal_thanks}
        color={"#484F78"}
        borderradius={25}
        fontColor={"white"}
        onPress={() => setLightMode(false)}
        hovercolor={"rgba(255,255,255,0.3)"}
      />
    </View>
  </View>
  <View style={{flex:1, justifyContent: "flex-end"}}></View>
</View>;

const deleteAccountModalContent = <View
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
      {language.delete_account_title}
    </Text>
  </View>
  <View style={{ flex: 1}}>
    <Text style={[styles.text, { fontSize: responsiveFontSize(2), maxWidth: "80%", fontFamily: "PoppinsMedium"}]}>
      {language.delete_account_text}
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
      <Button title={language.account_delete_account_cancel} onPress={() => setShowDelete(false)} color={"#484F78"} fontColor={"white"}/>
    </View>
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Button title={language.account_delete_account_submit} onPress={() => deleteAccount()} color={"#eb4034"} fontColor={"white"}/>
    </View>
  </View>
</View>
</View>;

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
    <>
      <Animated.View style={[{ opacity: fadeAnim }, styles.container]}>

      {showProfileEditor ? <ProfileEditor onExit={() => {setShowProfileEditor(false)}} refreshUser={refreshUser}/> : null}
        
        <CustomModal show={lightmode} child={lightmodeModalContent}/>

        <CustomModal show={showDelete} child={deleteAccountModalContent} />

        <CustomModal show={showLogOut} child={logOutModalContent}/>

        {loading ? (
          <View
            style={{ flex: 1, justifyContent: "center", alignItems: "center"}}
          >
            <CustomLoader x={50} color={"#0080FF"}/>
          </View>
        ) : (
          <View style={{height: "100%", position: "absolute", width: "100%"}}>
          <ScrollView style={{ width: "100%"}}>
            <View style={{height: responsiveHeight(7)}}></View>

            <View style={{flexDirection: "row"}}>
              <View style={{flex: 1}}>
                	<Text style={styles.bold_heading}>{language.config_settings}</Text>
              </View>
              <View style={{width: "30%"}}> 
                {saved ? (
                  <Button
                    fontColor={"rgba(255,255,255,0.5)"}
                    onPress={() => {}}
                    borderradius={100}
                    color={"#131520"}
                    title={language.config_saved}
                    hovercolor={"rgba(255,255,255,0.3)"}
                  />
                ) : (
                  <Button
                    fontColor={"white"}
                    onPress={() => {
                      vibrate(100);
                      storeSettings();
                    }}
                    borderradius={100}
                    color={"#0080FF"}
                    title={language.config_save}
                    hovercolor={"rgba(255,255,255,0.3)"}
                  /> 
                )}
              </View>
            </View>

            
           

            <Text style={styles.heading}>Account</Text>

            <View style={{height: responsiveHeight(1)}}></View>

            <View
              style={{
                alignItems: "center",
                flex: 1,
                flexDirection: "row",
                width: "90%",
                alignSelf: "center",
                height: 100,
                backgroundColor: "#484F78",
                borderRadius: 15,
                overflow: "hidden",
              }}
            ><TouchableNativeFeedback background={TouchableNativeFeedback.Ripple("rgba(255,255,255,0.25)", false)} style={{overflow: "hidden"}} onPress={() => {setShowProfileEditor(true)}}>
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
        
        <View style={{height: responsiveHeight(1)}}></View>

        <View style={{flex: 1, justifyContent: "center", width: "90%", alignSelf: "center"}}>
          <MemberSince backgroundColor={"#131520"} timestamp={user.member_since}/>
        </View>

        <View style={{height: responsiveHeight(1)}}></View>
        <View style={{flexDirection: "row", width: "90%", alignSelf: "center", justifyContent: "space-around"}}>
          <View style={{flex: 1}}>
            <Button
                onPress={() => setShowLogOut(true)}
                title={" " + language.account_sign_out}
                icon={<MaterialIcons name="logout" style={styles.money_icon} />}
                borderradius={100}
                color={"#eb4034"}
                fontColor={"white"}
                hovercolor={"rgba(255,255,255,0.5)"}
                small={true}
              />
          </View>
          <View style={{width: responsiveWidth(2)}}></View>
          <View style={{flex: 1}}>
            <Button
                onPress={() => setShowDelete(true)}
                title={" " + language.account_delete_account}
                icon={<Feather name="trash-2" style={styles.money_icon} />}
                borderradius={100}
                color={"#eb4034"}
                fontColor={"white"}
                hovercolor={"rgba(255,255,255,0.5)"}
                small={true}
              />
          </View>
        </View>

            <View style={{height: responsiveHeight(1)}}></View>

            <Text style={styles.heading}>{language.config_counter}</Text>
            <View style={{height: responsiveHeight(1)}}></View>

            <View style={{flexDirection: "row", width: "90%", alignSelf: "center"}}>

              <View style={{alignSelf: "center", flex: 1}}>
                <ConfigItem
                  type="joint"
                  config={localConfig.showJoint}
                  onToggle={() => {
                    setLocalConfig({ ...localConfig, showJoint: !localConfig.showJoint });
                    vibrate(25);
                    setSaved(false);
                  }}
                />
              </View>

              <View style={{alignSelf: "center", flex: 1}}>
                <ConfigItem
                  type="bong"
                  config={localConfig.showBong}
                  onToggle={() => {
                    setLocalConfig({ ...localConfig, showBong: !localConfig.showBong });
                    vibrate(25);
                    setSaved(false);
                  }}
                />
              </View>
            </View> 

            <View style={{flexDirection: "row", width: "90%", alignSelf: "center"}}>

              <View style={{alignSelf: "center", flex: 1}}>
                <ConfigItem
                  type="vape"
                  config={localConfig.showVape}
                  onToggle={() => {
                    setLocalConfig({ ...localConfig, showVape: !localConfig.showVape });
                    vibrate(25);
                    setSaved(false);
                  }}
                />
              </View>

              <View style={{alignSelf: "center", flex: 1}}>
                <ConfigItem
                  type="pipe"
                  config={localConfig.showPipe}
                  onToggle={() => {
                    setLocalConfig({ ...localConfig, showPipe: !localConfig.showPipe });
                    vibrate(25);
                    setSaved(false);
                  }}
                />
              </View>
            </View> 

            <View style={{flexDirection: "row", width: "90%", alignSelf: "center"}}>

              <View style={{alignSelf: "center", flex: 1}}>
                <ConfigItem
                  type="cookie"
                  config={localConfig.showCookie}
                  onToggle={() => {
                    setLocalConfig({ ...localConfig, showCookie: !localConfig.showCookie });
                    vibrate(25);
                    setSaved(false);
                  }}
                />
              </View>

              <View style={{alignSelf: "center", flex: 1}}>
                
              </View>
            </View> 

            <View style={{height: responsiveHeight(3)}}></View>

            <Text style={styles.heading}>{language.config_personal_data}</Text>
            

            <ConfigToggle
              value={localConfig.shareMainCounter}
              onPress={() => {
                setLocalConfig({
                  ...localConfig,
                  shareMainCounter: !localConfig.shareMainCounter,
                });
                vibrate(25);
                setSaved(false);
              }}
              disabled={false}
              label={language.config_share_main_counter}
            />

            <ConfigToggle
              label={language.config_share_detail_counter}
              disabled={!localConfig.shareMainCounter}
              value={localConfig.shareTypeCounters}
              onPress={() => {
                setLocalConfig({
                  ...localConfig,
                  shareTypeCounters: !localConfig.shareTypeCounters,
                });
                vibrate(25);
                setSaved(false);
              }}
            />

            <ConfigToggle
              label={language.config_share_last_activity}
              value={localConfig.shareLastEntry}
              onPress={() => {
                setLocalConfig({
                  ...localConfig,
                  shareLastEntry: !localConfig.shareLastEntry,
                });
                vibrate(25);
                setSaved(false);
              }}
            />

            <ConfigToggle
              label={language.config_get_location}
              value={localConfig.saveGPS}
              onPress={() => {
                setLocalConfig({ ...localConfig, saveGPS: !localConfig.saveGPS });
                vibrate(25);
                setSaved(false);
              }}
            />

            <ConfigToggle
              label={language.config_share_location}
              disabled={!localConfig.saveGPS}
              value={localConfig.shareGPS}
              onPress={() => {
                setLocalConfig({
                  ...localConfig,
                  shareGPS: !localConfig.shareGPS,
                });
                vibrate(25);
                setSaved(false);
              }}
            />

            <View style={{ height: 30 }}></View>

            <Text style={styles.heading}>{language.config_security}</Text>
            <View style={{ height: 5 }}></View>

            <ConfigToggle
            label={language.config_unlock_on_launch}
              value={localConfig.localAuthenticationRequired}
              onPress={() => {
                setLocalConfig({
                  ...localConfig,
                  localAuthenticationRequired: !localConfig.localAuthenticationRequired,
                });
                vibrate(25);
                setSaved(false);
              }}
            />

            <View style={{ height: 30 }}></View>

            <Text style={styles.heading}>{language.config_language}</Text>
            <View style={{ height: 5 }}></View>

            <LanguageSelector toggleLanguage={(lang) => {handleLanguageSwitch(lang); setSaved(false)}} value={localConfig.language} onVibrate={() => vibrate(25)}/>

            <View style={{ height: 30 }}></View>

            <Text style={styles.heading}>{language.config_other}</Text>
            <View style={{ height: 5 }}></View>

            <ConfigToggle
              label={language.config_lightmode}
              value={lightmode}
              onPress={(val) => {setLightMode(true); vibrate(25);}}
            />

          <View style={{height: responsiveHeight(12)}}></View>
          </ScrollView>
          </View>   
        )}

          <View style={styles.save_button_container}>
            
            </View>
      </Animated.View>
    </>
  );
};

export default Config;

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: "100%",
    backgroundColor: "#1E2132",
    justifyContent: "center",
  },
  heading: {
    color: "white",
    fontSize: responsiveFontSize(2.3),
    fontFamily: "PoppinsMedium",
    marginLeft: 20,
  },
  text: {
    alignSelf: "center",
    fontFamily: "PoppinsMedium",
    fontSize: 18,
    color: "white",
    maxWidth: 250,
    textAlign: "center",
  },
  save_button_container: {
    width: "100%",
    position: "absolute",
    bottom: responsiveHeight(10)
  },
  toggle_container: {
    flexDirection: "row",
    height: 40,
    width: "95%",
    alignContent: "center",
  },
  bold_heading: {
    color: "white",
    fontFamily: "PoppinsBlack",
    fontSize: responsiveFontSize(4),
    marginLeft: responsiveWidth(5)
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
  touchable_profileimage: {
    zIndex: 1,
    position: "absolute",
    height: 70,
    width: 70,
    borderRadius: 100
  },
  money_icon: {
    fontSize: 25,
    color: "white",
    textAlignVertical: "center",
  },
});
