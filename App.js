//React
import React, { useState, useEffect } from "react";
import { Text, View, Modal, StyleSheet, Dimensions, Vibration, StatusBar, AppRegistry, LogBox } from 'react-native'
import AsyncStorage from "@react-native-async-storage/async-storage";

//Service
import { UserContext } from "./src/data/UserContext";
import { LanguageContext } from "./src/data/LanguageContext";
import Languages from './src/data/languages.json'
import Intro from "./src/components/common/Intro";
import { FriendListContext } from "./src/data/FriendListContext";
import { ConfigContext } from "./src/data/ConfigContext";
import { app, firestore } from './src/data/FirebaseConfig'
import { doc, getDoc, updateDoc, deleteDoc, setDoc } from "@firebase/firestore";
import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut, deleteUser } from 'firebase/auth'

//Data
import sayings from './src/data/Sayings'

//Expo
import { useFonts } from "expo-font";
import * as Location from "expo-location";
import * as NavigationBar from 'expo-navigation-bar'
import * as SplashScreen from 'expo-splash-screen'

//Custom Components
import CounterModal from './src/components/common/CounterModal'
import Splash from './src/components/Splash/Splash'
import Authenticator from "./src/components/common/Authenticator";
import CustomLoader from "./src/components/common/CustomLoader";
import Login from './src/components/Login/Login'
import Home from './src/components/Home/Home'
import { useBackHandler } from "@react-native-community/hooks";

LogBox.ignoreLogs(['AsyncStorage has been extracted from react-native core and will be removed in a future release.']);

export default function App() {

   //States für Frontend
   const [showSplash, setShowSplash] = useState(true);
   const [loading, setLoading] = useState(true);
   const [unlocked, setUnlocked] = useState(false);
   const [modalVisible, setModalVisible] = useState(false);
   const [writeComplete, setWriteComplete] = useState(false);
   const [loadingColor, setLoadingColor] = useState("#0080FF");
   const [wrongPassword, setWrongPassword] = useState(false);
   const [emailInUse, setEmailInUse] = useState(false);
   const [userNotFound, setUserNotFound] = useState(false);
 
   //States für Daten
   const [config, setConfig] = useState(null);
   const [user, setUser] = useState(null);
   const [language, setLanguage] = useState(Languages.en);
   const [borderColor, setBorderColor] = useState("#1E2132");
   const [friendList, setFriendList] = useState([]);
   const [sayingNr, setSayingNr] = useState(0);
   const [localCounters, setLocalCounters] = useState({
    joint: 0,
    bong: 0,
    vape: 0,
    pipe: 0,
    cookie: 0,
    main: 0
   });

  //Authentifizierung
  const auth = getAuth(app);

  SplashScreen.preventAutoHideAsync();
  setTimeout(SplashScreen.hideAsync, 500);

  useEffect(() => {
    StatusBar.setBackgroundColor("rgba(0,0,0,0)");
    NavigationBar.setBackgroundColorAsync("#1E2132");
    checkForUser();
    loadSettings();
    getFriendList();
  },[]);

  useEffect(() => {
    if (config != null) {
      config.language == "de" ? setLanguage(Languages.de) : setLanguage(Languages.en);
    }
  },[config]);

  useBackHandler(() => {
    modalVisible ? StatusBar.setBackgroundColor("rgba(0,0,0,0)") : null;
    return true;
  });

  //Holt Einstellungen aus dem AsyncStorage
  const loadSettings = async () => {
    setLoading(true);
    try {
      const jsonValue = await AsyncStorage.getItem("settings");

      if (jsonValue == null) {
        //Settings-Objekt erstmalig einrichten
        await AsyncStorage.setItem("settings",JSON.stringify({
          "first": true,
          "language": "en",
          "localAuthenticationRequired": false,
          "saveGPS": false,
          "shareGPS": false,
          "shareLastEntry": false,
          "shareMainCounter": false,
          "shareTypeCounters": false,
          "showBong": true,
          "showCookie": false,
          "showJoint": true,
          "showPipe": true,
          "showVape": true,
        }))
        setConfig({
          "first": true,
          "language": "en",
          "localAuthenticationRequired": false,
          "saveGPS": false,
          "shareGPS": false,
          "shareLastEntry": false,
          "shareMainCounter": false,
          "shareTypeCounters": false,
          "showBong": true,
          "showCookie": false,
          "showJoint": true,
          "showPipe": true,
          "showVape": true,
        });
      }
      setConfig(JSON.parse(jsonValue));

      /* //Local Counters
      try {
        const jsonValue = await AsyncStorage.getItem(user.id + "_counters");
        jsonValue != null ? setLocalCounters(JSON.parse(jsonValue)) : null;
      } catch (e) {
        console.log("Error in App.js: ", e);
      } */

      setLoading(false);
    } catch (e) {
      console.log("Error in Config beim Laden: ", e);
    }
    setLoading(false);
  };

  //Sucht im AsyncStorage nach dem letzten User der sich eingeloggt hat und loggt sich bei Erfolg automatisch ein
  const checkForUser = async () => {
    try {
      const accessToken = JSON.parse(await AsyncStorage.getItem("accessToken"));
      if (accessToken != null) {
        console.log(accessToken);
        handleLogin(accessToken.email, accessToken.password);
      }
    }
    catch (error) {
      console.log("Fehler beim Laden des angemeldeten Nutzers:" + error)
    }
  }

  //Lädt Freundesliste des angemeldeten Nutzers herunter
  const getFriendList = async () => {
    if (user != null) {
      const docRef = doc(firestore, "users", user.id);
      const docSnap = await getDoc(docRef);
  
      if (docSnap.exists()) {
          setFriendList(docSnap.data().friends);
      }
      setLoading(false);
    }
  }

  const refreshUser = async ( settings ) => {
    await updateDoc(doc(firestore, "users", user.id), settings);

    setUser({
      username: settings.username ? settings.username : user.username,
      id: settings.id ? settings.id : user.id,
      email: settings.email ? settings.email : user.email,
      photoUrl: settings.photoUrl ? settings.photoUrl : user.photoUrl,
      friends: settings.friends ? settings.friends : user.friends,
      requests: settings.requests ? settings.requests : user.requests,
      joint_counter: settings.joint_counter ? settings.joint_counter : user.joint_counter,
      bong_counter: settings.bong_counter ? settings.bong_counter : user.bong_counter,
      vape_counter: settings.vape_counter ? settings.vape_counter : user.vape_counter,
      pipe_counter: settings.pipe_counter ? settings.pipe_counter : user.pipe_counter,
      cookie_counter: settings.cookie_counter ? settings.cookie_counter : user.cookie_counter,
      member_since: settings.member_since ? settings.member_since : user.member_since,
      last_entry_timestamp: settings.last_entry_timestamp ? settings.last_entry_timestamp : user.last_entry_timestamp,
      last_entry_latitude: settings.last_entry_latitude ? settings.last_entry_latitude : user.last_entry_latitude,
      last_entry_longitude: settings.last_entry_longitude ? settings.last_entry_longitude : user.last_entry_longitude,
      last_entry_type: settings.last_entry_type ? settings.last_entry_type : user.last_entry_type,
      main_counter: settings.main_counter ? settings.main_counter : user.main_counter,
      username_array: settings.username ? createUsernameArray(settings.username) : user.username_array
    });
  }

  //behandelt Login-Event NEU 
  const handleLogin = (email, password) => {
    setLoading(true);
    signInWithEmailAndPassword(auth, email, password)
    .then(async (userCredential) => {
      // Signed in 
      const result = userCredential.user;
      const docSnap = await getDoc(doc(firestore, "users", result.uid));
      await AsyncStorage.setItem("accessToken", JSON.stringify({
        email: email,
        password: password
      }));
      if (docSnap.exists()) {
        setUser({
          username: docSnap.data().username,
          id: docSnap.data().id,
          email: docSnap.data().email,
          photoUrl: docSnap.data().photoUrl,
          friends: docSnap.data().friends,
          requests: docSnap.data().requests,
          joint_counter: docSnap.data().joint_counter,
          bong_counter: docSnap.data().bong_counter,
          vape_counter: docSnap.data().vape_counter,
          pipe_counter: docSnap.data().pipe_counter,
          cookie_counter: docSnap.data().cookie_counter,
          member_since: docSnap.data().member_since,
          last_entry_timestamp: docSnap.data().last_entry_timestamp,
          last_entry_latitude: docSnap.data().last_entry_latitude,
          last_entry_longitude: docSnap.data().last_entry_longitude,
          last_entry_type: docSnap.data().last_entry_type,
          main_counter: docSnap.data().main_counter,
          username_array: docSnap.data().username_array
        });
      }
      setWrongPassword(false);
      setLoading(false);
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.log("Fehler beim Anmelden per Email: " + errorCode);
      if (errorCode == "auth/wrong-password") {
        setWrongPassword(true);
        setUser(null);
        setLoading(false);
      }
      else {
        setWrongPassword(false);
      }

      if (errorCode == "auth/user-not-found") {
        setUserNotFound(true);
        setUser(null);
        setLoading(false);
      }
      else {
        setUserNotFound(false);
      }
      
    });
  }

  //Behandelt Konto-Erstellung
  const handleCreate = (username, email, password) => {
    setLoading(true);
    createUserWithEmailAndPassword(auth, email, password)
    .then(async (userCredential) => {
      const result = userCredential.user;
      await setDoc(doc(firestore, "users", result.uid), {
        username: username,
        id: result.uid,
        email: email,
        photoUrl: "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png",
        friends: [],
        requests: [],
        joint_counter: 0,
        bong_counter: 0,
        pipe_counter: 0,
        vape_counter: 0,
        cookie_counter: 0,
        member_since: new Date().toISOString().slice(0, 10),
        last_entry_timestamp: null,
        last_entry_latitude: null,
        last_entry_longitude: null,
        last_entry_type: null,
        main_counter: 0,
        username_array: createUsernameArray(username)
      });

      const docSnap = await getDoc(doc(firestore, "users", result.uid));
      if (docSnap.exists()) {
        setUser({
          username: docSnap.data().username,
          id: docSnap.data().id,
          email: docSnap.data().email,
          photoUrl: docSnap.data().photoUrl,
          friends: docSnap.data().friends,
          requests: docSnap.data().requests,
          joint_counter: docSnap.data().joint_counter,
          bong_counter: docSnap.data().bong_counter,
          vape_counter: docSnap.data().vape_counter,
          pipe_counter: docSnap.data().pipe_counter,
          cookie_counter: docSnap.data().cookie_counter,
          member_since: docSnap.data().member_since,
          last_entry_timestamp: docSnap.data().last_entry_timestamp,
          last_entry_latitude: docSnap.data().last_entry_latitude,
          last_entry_longitude: docSnap.data().last_entry_longitude,
          last_entry_type: docSnap.data().last_entry_type,
          main_counter: docSnap.data().main_counter,
          username_array: docSnap.data().username_array
        });
      }
      setLoading(false);
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.log("Fehler beim erstellen des Kontos: " + errorMessage);

      if (errorCode == "auth/email-already-in-use") {
        setEmailInUse(true);
        setLoading(false);
      }
    });
  }

  //behandlet Beendigung des Intros, Reihenfolge der Ausführungen ist wichtig, sonst endlosschleife im Intro
  const handleIntroFinish = async (introConfig) => {
    handleAuthenticatorSelect(introConfig.enableAuthentication);
    toggleLanguage(introConfig.language);
    await AsyncStorage.setItem("settings", JSON.stringify({...config, first: false}));
    loadSettings();
  }

  //lädt Schriftarten aus Assets
  const [loaded] = useFonts({
    PoppinsBlack: require("./assets/fonts/Poppins-Bold.ttf"),
    PoppinsMedium: require("./assets/fonts/Poppins-Medium.ttf"),
    PoppinsLight: require("./assets/fonts/Poppins-Light.ttf"),
  })

  //stellt Sprache um, die im Context geteilt wird
  const toggleLanguage = async ( lang ) => {
    console.log(lang, config.language);
    if (lang == "de" && config.language == "en") {
      setLanguage(Languages.de);
      await AsyncStorage.setItem("settings",JSON.stringify({...config, language: "de"}));
      setConfig({...config, language: "de"});
      console.debug(lang);
    }
    if (lang == "en" && config.language == "de") {
      setLanguage(Languages.en);
      await AsyncStorage.setItem("settings",JSON.stringify({...config, language: "en"}));
      setConfig({...config, language: "en"});
      console.debug(lang);
    } 
  }

  //behandelt Auswahl des Nutzers, ob lokale Authentifizierung benutzt werden soll
  const handleAuthenticatorSelect = async ( bool ) => {
    await AsyncStorage.setItem("settings", JSON.stringify({...config, localAuthenticationRequired: bool}));
}

//behandelt LogOut-Event
const handleLogOut = async () => {
  setLoading(true);
  AsyncStorage.removeItem("accessToken");
  signOut(auth).then(() => {
    setUser(null);
    setLoading(false);
  }).catch((error) => {
    setLoading(false);
  });
};

//erhöht den Counter für den jeweiligen Typ unter Berücksichtigung der momentanen Config
//hier ist viel auskommentiert, weil das berücksichtigen der Einstellungen eigentlich fast nur nur in der Freunde ansicht passiert. (Was wird angezeigt und was nicht)
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

  // Neuen Index für Zitat ermitteln
  setSayingNr(Math.floor(Math.random() * sayings.length));

  setModalVisible(true);

  if (config.saveGPS) {
    // Die Bestimmung der Position dauert von den Schritten in der Funktion toggleCounter() mit Abstand am längsten
    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== "granted") {
      console.log("Permission to access location was denied");
      return;
    }
    let location = await Location.getCurrentPositionAsync({
      accuracy: Location.Accuracy.Highest,
    });

    settings.latitude = location.coords.latitude;
    settings.longitude = location.coords.longitude;
  }

  await writeLocalStorage(new_entry);

  const docRef = doc(firestore, "users", user.id);
  const docSnap = await getDoc(docRef);

  await updateDoc(docRef, {
    main_counter: user.main_counter + 1,
  });

  await updateDoc(docRef, {
    [index + "_counter"]: user[index + "_counter"] + 1,
  });

  await updateDoc(docRef, {
    last_entry_latitude: new_entry.latitude,
    last_entry_longitude: new_entry.longitude,
  });

  // Das sollte in Zukunft noch ersetzt werden
  const docSnap_new = await getDoc(docRef);
  setUser({
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

  //------------------------------------------ALT-----------------------------------------
  /* try {
    const jsonValue = await AsyncStorage.getItem("settings");
    jsonValue != null ? (settings = JSON.parse(jsonValue)) : null;
  } catch (e) {
    console.log("Error beim Laden der Einstellungen (Z. 456)", e);
  } */

 /*  if (settings.shareMainCounter) {
    await updateDoc(docRef, {
      main_counter: user.main_counter + 1,
    });
  } else {
    await updateDoc(docRef, {
      main_counter: null,
    });
  } */

 /*  if (settings.shareTypeCounters && settings.shareMainCounter) {
    await updateDoc(docRef, {
      joint_counter: user.joint_counter,
      bong_counter: user.bong_counter,
      vape_counter: user.vape_counter,
      pipe_counter: user.pipe_counter,
      cookie_counter: user.cookie_counter,
      [index + "_counter"]: user[index + "_counter"] + 1,
    });
  } else {
    await updateDoc(docRef, {
      joint_counter: null,
      bong_counter: null,
      vape_counter: null,
      pipe_counter: null,
      cookie_counter: null,
    });
  } */

  /* if (settings.shareLastEntry) {
    await updateDoc(docRef, {
      last_entry_timestamp: new_entry.timestamp,
      last_entry_type: new_entry.type,
    });
  } else {
    await updateDoc(docRef, {
      last_entry_timestamp: null,
      last_entry_type: null,
    });
  } */

  /* if (settings.shareGPS) {
    await updateDoc(docRef, {
      last_entry_latitude: new_entry.latitude,
      last_entry_longitude: new_entry.longitude,
    });
  } else {
    await updateDoc(docRef, {
      last_entry_latitude: null,
      last_entry_longitude: null,
    });
  } */
};

//wandelt Nutzernamen in Array aus einzelnen Such-Schnipseln um, weil Firebase in Arrays schneller sucht als in Strings (warum auch immer)
const createUsernameArray = (name) => {
  let name_array = [];
  for (let i = 1; i <= name.length; i++) {
    name_array.push(name.slice(0, i));
  }
  return name_array;
};

//erstellt Einträge im lokalen Gerätespeicher
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

  // Updated betroffene Counters im AsyncStorage
  /* let current_counters = {};

  try {
    const jsonValue = await AsyncStorage.getItem(user.id + "_counters");
    jsonValue != null ? (current_counters = JSON.parse(jsonValue)) : null;
  } catch (e) {
    console.log("Error in App.js: ", e);
  }

  current_counters[new_entry.type] += 1;
  current_counters.main += 1;

  try {
    const jsonValue = JSON.stringify(current_counters);
    await AsyncStorage.setItem(user.id + "_counters", jsonValue);
  } catch (e) {
    console.log("Error:", e);
  } */
};

//behandelt das Löschen des Nutzeraccounts
const deleteAccount = async () => {
  setLoading(true);
  handleLogOut();

  const current_user = auth.currentUser;
  deleteUser(current_user).then(() => {
    AsyncStorage.removeItem("user_id");
  }).catch((error) => {
    // An error ocurred
    console.log("Fehler beim löschen des Kontos: " + error);
  });

  // Firestore-Doc löschen
  const docRef = doc(firestore, "users", user.id);
  await deleteDoc(docRef);
  
  // AsyncStorage-Daten löschen
  try {
    await AsyncStorage.clear();
    setConfig({
      showJoint: true,
      showBong: true,
      showVape: true,
      showPipe: true,
      showCookie: true,
      shareMainCounter: false,
      shareTypeCounters: false,
      shareLastEntry: false,
      saveGPS: false,
      shareGPS: false,
      localAuthenticationRequired: false,
      language: "en",
      first: true
    });
  } catch (e) {
    console.log("Fehler beim Löschen des AsyncStorage.", e);
  }
  setLoading(false);
};

  return (
    <>
      <View style={{backgroundColor: "#1E2132", height: "100%"}}>
      <ConfigContext.Provider value={config}>
      <LanguageContext.Provider value={language}>

      <Modal
          animationType="fade"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => {
            setModalVisible(!modalVisible);
            setWriteComplete(false);
          }}
      >
        <CounterModal loadingColor={loadingColor} onExit={() => {setModalVisible(!modalVisible); setWriteComplete(false); StatusBar.setBackgroundColor("rgba(0,0,0,0)"); NavigationBar.setBackgroundColorAsync("#1E2132")}} writeComplete={writeComplete} sayingNr={sayingNr}/>    
      </Modal>

      { showSplash ? 
        <Splash onExit={() => {setShowSplash(false);}}/>
        : 
        <>
          {loading ? <View style={{justifyContent: "center", height: "100%"}}><CustomLoader color={"#c4c4c4"} x={100} special={true}/></View>
          :
          <>
            
            {config.localAuthenticationRequired && !unlocked ? <Authenticator first={false} onSubmit={() => setUnlocked(true)} onCancel={() => setUnlocked(false)} onExit={() => null}/>
            :
            <>
              {config.first ? <Intro 
                                onExit={(introConfig) => handleIntroFinish(introConfig)}
                                onLanguageSelect={(lang) => toggleLanguage(lang)}
                                onAuthenticatorSelect={(bool) => handleAuthenticatorSelect(bool)}/>
              :
              <>
                {user ? <UserContext.Provider value={user}>
                          <FriendListContext.Provider value={friendList}>
                            <Home
                              handleLogOut={handleLogOut}
                              toggleCounter={toggleCounter}
                              toggleLanguage={toggleLanguage}
                              deleteAccount={deleteAccount}
                              getFriendList={getFriendList}
                              loadSettings={loadSettings}
                              borderColor={borderColor}
                              onSetBorderColor={color => setBorderColor(color)}
                              refreshUser={refreshUser}
                              />
                          </FriendListContext.Provider>
                        </UserContext.Provider>
                :
                <Login handleLogin={handleLogin} handleCreate={handleCreate} wrongPassword={wrongPassword} emailInUse={emailInUse} userNotFound={userNotFound}/>
                }
              </>}
            </>}
            </>}
        </>}
      </LanguageContext.Provider>
      </ConfigContext.Provider>
      </View>
    </>
  );
}
