//React
import React, { useEffect, useState } from "react";
import { View, StyleSheet, Animated, Pressable, Text } from 'react-native'
import { responsiveFontSize } from "react-native-responsive-dimensions";

//Custom Components
import ProfileImage from "./ProfileImage";
import TypeImage from "./TypeImage";

const CustomMarker = ({ photoUrl, type, region, coordinate, timestamp, withOutDate }) => {

    const [showDate, setShowDate] = useState(false);

    useEffect(() => {
        if (!withOutDate) {
            if ((coordinate.latitude - region.latitude > 0.05) || (coordinate.longitude - region.longitude > 0.1)) {
                setShowDate(false);
            }
            else {
                setShowDate(true);
            }
        }
        
    },[region]);

    return (
        <View>
            <Animated.View style={[styles.container]}>
                    
                     
                    <View style={{opacity: showDate ? 1 : 0, display: "flex",flexDirection: "row", alignSelf: "center", backgroundColor: "#131520", padding: 5, marginBottom: -10, paddingBottom: 10, borderRadius: 10, paddingRight: 10, paddingLeft: 10}}>
                        <TypeImage type={type} x={20} backgroundColor={"rgba(0,0,0,0)"}/>
                        <View style={{width: 5}}></View>
                        <Text style={{color: "white", fontSize: responsiveFontSize(1.25)}}> {new Date(timestamp).toUTCString().substring(5,16)}{"\n"}{new Date(timestamp).toUTCString().substring(16,22)}</Text>
                    </View>

                    <Animated.View style={[styles.image,{alignSelf: "center"}]}>
                        <ProfileImage x={50} url={photoUrl} type={1}/>
                    </Animated.View>
                    <View style={styles.dot}></View>
            </Animated.View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        height: 100
    },
    image: {
        width: 57,
        height: 57,
        backgroundColor: "#1E2132",
        alignItems: "center",
        borderRadius: 100,
        paddingTop: 3.5,
    },
    dot: {
        width: 10,
        height: 10,
        backgroundColor: "#0080FF",
        borderRadius: 50,
        marginTop: -5,
        alignSelf: "center"
    },
    touchable: {
        width: 60,
        height: 60,
        backgroundColor: "rgba(0,0,0,0.0)",
        borderRadius: 25,
        zIndex: 20
    }
});

export default CustomMarker