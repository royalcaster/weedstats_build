//React
import React, { useContext, useEffect, useRef, useState } from "react";
import { Animated, StyleSheet, View, Text, Image, Dimensions, ScrollView, Easing, TouchableNativeFeedback, Alert } from "react-native";

//Third Party
import { responsiveFontSize, responsiveHeight, responsiveWidth } from "react-native-responsive-dimensions";
import Entypo from 'react-native-vector-icons/Entypo'
import IonIcons from 'react-native-vector-icons/Ionicons'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import { useBackHandler } from '@react-native-community/hooks'
import { Video, ResizeMode } from 'expo-av';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5'

//Custom Components
import BackButton from "./BackButton";
import Button from "./Button";
import IconButton from '../common/IconButton'

//Konstanten
import Levels from '../../data/Levels.json'
import { LanguageContext } from "../../data/LanguageContext";

//Expo
import * as Linking from 'expo-linking'

const Tutorial = ({ onDone, type}) => {

    //Context
    const language = useContext(LanguageContext);

    //State
    const [consented, setConsented] = useState(false);
    //ref
    const touchRef = useRef(new Animated.Value(0)).current

    useEffect(() => {
      toggleTouchAnimation();
      show();
    },[]);

    useBackHandler(() => {
      if (type != "first") {
        onDone();
      }
      return true
  })

const slide = useRef(new Animated.Value(0)).current;

const show = () => {
    Animated.timing(slide,{
        toValue: 1,
        duration: 400,
        useNativeDriver: true,
    }).start()
}

const hide = () => {
    Animated.timing(slide,{
        toValue: 0,
        duration: 400,
        useNativeDriver: true
    }).start(({finished}) => {
        finished ? onDone() : null;
    })
}

  const toggleTouchAnimation = () => {
    touchRef.setValue(0);
    Animated.timing(touchRef, {
      toValue: responsiveHeight(-20),
      useNativeDriver: true,
      duration: 2000,
      easing: Easing.bezier(0.2, 1, 0.21, 0.97),
    }).start(({finished}) => {
      finished ? setTimeout(() => toggleTouchAnimation(), 500) : null;
    });
  }

  const RenderItem = ( item ) => {
    return (
      <View style={{width: "100%", justifyContent: "center", flexDirection: "column", height: Dimensions.get("window").height, bottom: 0, zIndex: 10, borderRadius: 25, overflow: "hidden", backgrounColor: item.backgroundColor}}>
        {item.testComponent ? item.testComponent : null}
      </View>
    );
  }

  const titleScreen = () => {
    return <>
    <View style={styles.testComponentContainer}>
      <View style={{flex: 1, justifyContent: "center"}}>
        <Image style={{height: 100, width: 100, alignSelf: "center", borderRadius: 15}} source={require('../../../assets/icon.png')}/>
        <View style={{height: 20}}></View>
        <Text style={[styles.logo_heading,{position: "relative"}]}>WeedStats</Text>
        <Text style={[styles.logo_heading,{position: "relative", color: "#F2338C", fontSize: responsiveFontSize(2.5)}]}>Tutorial</Text>
      </View>
      <View style={{flex: 1, justifyContent: "center"}}>
      <Animated.View style={{
          alignSelf: "center",
          transform: [
            {translateY: touchRef}
          ]
        }}>
          <IonIcons name="finger-print" style={styles.fingerprint}/>
        </Animated.View>
        <View style={{height: responsiveHeight(2)}}></View>
        <Text style={styles.swipe_up_text}>{language.tutorial_swipe_text}</Text>
      </View>
    </View>
    </>
  }

  const welcomeScreen = () => {
    return <View>

    <View style={{height: responsiveHeight(10)}}></View>
    <Text style={styles.text}><Image style={styles.small_logo} source={require("../../../assets/icon.png")}/> WeedStats bietet verschiedenste Möglichkeiten zum <Text style={{color: Levels[0].colors[0]}}>Erfassen</Text>, <Text style={{color: Levels[2].colors[0]}}>Auswerten</Text> und <Text style={{color: Levels[6].colors[0]}}>Teilen</Text> deines Gras-Konsums. {"\n"}Diese kurze Tour wird dir die wesentlichen Funktionen der App beibringen.</Text>
    <View style={{height: responsiveHeight(10)}}></View>
    <Text style={styles.swipe_up_text}>{language.tutorial_are_you_ready}</Text>
    
    </View>
  }
      
  const counterScreen = () => {
    return <>
      <Text style={styles.title2}>{language.tutorial_counter_title}</Text>
      <Text style={styles.text2}>{language.tutorial_counter_text}</Text>
      <View style={{height: responsiveHeight(5)}}></View>
      <Image source={require('../../data/img/tutorial/counter.png')} style={styles.screenshot} />
    </>
  }

  const statsScreen = () => {
    return <View>
      <Text style={styles.title2}>{language.tutorial_stats_title}</Text>
      <Text style={styles.text2}>{language.tutorial_stats_text}</Text>
      <View style={{height: responsiveHeight(10)}}></View>

      <Image source={require('../../data/img/tutorial/stats.png')} style={styles.screenshot} />
    </View>
  }

  const mapScreen = () => {
    return <View style={{height: "100%", width: "100%", borderRadius: 10, overflow: "hidden"}}>
      <Text style={styles.title2}>{language.tutorial_map_title}</Text>
      <Text style={styles.text2}>{language.tutorial_map_text}</Text>
      <View style={{height: responsiveHeight(10)}}></View>
      <Image source={require('../../data/img/tutorial/map.png')} style={styles.screenshot} />
    </View>
  }

  const configScreen = () => {
    return <View>
      <Text style={styles.title2}>{language.tutorial_config_title}</Text>
      <Text style={styles.text2}>{language.tutorial_config_text}</Text>
      <View style={{height: responsiveHeight(10)}}></View>
      <Image source={require('../../data/img/tutorial/config.png')} style={styles.screenshot} />
    </View>
  }

  const friendsScreen = () => {
    return <View>
      <Text style={styles.title2}>{language.tutorial_friends_title}</Text>
      <Text style={styles.text2}>{language.tutorial_friends_text}</Text>
      <View style={{height: responsiveHeight(10)}}></View>
      <Image source={require('../../data/img/tutorial/friends.png')} style={styles.screenshot} />
    </View>
  }

  const tippScreen = () => {
    return <View style={{width: "100%", alignSelf: "center"}}>
      <Text style={styles.text}><Text style={{color: "#0781E1"}}>{language.tutorial_tipp_title}</Text>{"\n"}{"\n"}{language.tutorial_tipp_text}</Text>
    </View>
  }

  const warningScreen = () => {
    return <View style={{width: "100%", alignSelf: "center"}}>

        <Text style={styles.title2}>{language.tutorial_pls_read_title}</Text>
        <Text style={styles.text2}>{language.tutorial_pls_read_text}</Text>

      </View>
  }

  const warningScreen2 = () => {
    return <View style={{width: "100%", alignSelf: "center"}}>

        <Text style={styles.text2}>{language.tutorial_pls_read_text2}</Text>

        <View style={{height: responsiveHeight(5)}}></View>
        <Button title={language.tutorial_show_policy} color={"#1E2132"} hovercolor={"rgba(255,255,255,0.25)"} fontColor={"white"} onPress={() => Linking.openURL('https://weedstats.de')}/>

        <TouchableNativeFeedback background={TouchableNativeFeedback.Ripple("rgba(255,255,255,0.25)", false)} onPress={() => {setConsented(!consented)}}>
          <View style={styles.touchable}>
            {consented ? 
            <MaterialIcons name={"check-box"} style={styles.check_icon}/>
            : 
            <MaterialIcons name={"check-box-outline-blank"} style={styles.check_icon}/>
            }
            <View style={{width: responsiveWidth(5)}}></View>
            <Text style={styles.policy_text}>{language.tutorial_consent}</Text>
          </View>
        </TouchableNativeFeedback>

        <View style={{height: responsiveHeight(10)}}></View>

        {consented ?
        <Button title={language.tutorial_get_started} fontColor={"#1E2132"} color={"white"} color2={"#1E2132"} hovercolor={"rgba(0,0,0,0.25)"} onPress={() => { onDone()}}/>
        :
        <Button title={language.tutorial_get_started} fontColor={"#1E2132"} color={"rgba(160,160,160,1)"} color2={"#1E2132"} hovercolor={"rgba(160,160,160,1)"} onPress={() => Alert.alert(language.tutorial_consent_alert)}/>
        }
      </View>
  }


  const readyScreen = () => {
    return <View style={{width: "100%", alignSelf: "center"}}>

        <Button title={"Ok"} fontColor={"white"} color={"#0781E1"} color2={"#484F78"} hovercolor={"rgba(0,0,0,0.25)"} onPress={() => {onDone()}}/>
        
      </View>
  }

    //Wenn App fertig, dann Videos für Tutorial aufnehmen -> Expo Video
    const slides = [
      {
        key: '-one',
        testComponent: titleScreen(), 
        backgroundColor: "#131520"
      },
      {
        key: 'zero',
        testComponent: welcomeScreen(),
        backgroundColor: "#131520"
      },
      {
        key: 'one',
        testComponent: counterScreen(),
        backgroundColor: "#1E2132"
      },
      {
        key: 'two',
        testComponent: statsScreen(),
        backgroundColor: "#131520"
      },
      {
        key: 'three',
        testComponent: mapScreen(),
        backgroundColor: "#1E2132"
      },
      {
        key: 'four',
        testComponent: configScreen(),
        backgroundColor: "#131520"
      },
      {
        key: 'five',
        testComponent: friendsScreen(),
        backgroundColor: "#1E2132"
      },
      {
        key: 'six',
        testComponent: tippScreen(),
        backgroundColor: "#131520"
      },
    ];

    const adjustSlides = () => {
      if (type != "first"){
        slides.push({
          key: 'nine',
          testComponent: readyScreen(),
          backgroundColor: "#FC2044"
        })
      } 
      else if (type == "first") {
        slides.push({
          key: 'seven',
          testComponent: warningScreen(),
          backgroundColor: "#FC2044"
        },
        {
          key: 'eight',
          testComponent: warningScreen2(),
          backgroundColor: "#FC2044"
        },)
      }
    }

    adjustSlides()

    //Neue Version: Langes Schrollpanel mit Statusbar (04. September 2022)
    return (
      <Animated.View style={[styles.container,{opacity: slide}]}>

        {type != "first" [<View style={{position: "absolute", zIndex: 10000}}>
            <View style={{ height: responsiveHeight(1) }}></View>

            <View style={{flexDirection: "row", alignContent: "center", alignItems: "center"}}>
              <View style={{marginLeft: 20}}>
                  <BackButton onPress={() => hide()}/>
              </View>
              <Text style={styles.heading}>Tutorial</Text>
            </View>

            <View style={{ height: responsiveHeight(1) }}></View>
          </View>]}

       <ScrollView>

          {slides.map((slide) => {
            return RenderItem(slide);
          })}

        </ScrollView>
 
      </Animated.View> 
  );
}

export default Tutorial

const styles = StyleSheet.create({
    container: {
        backgroundColor: "#131520",
        height: Dimensions.get("screen").height,
        width: "100%",
        position: "absolute",
        zIndex:1000
    },
    logo_heading: {
      fontFamily: "PoppinsBlack",
      fontSize: 30,
      color: "white",
      textAlign: "center"
    },
    map: {
      width: "100%",
      backgroundColor: "#171717",
      height: responsiveHeight(50),
      position: "absolute",
      bottom: 0
    },
    heading: {
      fontFamily: "PoppinsBlack",
      color: "white",
      fontSize: responsiveFontSize(2.3),
      marginLeft: 30
    },
    icon: {
      color: "white",
      fontSize: responsiveFontSize(4),
      textAlignVertical: "center",
      marginRight: 5,
      marginTop: -5
    },
    testComponentContainer: {
      width: "100%", 
      height: Dimensions.get("screen").height - responsiveHeight(20),
    },
    swipe_up_text: {
      color: "#0781E1",
      fontSize: responsiveFontSize(2),
      fontFamily: "PoppinsLight",
      letterSpacing: 5,
      alignSelf: "center"
    },
    fingerprint: {
      color: "#0781E1",
      fontSize: responsiveFontSize(7.5)
    },
    title: {
      color: "#0781E1",
      textAlign: "left",
      fontFamily: "PoppinsBlack",
      fontSize: responsiveFontSize(5),
      marginHorizontal: responsiveWidth(10)
    },
    text: {
      color: "white",
      textAlign: "left",
      fontFamily: "PoppinsBlack",
      fontSize: responsiveFontSize(3.5),
      marginHorizontal: responsiveWidth(15)
    },
    small_logo: {
      width: responsiveWidth(8),
      height: responsiveWidth(8)
    },
    title2: {
      color: "white",
      textAlign: "left",
      fontFamily: "PoppinsBlack",
      fontSize: responsiveFontSize(3.5),
      marginHorizontal: responsiveWidth(10)
    },
    text2: {
      color: "white",
      textAlign: "left",
      fontFamily: "PoppinsMedium",
      fontSize: responsiveFontSize(2),
      marginHorizontal: responsiveWidth(10)
    },
    touchable: {
      width: "100%",
      alignSelf: "center",
      flexDirection: "row",
      alignItems: "center",
      paddingHorizontal: 30,
      paddingVertical: 20,
      justifyContent: "center"
    },
    policy_text: {
      color: "white",
      fontFamily: "PoppinsBlack",
      fontSize: responsiveFontSize(2),
    },
    check_icon: {
      color: "white",
      fontSize: responsiveFontSize(3)
    },
    screenshot: {
      height: responsiveHeight(50),
      resizeMode: "contain",
      alignSelf: "center"

    }
});