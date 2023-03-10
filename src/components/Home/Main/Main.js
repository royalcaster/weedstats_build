//React
import React, { useState, useEffect, useRef, useContext } from "react";
import { StyleSheet, Text, View, Image, ScrollView, Animated, Easing, Dimensions } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { UserContext } from "../../../data/UserContext";
import { Vibration } from "react-native";

//Expo
import { StatusBar } from "react-native";
import * as NavigationBar from 'expo-navigation-bar'
import * as Location from 'expo-location'

//Custom Components
import CounterItem from "./CounterItem/CounterItem";
import Tutorial from '../../common/Tutorial';
import CustomLoader from "../../common/CustomLoader";
import Empty from "../../common/Empty";
import CustomModal from "../../common/CustomModal";

//Third Party
import moment from "moment";
import { responsiveFontSize, responsiveHeight } from "react-native-responsive-dimensions";

//Service
import sayings from '../../../data/Sayings.json'
import { LanguageContext } from "../../../data/LanguageContext";
import { ConfigContext } from '../../../data/ConfigContext'
import { doc, updateDoc, getDoc } from "@firebase/firestore";
import { firestore } from "../../../data/FirebaseConfig";
import CounterModal from "../../common/CounterModal";

const Main = ({ onSetUser }) => {

  //Context
  const user = useContext(UserContext);
  const language = useContext(LanguageContext);
  const config = useContext(ConfigContext);
  
  //Refs
  const headingAnim = useRef(new Animated.Value(-100)).current;
  const leftAnim = useRef(new Animated.Value(-70)).current;
  const rightAnim = useRef(new Animated.Value(70)).current;

  //States
  const [borderColor, setBorderColor] = useState("#1E2132");
  const [loading, setLoading] = useState(true);
  const [showTutorial, setShowTutorial] = useState(false);
  const [countdown, setCountDown] = useState(0);
  const [counterOrder, setCounterOrder] = useState([
    { type: "joint", counter: user.joint_counter },
    { type: "bong", counter: user.bong_counter },
    { type: "vape", counter: user.vape_counter },
    { type: "pipe", counter: user.pipe_counter },
    { type: "cookie", counter: user.cookie_counter },
  ]);
  const [showCounterModal, setShowCounterModal] = useState(false);
  const [sayingNr, setSayingNr] = useState(0);
  const [writeComplete, setWriteComplete] = useState(false);

  useEffect(() => {
    !showCounterModal ? toggleBorderColor("#1E2132") : null;
  },[showCounterModal]);

  useEffect(() => {
    Animated.timing(headingAnim, {
      toValue: 0,
      duration: 300,
      useNativeDriver: true,
      easing: Easing.bezier(0.07, 1, 0.33, 0.89),
    }).start();

    Animated.timing(leftAnim, {
      toValue: 0,
      duration: 400,
      useNativeDriver: true,
      easing: Easing.bezier(0.07, 1, 0.33, 0.89),
    }).start();

    Animated.timing(rightAnim, {
      toValue: 0,
      duration: 400,
      useNativeDriver: true,
      easing: Easing.bezier(0.07, 1, 0.33, 0.89),
    }).start();

    calcDaysTill420();
    sortCounterOrder();
  }, []);

  const sortCounterOrder = () => {

    let settings = [];
    !config.showJoint ? settings.push("joint") : null;
    !config.showBong ? settings.push("bong") : null;
    !config.showVape ? settings.push("vape") : null;
    !config.showPipe ? settings.push("pipe") : null;
    !config.showCookie ? settings.push("cookie") : null;

    let buffer = counterOrder.filter((item) => !settings.includes(item.type));
    setCounterOrder(buffer);
    setShowTutorial(config.showTutorial);
      
    counterOrder.sort((a, b) => {
      return b.counter - a.counter;
    });
    setLoading(false);
  };

  const calcDaysTill420 = () => {
    let target = "";
    let now = new Date();
    let ft_current_year = new Date(now.getFullYear(), 3, 20, 0, 0);

    if (now.getTime() < ft_current_year.getTime()) {
      let a = moment(now);
      let b = moment(ft_current_year);
      target = b.diff(a, "days");
    } else {
      let ft_next_year = new Date(
        ft_current_year.setFullYear(ft_current_year.getFullYear() + 1)
      );
      let a = moment(now);
      let b = moment(ft_next_year);
      target = b.diff(a, "days");
    }
    setCountDown(target);
  };

  const tutorialSeen = async () => {
    try {
      const jsonValue = JSON.stringify(config);
      await AsyncStorage.setItem("settings", jsonValue);
    } catch (e) {
      console.log("Error in Config beim Speichern: ", e);
    }
    setLoading(false);
    /* setSaved(true); */
  };

  const slides = [
    {
      key: 'zero',
      title: 'Willkommen',
      text: 'WeedStats bietet verschiedenste M??glichkeiten zum Erfassen, Auswerten und Teilen deines Gras-Konsums. \n\nDiese kurze Tour wird dir die wesentlichen Funktionen der App beibringen.',
      backgroundColor: '#0080FF',
    },
    {
      key: 'one',
      title: 'Counter',
      text: 'Jedes mal, wenn du etwas rauchst, solltest du den jeweiligen Counter um eins erh??hen. Halte dazu den Button f??r kurze Zeit gedr??ckt.\n\n Je nach Einstellung wird der Zeitpunkt und die aktuellen GPS-Daten gespeichert.',
      image: require('../../../data/img/screenshots/counter.png'),
      backgroundColor: '#0080FF',
    },
    {
      key: 'two',
      title: 'Stats',
      text: 'Hier findest du sowohl statistische Auswertungen und Diagramme zu deinem Konsum als auch eine Liste deiner letzten Eintr??ge.',
      image: require('../../../data/img/screenshots/stats.png'),
      backgroundColor: '#0080FF',
    },
    {
      key: 'three',
      title: 'Map',
      text: 'Die Karte kann dir entweder eine Heatmap mit den Orten zeigen, an denen du am h??ufigsten geraucht hast, oder auch die letzten Eintr??ge deiner Freunde.',
      image: require('../../../data/img/screenshots/map.png'),
      backgroundColor: '#0080FF',
    },
    {
      key: 'four',
      title: 'Einstellungen',
      text: 'Hier kannst du Einstellungen f??r deine Privatsph??re und die Anzeige treffen.',
      image: require('../../../data/img/screenshots/config.png'),
      backgroundColor: '#0080FF',
    },
    {
      key: 'five',
      title: 'Freunde',
      text: 'F??ge Freunde hinzu, um deine Statistiken mit ihnen zu teilen und das volle Potential von WeedStats auszusch??pfen!\n\nAu??erdem kannst du hier auf deinen Account zugreifen.',
      image: require('../../../data/img/screenshots/friends.png'),
      backgroundColor: '#0080FF',
    },
    {
      key: 'six',
      title: 'Unser Tipp',
      text: 'Hier eventuell Hinweis auf Intention der App, keine Anregung zu Konsum, kein Konsum bei minderj??hrigen! \n\nJe gewissenhafter du deinen Konsum in der App eintr??gst, desto genauer werden deine Statistiken mit der Zeit.\n\nWir w??nschen dir viel Spa?? mit WeedStats!',
      backgroundColor: '#0080FF',
    }
  ];

  const renderItem = ({ item }) => {
    return (
      <View style={{flexDirection: "column", height: "100%"}}>
        <View style={{height: 50}}></View>
        <View style={{flex: 1}}>
          <Text style={{color: "white", fontFamily: "PoppinsBlack", fontSize: 25, textAlign: "center"}}>{item.title}</Text>
        </View>

        {item.image ? 
        <View style={{flex: 5}}>
          <Image source={item.image} style={{height: "100%", width: "55%", borderRadius: 25, alignSelf: "center"}}/>
        </View> : null}

        <View style={{flex: 4}}>
          <Text style={{color: "white", fontFamily: "PoppinsLight", fontSize: 15, marginLeft: 30, textAlign: "center", maxWidth: "80%", marginTop: 20}}>{item.text}</Text>
        </View>
        
      </View>
    );
  }

  const onDone = () => {
    setShowTutorial(false);
    tutorialSeen();
  }

  const toggleBorderColor = ( color ) => {
    setBorderColor(color);
    StatusBar.setBackgroundColor(color);
    NavigationBar.setBackgroundColorAsync(color);
  }

  //erh??ht den Counter f??r den jeweiligen Typ unter Ber??cksichtigung der momentanen Config
//hier ist viel auskommentiert, weil das ber??cksichtigen der Einstellungen eigentlich fast nur nur in der Freunde ansicht passiert. (Was wird angezeigt und was nicht)
const toggleCounter = async (index, color) => {
  setBorderColor(color);
  let settings = {};
  let new_entry = {
    number: user.main_counter + 1,
    type: index,
    timestamp: Date.now(),
    latitude: null,
    longitude: null,
  };

  Platform.OS === "android" ? Vibration.vibrate(50) : null;

  // Neuen Index f??r Zitat ermitteln
  setSayingNr(Math.floor(Math.random() * sayings.length));

  setShowCounterModal(true);

  if (config.saveGPS) {
    // Die Bestimmung der Position dauert von den Schritten in der Funktion toggleCounter() mit Abstand am l??ngsten
    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== "granted") {
      console.log("Permission to access location was denied");
      return;
    }
    let location = await Location.getCurrentPositionAsync({
      accuracy: Location.Accuracy.Highest,
    });

    new_entry.latitude = location.coords.latitude;
    new_entry.longitude = location.coords.longitude;
  }

  await writeLocalStorage(new_entry);

  const docRef = doc(firestore, "users", user.id);
  const docSnap = await getDoc(docRef);

  await updateDoc(docRef, {
    main_counter: user.main_counter + 1,
    [index + "_counter"]: user[index + "_counter"] + 1,
    last_entry_latitude: new_entry.latitude,
    last_entry_longitude: new_entry.longitude,
    last_entry_timestamp: new_entry.timestamp,
    last_entry_type: new_entry.type
  });

  // Das sollte in Zukunft noch ersetzt werden
  const docSnap_new = await getDoc(docRef);
  onSetUser({
    ...user,
    main_counter: docSnap_new.data().main_counter,
    joint_counter: docSnap_new.data().joint_counter, 
    bong_counter: docSnap_new.data().bong_counter,
    vape_counter: docSnap_new.data().vape_counter,
    pipe_counter: docSnap_new.data().pipe_counter,
    cookie_counter: docSnap_new.data().cookie_counter,
    last_entry_timestamp: docSnap_new.data().last_entry_timestamp,
    last_entry_type: docSnap_new.data().last_entry_type,
    last_entry_latitude: docSnap_new.data().last_entry_latitude,
    last_entry_longitude: docSnap_new.data().last_entry_longitude,
  });
  setWriteComplete(true);
};

//erstellt Eintr??ge im lokalen Ger??tespeicher
const writeLocalStorage = async (new_entry) => {
  // Erstellt neuen Eintrag im AsyncStorage
  try {
    const jsonValue = JSON.stringify(new_entry);
    await AsyncStorage.setItem(
      user.id + "_entry_" + (user.main_counter + 1),
      jsonValue
    );
  } catch (e) {
    console.log("Error:", e);
  }
};

  const CounterModalContent = <CounterModal borderColor={borderColor} sayingNr={sayingNr} loadingColor={borderColor} onExit={() => setShowCounterModal(false)} writeComplete={writeComplete}/> 

  return (
    <>

        <CustomModal show={showCounterModal} child={CounterModalContent}/>

        {showTutorial ? 
        <View style={{zIndex: 3000, position: "absolute", height: Dimensions.get("screen").height, width: "100%"}}>
          <Tutorial renderItem={renderItem} slides={slides} onDone={onDone} extraHeight={50}/>
        </View> : <> 

          {loading ? (
            <View
              style={{
                flex: 1,
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <CustomLoader x={50} color={"#484F78"}/>
            </View>
          ) : (
            <>
              {counterOrder.length == 0 ? (
                <View style={{height: "90%", justifyContent: "center"}}>
                  <Empty title={"Keine Stats aktiviert"} tip={"Konfiguriere deine Ansicht in den Einstellungen."}/>
                </View>
              ) : <ScrollView style={styles.counters_container}> 

            <View style={{ height: 50 }}></View>
            <View style={{ width: "100%", flexDirection: "row"}}>
            <Animated.View
              style={{
                paddingLeft: 15,
                flex: 1,
                transform: [{ translateX: leftAnim }]
              }}
            >
              <Text
                style={{
                  color: "#737EBF",
                  fontFamily: "PoppinsLight",
                  marginBottom: -10,
                  fontSize: 12,
                }}
              >
                {language.main_all}
              </Text>
              <Text
                style={{
                  fontFamily: "PoppinsBlack",
                  fontSize: 25,
                  color: "#737EBF",
                }}
              >
                {user.main_counter}
              </Text>
            </Animated.View>
            <View>
              <Animated.Text style={[{ transform: [{ translateY: headingAnim }], textAlign: "center"},styles.main_heading,]}>Hallo</Animated.Text>
              <Animated.Text style={{fontSize: responsiveFontSize(2), fontFamily: "PoppinsBlack", textAlign: "center", color: "white", transform: [{ translateY: headingAnim }]}}>{user.username}</Animated.Text>
            </View>
            <Animated.View
              style={{
                paddingRight: 15,
                flex: 1,
                transform: [{ translateX: rightAnim }],
              }}
            >
              <Text
                style={{
                  textAlign: "right",
                  color: "#737EBF",
                  fontFamily: "PoppinsLight",
                  marginBottom: -10,
                  fontSize: 12,
                }}
              >
                {language.main_days_till_420}
              </Text>
              <Text
                style={{
                  textAlign: "right",
                  fontFamily: "PoppinsBlack",
                  fontSize: 25,
                  color: "#737EBF",
                }}
              >
                {countdown}
              </Text>
            </Animated.View>
          </View>

                {
                counterOrder.map((item) => {
                  return (
                    <CounterItem
                      key={item.type}
                      type={item.type}
                      counter={user[item.type + "_counter"]}
                      toggleCounter={toggleCounter}
                      toggleBorderColor={toggleBorderColor}
                    />
                  );
                })}
                
                <View style={{height: responsiveHeight(15)}}></View>
              </ScrollView>}
            </>
          )}
          </>}
    </>
  );
};

export default Main;

const styles = StyleSheet.create({
  counters_container: {
    flex: 5,
    backgroundColor: "#1E2132",
    width: "100%",
    height: "100%"
  },
  tut_img: {
    height: 200,
    width: 200,
    marginBottom: -35,
  },
  blank_text: {
    color: "#787878",
    fontSize: 15,
    alignSelf: "center",
    fontFamily: "PoppinsLight",
    marginTop: 15,
  },
  main_heading: {
    color: "white",
    fontSize: responsiveFontSize(1.5),
    fontFamily: "PoppinsLight",
    position: "relative",
  },
});
