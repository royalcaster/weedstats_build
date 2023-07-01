//React
import React, { useEffect, useRef, useContext } from "react";
import { Animated, Dimensions, StyleSheet, Easing, Text, TouchableNativeFeedback, View } from "react-native";

//Third Party
import { responsiveFontSize } from "react-native-responsive-dimensions";

//Service
import toGermanDate from "../../../../../data/DateConversion";
import { UserContext } from "../../../../../data/UserContext";

//Custom Components
import ProfileImage from "../../../../common/ProfileImage";
import TypeImage from "../../../../common/TypeImage";

const MarkerListItem = ({ marker, onPress }) => {

    //Context
    const user = useContext(UserContext)

    //Ref
    const slide = useRef(new Animated.Value(0)).current;

    useEffect(() => {
        show();
    },[]);

    const show = () => {
        Animated.timing(slide,{
            toValue: 1,
            duration: 500,
            useNativeDriver: true
        }).start()
    }

    return (
            <Animated.View style={[styles.container,{opacity: slide, borderColor: marker.username == user.username ? "#F2338C" : "#131520", borderWidth: marker.username == user.username ? 2 : 0}]}>
                <TouchableNativeFeedback background={TouchableNativeFeedback.Ripple("rgba(255,255,255,0.2)", false)} onPress={() => onPress()}>
                    <View style={styles.touchable}>
                        {
                            marker ?
                            <>
                                <View style={{flex: 1}}>
                                    <ProfileImage url={marker.photoUrl} x={60}/>
                                </View>

                                <View style={{flex: 3, flexDirection: "column", paddingVertical: 10}}>
                                    <View style={{flex: 1, justifyContent: "center"}}>
                                        <Text style={styles.username}>{marker.username}</Text>
                                    </View>
                                    <View style={{flex: 1, justifyContent: "center"}}>
                                        <Text style={styles.date}>{toGermanDate(new Date(marker.timestamp))}</Text>
                                    </View>
                                </View>

                                <View style={{flex: 1, justifyContent: "center", alignItems: "center"}}>
                                    <TypeImage type={marker.type} x={40}/>
                                </View>
                            </>
                            : null
                        }
                    </View>
                </TouchableNativeFeedback>
            </Animated.View>
        
    );
}

export default MarkerListItem

const styles = StyleSheet.create({
    container: {
        overflow: "hidden",
        borderRadius: 10,
        width: "90%",
        alignSelf: "center",
        marginVertical: 5
    },
    touchable: {
        backgroundColor: "#131520",
        flexDirection: "row"
    },
    username: {
        color: "white",
        fontFamily: "PoppinsMedium",
        fontSize: responsiveFontSize(2)
    },
    date: {
        color: "white",
        fontFamily: "PoppinsMedium",
        fontSize: responsiveFontSize(1.5)
    }
});