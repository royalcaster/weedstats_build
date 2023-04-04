//Firebase
import { setDoc, doc, getDoc } from "@firebase/firestore";
import { firestore } from "./FirebaseConfig";
import AsyncStorage from "@react-native-async-storage/async-storage"

//Tools
import toGermanDate from "./DateConversion";
import { summary, streakRanges, trackRecord } from "date-streaks";

// Lädt das Nutzer-Objekt aus dem AsyncStorage
const getLocalUser = async () => {
  try {
    const jsonValue = await AsyncStorage.getItem("current_user");
    return jsonValue != null ? JSON.parse(jsonValue) : null;
  } catch (e) {
    console.log("Error:", e);
  }
};

const user = getLocalUser();

//gibt Ausssage über Existent des Nutzerobjekts zurück -> nicht über Existenz des Eintrags in der DB!
export const userExists = () => {
 if (user != null) {
  return true;
 }
 else {
  return false;
 }
}

//gibt fertiges Nutzerobjekt zurück
export const getUserObject = async () => {
  await refreshUser();
  return user;
}

//wandelt Nutzernamen in Array aus einzelnen Such-Schnipseln um, weil Firebase in Arrays schneller sucht als in Strings (warum auch immer)
export const createUsernameArray = (name) => {
  let name_array = [];
  for (let i = 1; i <= name.length; i++) {
    name_array.push(name.slice(0, i));
  }
  return name_array;
};

// Holt alle Einträge aus dem lokalen Speicher
export const getRelevantKeys = async (user) => {
  let keys = [];
  try {
    keys = await AsyncStorage.getAllKeys();
  } catch (e) {
    console.log("Fehler beim Laden der Einträge-Keys aus dem lokalen Speicher:", e);
  }

  return keys.filter((key) => key.includes(user.id + "_entry_"));
};

// Holt alle Einträge-Daten aus dem lokalen Speicher
export const getLocalData = async (user, callback) => {
  let buffer = [];
  try {
    const jsonData = await AsyncStorage.multiGet(await getRelevantKeys(user));
    jsonData.forEach((entry) => buffer.push(JSON.parse(entry[1])));
    buffer.sort((a, b) => {
      return a.number - b.number;
    });
    callback();
    return buffer;
  } catch (e) {
    console.log("Fehler beim Laden der Einträge Daten aus dem Lokalen Speicher:", e);
  }
};

//nimmt eine Nutzer ID und gibt das Nutzer objekt zurück

export const downloadUser = async ( id, config ) =>
{
  console.log(id);
  const docSnap = await getDoc(doc(firestore, "users", id));

  if (docSnap.exists()) {

    if (config) {
      return docSnap.data().config;
    }
    else {
      return {
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
        username_array: docSnap.data().username_array,
        expo_push_token: docSnap.data().expo_push_token,
        config: docSnap.data().config
      }
    }
  }
  else {
    console.log("Check Method downlaodUser() in Service.js");
  }
}

// -------------------
export const calcDailyAverage = (array, localData) => {
  //Wenn man einen neuen Account erstellt ist diese Differenz der Tage 0 und durch 0 teilen = "Infinity", deswegen einfach Anzahl der Einträge zurückgeben
  if (localData[localData.length - 1].timestamp - localData[0].timestamp == 0) {
    return localData.length;
  }
  else {
    return (
      array.length /
      ((localData[localData.length - 1].timestamp - localData[0].timestamp) /
        (60 * 60 * 24 * 1000))
      );
  }
  
};

// -------------------
export const filterByType = (array, type) => {
  if (type === "main") {
    return array;
  }
  return array.filter((entry) => {
    return entry.type === type;
  });
};

// -------------------
export const filterByMostRecent = (array, days) => {
  if (days === 0) {
    return array;
  }

  const now = Date.now();

  return array.filter((entry) => {
    return now - entry.timestamp <= days * 1000 * 60 * 60 * 24;
  });
};

// -------------------
export const getEntryDates = (array) => {
  let dates = array.map((entry) => {
    let date = new Date(entry.timestamp);
    date.setUTCHours(0, 0, 0, 0);
    return +date;
  });

  dates = dates.filter(function (value, index, array) {
    return array.indexOf(value) === index;
  });

  return dates;
};

// -------------------
export const getBreakDates = ({ rec }) => {
  // Konvertiert Object in verschachteltes Array
  let dates = Object.entries(rec);

  // Filtert nach den Daten, an denen nicht gesmoked wurde
  dates = dates.filter((entry) => entry[1] === false);

  // Wirft das überflüssige zweite property weg -> eindim. Array
  dates = dates.map((entry) => Date.parse(entry[0]));

  return dates;
};

// -------------------
export const createLineChartData = (array, datapoints) => {
  if (array.length == 0) {
    return [
      ["keine Angaben", "keine Angaben"],
      [0, 0],
    ];
  }

  const first = array[0].timestamp;
  const step = (Date.now() - first) / datapoints;
  //Wenn der Zeitbereich zwischen jetzt und erstem Eintrag im selben Tag liegt (86 Mio ms), dann zeige nur Uhrzeit und kein Datum
  const singleDay = (Date.now() - first) < 86400000;
  let chartData = new Array(datapoints).fill(0);
  let chartLabels = new Array(datapoints);


  array.forEach((entry) => {
    for (let i = 0; i < datapoints; i++) {
      if (
        first + i * step <= entry.timestamp &&
        entry.timestamp < first + (i + 1) * step
      ) {
        chartData[i]++;
        break;
      }
    }
  });

  for (let i = 0; i < datapoints; i++) {
    chartLabels[i] = toGermanDate(new Date(first + (i + 0.5) * step), singleDay);
  }

  return [chartLabels, chartData];
};

// -------------------
export const createBarChartData = (array) => {
  let chartData = new Array(7).fill(0);
  let i;

  array.forEach((entry) => {
    i = new Date(entry.timestamp).getDay();
    i == 0 ? (i = 6) : (i = i - 1);
    chartData[i]++;
  });

  return chartData;
};

// -------------------
export const calcStreak = (array) => {
  const dates = getEntryDates(array);
  const length = Math.ceil((Date.now() - dates[0]) / (1000 * 60 * 60 * 24));
  const rec = trackRecord({ dates, length });
  const sum1 = summary(dates);
  const ranges1 = streakRanges(dates);
  const breakDates = getBreakDates({ rec });
  const sum2 = summary(breakDates);
  const ranges2 = streakRanges(breakDates);

  return {
    currentStreak: sum1.currentStreak,
    longestStreak: sum1.longestStreak,
    today: sum1.todayInStreak,
    within: sum1.withinCurrentStreak,
    startCurrent: toGermanDate(ranges1[0].start),
    rangeLongest: ranges1.find(
      ({ duration }) => duration === sum1.longestStreak
    ),
    currentBreak: sum2.currentStreak,
    longestBreak: sum2.longestStreak,
    startCurrentBreak: ranges2[0] ? toGermanDate(ranges2[0].start) : null,
    rangeLongestBreak: ranges2[0]
      ? ranges2.find(({ duration }) => duration === sum2.longestStreak)
      : null,
  };
};

//nimmt in (1-7) und gibt Wochentag zurück
export const getDayName = (x) => {
const days = ["Montag", "Dienstag", "Mittwoch", "Donnerstag", "Freitag", "Samstag", "Sonntag"]
if (x > 0 && x < 8) {
  return days[x-1];
}
else {
  return null;
}
}

export const getLastMessage = (timestamp) => {
  const last_entry = new Date(timestamp * 1000);
  return last_entry.toISOString()
}

export const getCounterNotificationTitle = (type, name, language) => {
  var smokes = language == "de" ? "raucht" : "is smoking";
  if (type == "cookie") {
    smokes = language == "de" ? "genießt" : "is enjoying";
  }

  var typename
  switch(type){
    case "joint": typename = language == "de" ? "einen Joint" : "a joint";
    break;
    case "bong": typename = language == "de" ? "eine Bong" : "a bong";
    break;
    case "vape": typename = language == "de" ? "eine Vape" : "a vape";
    break;
    case "pipe": typename = language == "de" ? "eine Pfeife" : "a pipe";
    break;
    case "cookie": typename = language == "de" ? "ein Edible" : "an edible";
    break;
  };

  return name + " " + smokes + " " + typename;
}