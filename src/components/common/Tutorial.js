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

const Tutorial = ({ onDone, type}) => {

    //Context
    const language = useContext(LanguageContext);

    //State
    const [consented, setConsented] = useState(false);
    //ref
    const touchRef = useRef(new Animated.Value(0)).current

    const counterVideo = useRef(null);
    const statsVideo = useRef(null);
    const mapVideo = useRef(null);
    const configVideo = useRef(null);
    const friendsVideo = useRef(null);

    const [counterStatus, setCounterStatus] = useState({});
    const [statsStatus, setStatsStatus] = useState({});
    const [mapStatus, setMapStatus] = useState({});
    const [configStatus, setConfigStatus] = useState({});
    const [friendsStatus, setFriendsStatus] = useState({});


    const play_icon = <FontAwesome5 name="play" style={{color: "white"}}/>
    const pause_icon = <FontAwesome5 name="pause" style={{color: "white"}}/>

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
      <View style={{width: "100%", justifyContent: "center",flexDirection: "column", height: Dimensions.get("screen").height, bottom: 0, backgroundColor: item.backgroundColor, zIndex: 10, borderRadius: 25, overflow: "hidden"}}>
        <View >
        {item.testComponent ? item.testComponent : null}
        </View>
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
        <Text style={[styles.logo_heading,{position: "relative", color: "#F2338C", fontSize: responsiveFontSize(2)}]}> The tutorial is not finished yet, please ignore! </Text>
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
    return <View>
      <View style={{height: responsiveHeight(20)}}></View>
      <Text style={styles.title2}>{language.tutorial_counter_title}</Text>
      <Text style={styles.text2}>{language.tutorial_counter_text}</Text>
      <View style={{height: responsiveHeight(5)}}></View>

      <Video
        ref={counterVideo}
        style={styles.video}
        source={require('../../data/vid/counter.mp4')}
        resizeMode={ResizeMode.CONTAIN}
        isLooping
        onPlaybackStatusUpdate={status => setCounterStatus(() => status)}
        usePoster={true}
        posterSource={require('../../data/img/tutorial_loading.png')}
      />

    <View style={{height: 10}}></View>
    <View style={{justifyContent: "center", alignItems: "center"}}>
      <IconButton icon={counterStatus.isPlaying ? pause_icon : play_icon} backgroundColor={counterStatus.isPlaying ? "#131520" : "#0781E1"} onPress={() => counterStatus.isPlaying ? counterVideo.current.pauseAsync() : counterVideo.current.playAsync()}/>
    </View>
      
      <View style={{height: responsiveHeight(20)}}></View>
    </View>
  }

  const statsScreen = () => {
    return <View>
      <Text style={styles.title2}>{language.tutorial_stats_title}</Text>
      <Text style={styles.text2}>{language.tutorial_stats_text}</Text>
      <View style={{height: responsiveHeight(10)}}></View>

      <Video
        ref={statsVideo}
        style={styles.video}
        source={require('../../data/vid/stats.mp4')}
        resizeMode={ResizeMode.CONTAIN}
        isLooping
        onPlaybackStatusUpdate={status => setStatsStatus(() => status)}
        usePoster={true}
        posterSource={require('../../data/img/tutorial_loading.png')}
      />

    <View style={{height: 10}}></View>
    <View style={{justifyContent: "center", alignItems: "center"}}>
      <IconButton icon={statsStatus.isPlaying ? pause_icon : play_icon} backgroundColor={statsStatus.isPlaying ? "#131520" : "#0781E1"} onPress={() => statsStatus.isPlaying ? statsVideo.current.pauseAsync() : statsVideo.current.playAsync()}/>
    </View>

          <View style={{height: responsiveHeight(10)}}></View>
    </View>
  }

  const mapScreen = () => {
    return <View style={{height: "100%", width: "100%", borderRadius: 10, overflow: "hidden"}}>

      <View style={{height: responsiveHeight(5)}}></View>
      <View style={styles.knob}></View>
      <View style={{height: responsiveHeight(10)}}></View>
      <Text style={styles.title2}>{language.tutorial_map_title}</Text>
      <Text style={styles.text2}>{language.tutorial_map_text}</Text>
      <View style={{height: responsiveHeight(10)}}></View>

      <Video
        ref={mapVideo}
        style={styles.video}
        source={require('../../data/vid/map.mp4')}
        resizeMode={ResizeMode.CONTAIN}
        isLooping
        shouldPlay={true}
        status={status => setMapStatus(status)}
      />
      
    </View>
  }

  const configScreen = () => {
    return <View>
      
      <Text style={styles.title2}>{language.tutorial_config_title}</Text>
      <Text style={styles.text2}>{language.tutorial_config_text}</Text>

      <View style={{height: responsiveHeight(10)}}></View>

      <Video
        ref={configVideo}
        style={styles.video}
        source={require('../../data/vid/map.mp4')}
        resizeMode={ResizeMode.CONTAIN}
        isLooping
        shouldPlay={true}
        status={status => setConfigStatus(status)}
      />

    </View>
  }

  const friendsScreen = () => {
    return <View>

    <Text style={styles.title2}>{language.tutorial_friends_title}</Text>
    <Text style={styles.text2}>{language.tutorial_friends_text}</Text>
    
    <Video
        ref={friendsVideo}
        style={styles.video}
        source={require('../../data/vid/map.mp4')}
        resizeMode={ResizeMode.CONTAIN}
        isLooping
        shouldPlay={true}
        status={status => setFriendsStatus(status)}
      />

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

        <View style={{height: responsiveHeight(5)}}></View>
        <Button title={language.tutorial_show_policy} color={"#1E2132"} hovercolor={"rgba(255,255,255,0.25)"} fontColor={"white"} onPress={() => console.log("test")}/>

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

        <Button title={"Weitermachen"} fontColor={"#1E2132"} color={"white"} color2={"#1E2132"} hovercolor={"rgba(0,0,0,0.25)"} onPress={() => {onDone()}}/>
        
      </View>
  }

    //Wenn App fertig, dann Videos für Tutorial aufnehmen -> Expo Video
    const slides = [
      {
        key: '-one',
        title: 'Willkommen',
        text: 'WeedStats bietet verschiedenste Möglichkeiten zum Erfassen, Auswerten und Teilen deines Gras-Konsums. \n\nDiese kurze Tour wird dir die wesentlichen Funktionen der App beibringen.',
        testComponent: titleScreen(), 
        backgroundColor: "#131520"
      },
      {
        key: 'zero',
        title: 'Willkommen',
        text: 'WeedStats bietet verschiedenste Möglichkeiten zum Erfassen, Auswerten und Teilen deines Gras-Konsums. \n\nDiese kurze Tour wird dir die wesentlichen Funktionen der App beibringen.',
        testComponent: welcomeScreen(),
        backgroundColor: "#131520"
      },
      {
        key: 'one',
        title: 'Counter',
        text: 'Jedes mal, wenn du etwas rauchst, solltest du den jeweiligen Counter um eins erhöhen. Halte dazu den Button für kurze Zeit gedrückt.',
        image: require('../../data/img/screenshots/counter.png'),
        testComponent: counterScreen(),
        icon: <Image source={require("../../data/img/logo_w.png")} style={styles.counter_image}/>,
        backgroundColor: "#1E2132"
      },
      {
        key: 'two',
        title: 'Stats',
        text: 'Hier findest du statistische Auswertungen zu deinem Konsum und deinen Rauch-Verlauf.',
        image: require('../../data/img/screenshots/stats.png'),
        testComponent: statsScreen(),
        icon: <Entypo name="area-graph" style={styles.icon}/>,
        backgroundColor: "#131520"
      },
      {
        key: 'three',
        title: 'WeedMap',
        text: 'Die Karte kann dir entweder eine Heatmap mit den Orten zeigen, an denen du am häufigsten geraucht hast, oder auch die letzten Aktivitäten deiner Freunde.',
        image: require('../../data/img/screenshots/map.png'),
        testComponent: mapScreen(),
        icon: <FontAwesome name="map-marker" style={styles.icon}/>,
        backgroundColor: "#1E2132"
      },
      {
        key: 'four',
        title: 'Einstellungen',
        text: 'Hier kannst du Einstellungen für deine Privatsphäre und die Anzeige treffen.',
        image: require('../../data/img/screenshots/config.png'),
        testComponent: configScreen(),
        icon: <FontAwesome name="sliders" style={styles.icon}/>,
        backgroundColor: "#131520"
      },
      {
        key: 'five',
        title: 'Freunde',
        text: 'Füge Freunde hinzu, um deine Statistiken mit ihnen zu teilen und das volle Potential von WeedStats auszuschöpfen!\n\nAußerdem kannst du hier auf deinen Account zugreifen.',
        image: require('../../data/img/screenshots/friends.png'),
        testComponent: friendsScreen(),
        icon: <FontAwesome name="user" style={styles.icon}/>,
        backgroundColor: "#1E2132"
      },
      {
        key: 'six',
        title: 'Unser Tipp',
        text: 'Je gewissenhafter du deinen Konsum in der App einträgst, desto genauer werden deine Statistiken mit der Zeit. Wenn du schummelst, brauchst du die App nicht!\n\nWir wünschen dir viel Spaß mit WeedStats!',
        testComponent: tippScreen(),
        backgroundColor: "#131520"
      },
      {
        key: 'seven',
        title: 'Unser Tipp',
        text: 'Je gewissenhafter du deinen Konsum in der App einträgst, desto genauer werden deine Statistiken mit der Zeit. Wenn du schummelst, brauchst du die App nicht!\n\nWir wünschen dir viel Spaß mit WeedStats!',
        testComponent: type == "first" ? warningScreen() : readyScreen(),
        backgroundColor: type == "first" ? "#FC2044" : "#1E2132"
      }
    ];

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
    info_container: {
      margin: "10%",
      marginHorizontal: "0%",
      borderRadius: 10,
      position: "absolute",
      bottom: 50,
      alignSelf: "center",
      padding: "5%"
    },
    info_title: {
      color: "white", 
      fontFamily: "PoppinsBlack",
      fontSize: responsiveFontSize(4.5),
      textAlign: "left",
    },
    info_text: {
      color: "white",
      fontFamily: "PoppinsLight",
      fontSize: responsiveFontSize(1.75),
      textAlign: "left"
    },
    logo_heading: {
      fontFamily: "PoppinsBlack",
      fontSize: 30,
      color: "white",
      textAlign: "center"
    },
    blur_container: {
      position: "absolute",
      alignSelf: "center",
      width: "100%",
      height: "50%",
      bottom: 0
    },
    card_label: {
      color: "white",
      fontFamily: "PoppinsLight",
      fontSize: 14,
      marginTop: 5,
      textAlign: "left",
    },
    card_value: {
      color: "white",
      fontFamily: "PoppinsBlack",
      fontSize: 30,
      marginTop: -10,
      textAlign: "left",
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
    counter_image: {
      height: responsiveHeight(6.5),
      width: responsiveHeight(6.5),
      marginTop: -2
    },
    next: {
      color: "white",
      fontFamily: "PoppinsBlack",
      fontSize: responsiveFontSize(1.5),
      marginHorizontal: responsiveWidth(2)
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
      fontFamily: "PoppinsLight",
      fontSize: responsiveFontSize(2),
      marginHorizontal: responsiveWidth(10)
    },
    knob: {
      width: "40%",
      height: 15,
      borderRadius: 20,
      backgroundColor: "rgba(255,255,255,0.1)",
      alignSelf: "center"
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
    video: {
      height: Dimensions.get("screen").height * 0.6,
      width: "80%",
      alignSelf: "center"
    }
});