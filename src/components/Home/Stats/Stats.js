//React
import React, { useState, useEffect, useRef, useContext } from "react";
import {StyleSheet, Animated, Easing, View} from "react-native";
import { UserContext } from "../../../data/UserContext";

//Custom Components
import StatsDashboard from "./StatsDashboard/StatsDashboard";
import CustomLoader from "../.././common/CustomLoader";

//Service
import { getLocalData } from "./../../../data/Service";
import Empty from "../../common/Empty";

const Stats = () => {

  //Context
  const user = useContext(UserContext);

  //State
  const [localData, setLocalData] = useState([]);
  const [localDataLoaded, setLocalDataLoaded] = useState(false);

  //Ref
  const fadeAnim = useRef(new Animated.Value(0)).current;

  useEffect( () => {
    async function test() {
      localDataLoaded ? null : setLocalData(await getLocalData(user, () => setLocalDataLoaded(true)));
    }
    test();
    setLocalDataLoaded(true);
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 300,
      useNativeDriver: true,
      easing: Easing.bezier(0.07, 1, 0.33, 0.89),
    }).start();
  }, []);

  // Zum Löschen einzelner Daten aus der History. Erstmal entfernt, da die Konsistenz der Daten nach aktuellem Stand darunter leidet
  const deleteEntry = async (delEntry) => {
    console.log("Die Lösch-Funktion wurde temporär deaktiviert, bis ein sicheres Verfahren gefunden wurde.");
    /* try {
      console.log(delEntry.number);
      await AsyncStorage.removeItem(user.id + "_entry_" + delEntry.number);
      setLocalData(
        localData.filter((entry) => entry.number != delEntry.number)
      );
      if (delEntry.number == user.main_counter) {
        await deleteEntryGlobally(
          delEntry.type,
          localData[user.main_counter - 1]
        );
      } else {
        await deleteEntryGlobally(delEntry.type);
      }
    } catch (e) {
      console.log("Error:", e);
    } */
  };

  return (
    <Animated.View style={[{ opacity: 1 }, styles.container]}>

      {
        !localDataLoaded ? <CustomLoader x={50} color={"#0080FF"}/> : 
        <>
          {
            localData.length == 0 ? <View style={{height: "20%"}}><CustomLoader x={50} color={"#0080FF"}/><Empty title={"Noch keine Aktivitäten"} tip={"Mache Einträge, um Statistiken zu sehen"}/></View>
            : <StatsDashboard localData={localData} />
          }
        </>
      }

    </Animated.View>
  );
};

export default Stats;

const styles = StyleSheet.create({
  container: {
    width: "100%",
    justifyContent: "center",
    height: "100%",
    backgroundColor: "#1E2132"
  }
});
