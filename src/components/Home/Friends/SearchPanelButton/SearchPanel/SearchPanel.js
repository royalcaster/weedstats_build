//React
import React, {useContext, useEffect, useRef, useState} from "react";
import { Animated, View, StyleSheet, TextInput, Dimensions, Easing, Text, ScrollView, ActivityIndicator, TouchableNativeFeedback, Modal } from "react-native";
import { useBackHandler } from '@react-native-community/hooks'

//Custom Components
import BackButton from '../../../../common/BackButton'
import FriendListItem from "../../FriendList/FriendListItem/FriendListItem";
import Button from "../../../../common/Button";
import Empty from "../../../../common/Empty";

//Firebase
import { doc, getDoc, updateDoc, getDocs, collection, query, where } from "@firebase/firestore";
import { firestore } from "../../../../../data/FirebaseConfig";
import Antdesign from 'react-native-vector-icons/AntDesign'

//Third Party
import uuid from 'react-native-uuid'

//Service
import { UserContext } from "../../../../../data/UserContext";
import { LanguageContext } from "../../../../../data/LanguageContext";
import { responsiveFontSize } from "react-native-responsive-dimensions";
import { downloadUser } from "../../../../../data/Service";
import CustomModal from "../../../../common/CustomModal";

const SearchPanel = ({onExit}) => {

    const user = useContext(UserContext)
    const language = useContext(LanguageContext);

    const screen_height = Dimensions.get("screen").height;
    const [modalVisible, setModalVisible] = useState(false);
    const [activeRequested, setActiveRequested] = useState(null);
    const [alreadySent, setAlreadySent] = useState(false);
    const [results, setResults] = useState(null);
    const [loading, setLoading] = useState(false);

    const slideAnim = useRef(new Animated.Value(screen_height)).current;
    const textInputRef = useRef(null);

    useEffect(() => {
        Animated.timing(slideAnim,{
            toValue: 0,
            duration: 500,
            useNativeDriver: true,
            easing: Easing.bezier(0,1.02,.21,.97)
        }).start();
    });
    
    const hide = () => {
        Animated.timing(slideAnim,{
            toValue: screen_height,
            duration: 300,
            useNativeDriver: true,
        }).start(({finished}) => {
            if (finished) {
                onExit();
            }
        });
        textInputRef.current.blur();
    }

    useBackHandler(() => {
        hide();
        return true
    })

    const searchUsers = async (text) => {
        setLoading(true);
        var resultBuffer = [];

        var length = text.length;
        if (length != 0) {
            try {
                const docRef = collection(firestore,"users");
                const q = query(docRef, where("username_array", "array-contains", text.toUpperCase()));
                const docSnap = await getDocs(q);
    
                docSnap.forEach((doc) => {
                    if (doc.exists()) {
                        resultBuffer.push(doc.data());
                       }
                });
            }
            catch(e){
                console.log("Error", e);
            }
        }
        else {
            setResults(null);
        }

        setResults(resultBuffer);
        setLoading(false);
    }

    const makeFriendRequest = async (id) => {

        const docRef = doc(firestore, "users", id);
        const docSnap = await getDoc(docRef);

        var requested;
        if (docSnap.exists()) {
                requested = {
                id: docSnap.data().id,
                requests: docSnap.data().requests
            }
        }

        if (requested.requests != null && requested.requests.includes(user.id)) {
            console.log("Anfrage bereits gesendet!");
            setAlreadySent(true);
        }
        else {
            try{
                const docRef = doc(firestore, "users", requested.id);
                const docSnap = await getDoc(docRef);
                
                
                if (docSnap.exists()) {
                    var buffer = docSnap.data().requests;
                    updateDoc(docRef,{
                        requests: buffer.concat(user.id)
                    });
                }
            }
            catch(e){
                console.log("Error:", e)
            }
        setModalVisible(false);
        }
    }

    const friendModalContent = <View style={{flex: 1, alignItems: "center", justifyContent: "center", backgroundColor: "rgba(0,0,0,0.5)"}}>
    <View style={styles.modal_container}>
        {!alreadySent ? <><View style={{flex: 1, justifyContent: "center", paddingHorizontal: 50}}>

            {language.language_short == "de" ? 
            <Text style={styles.heading}><Text style={[{color: "#0080FF"}]}>{activeRequested ? activeRequested.username : null}</Text> {language.searchpanel_question}</Text>
            :
            <Text style={styles.heading}>{language.searchpanel_question}<Text style={[{color: "#0080FF"}]}> {activeRequested ? activeRequested.username : null}</Text> ? </Text>
            }

            
        </View>
        <View style={{flex: 1, flexDirection: "row"}}>
            <View style={{flex: 1, justifyContent: "center", alignItems: "center"}}>
                
                <Button title={language.cancel} onPress={() => setModalVisible(false)} color={"#484F78"} fontColor={"white"} hovercolor={"rgba(255,255,255,0.25)"}/>
            </View>
            <View style={{flex: 1, justifyContent: "center", alignItems: "center"}}>
                <Button title={language.send} onPress={() => makeFriendRequest(activeRequested.id)} color={"#00DB4D"} fontColor={"white"} hovercolor={"rgba(255,255,255,0.25)"}/>
            </View>
        </View></> 
        
        : <View style={{flex: 1, justifyContent: "center"}}>
            <View style={{height: 30}}></View>
            {language.short == "de" ? <Text style={[styles.heading,{textAlign: "center", maxWidth: "80%", alignSelf: "center"}]}>Du hast bereits eine Freundschaftsanfrage an <Text style={{color: "#0080FF"}}>{activeRequested ? activeRequested.username : null}</Text> gesendet.</Text> 
            : <Text style={[styles.heading,{textAlign: "center", maxWidth: "80%", alignSelf: "center"}]}>You already sent a request to <Text style={{color: "#0080FF"}}>{activeRequested ? activeRequested.username : null}</Text></Text>}
            <View style={{flex: 1, justifyContent: "center", alignItems: "center"}}> 
                <Button title={"Ok"} onPress={() => setModalVisible(false)} color={"#484F78"} fontColor={"white"} hovercolor={"rgba(255,255,255,0.25)"}/>
            </View>
        </View>}
    </View>
</View>;

    return (
        <Animated.View style={[styles.container,{transform: [{translateY: slideAnim}]}]}>
            <View style={{height: 10}}></View>
                
            <CustomModal show={modalVisible} child={friendModalContent}/>

            <View
            style={{ width: "100%", flexDirection: "row"}}
            >
                <View style={{ flex: 1, alignItems: "center" }}>
                    <BackButton onPress={() => hide()} />
                </View>
                <View style={{ flex: 5, justifyContent: "center"}}>
                    <Text style={[styles.heading,{textAlign: "left"}]}>{language.searchpanel_title}</Text>
                </View>
            </View>

            <TextInput ref={textInputRef} blurOnSubmit={true} autoFocus={true} style={styles.input} onChangeText={(text) => {searchUsers(text)}}></TextInput>
            
            <ScrollView style={{width: "100%", flex: 1, alignSelf: "center", marginTop: 20}}>

            {!results || results.length == 0 ? 
            <View style={{width: "100%", marginTop: 100}}>
                <Empty title={language.searchpanel_empty}/>
            </View> : <>
            {loading ? <ActivityIndicator color={"#0080FF"} size={"large"} style={{marginTop: 50}}/> : (
                results.map((result) => {
                    return <FriendListItem key={uuid.v4()} friend={result} onPress={() => {setActiveRequested(result);setModalVisible(true)}}/>
                })
            )}
            </>}

            </ScrollView>

            
        </Animated.View>
    );
}

export default SearchPanel

const styles = StyleSheet.create({
    container: {
        width: Dimensions.get("window").width,
        position: "absolute",
        backgroundColor: "#131520",
        height: Dimensions.get("window").height,
        top: 0,
        borderTopLeftRadius: 25,
        borderTopRightRadius: 25,
        zIndex: 1000000
    },
    input: {
        backgroundColor: "#1E2132",
        width: "90%",
        alignSelf: "center",
        height: 60,
        borderRadius: 10,
        paddingLeft: 20,
        color: "white",
        fontSize: 18,
        fontFamily: "PoppinsMedium",
    },
    modal_container: {
        backgroundColor: "#1E2132",
        width: "90%",
        height: 300,
        alignSelf: "center",
        borderRadius: 25,
        flexDirection: "column"
    },
    heading: {
        color: "white",
        fontFamily: "PoppinsMedium",
        fontSize: responsiveFontSize(2.5),
        textAlign: "center"
    },
    touchable: {
        height: "100%",
        width: "100%",
        alignItems: "center",
        justifyContent: "center"
    },
    icon: {
        fontSize: 40
    },
    info_icon: {
        color: "white",
        fontSize: 30,
        textAlign: "center",
        marginTop: 20
    }
});