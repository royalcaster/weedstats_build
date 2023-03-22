//React
import React from "react";
import { Animated, StyleSheet, Text, TouchableHighlight } from "react-native";
import { responsiveFontSize } from "react-native-responsive-dimensions";

//Custom Components
import TypeImage from "./TypeImage";

//Service
import { uuidv4 } from "@firebase/util";


const SelectorBar = ({ options, onPress, selectedType }) => {

    const getTypeString = (x) => {
        switch(x){
            case 0: return "main"
            case 1: return "joint";
            case 2: return "bong";
            case 3: return "vape"; 
            case 4: return "pipe";
            case 5: return "cookie";
            case 6: return 0;
            case 7: return 7;
            case 8: return 30;
            case 9: return 365;
        }
    }

    return (
            <Animated.View style={styles.container}>
                {options.map((option) => {
                    return (
                        <TouchableHighlight key={uuidv4()} onPress={() => onPress(option.value)} activeOpacity={0.75} underlayColor={"rgba(0,0,0,0)"}>
                            <Animated.View style={[styles.item_container,{backgroundColor: selectedType == getTypeString(option.value) ? "#0080FF" : "rgba(0,0,0,0)"}]}>
                                {option.value > 0 && option.value < 6 ? <TypeImage type={getTypeString(option.value)} x={20}/> : <Text style={styles.item_label}>{option.label}</Text>}
                            </Animated.View>
                        </TouchableHighlight>
                    )
                })}
            </Animated.View>
    );
}

export default SelectorBar

const styles = StyleSheet.create({
    container: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-around",
        backgroundColor: "#131520",
        borderRadius: 100
    },
    item_container: {
        backgroundColor: "#131520",
        padding: 5,
        paddingHorizontal: 25,
        paddingVertical: 10,
        borderRadius: 100,
        justifyContent: "center"
    },
    item_label: {
        color: "white",
        fontFamily: "PoppinsMedium",
        fontSize: responsiveFontSize(1.5),
        textAlignVertical: "center"
    }
});