//React
import React, { useContext, useEffect, useRef } from "react";
import { Animated, Dimensions, StyleSheet, Easing, Text, View } from "react-native";

//Third Party
import moment from "moment";
import { LanguageContext } from "../../data/LanguageContext";

const MemberSince = ({ backgroundColor, timestamp }) => {

    //Contexts
    const language = useContext(LanguageContext);

    var date = new Date(timestamp);

    var diff = new Date(Date.now() - date);
    var years = diff.getUTCFullYear() - 1970;
    var months = diff.getUTCMonth();
    var days = diff.getUTCDate() - 1;
    var final_string = "";

    if (years > 0) {
        if (language.language_short == "de") {
            if (years == 1) {
                final_string += years + " Jahr"
            }
            else {
                final_string += years + " Jahren"
            }
        }
        else {
            if (years == 1) {
                final_string += years + " year"
            }
            else {
                final_string += years + " years"
            }
        }
    }

    if (months > 0) {
        if (language.language_short == "de") {
            if (months == 1) {
                final_string += months + " Monat"
            }
            else {
                final_string += months + " Monaten"
            }
        }
        else {
            if (months == 1) {
                final_string += months + " month"
            }
            else {
                final_string += months + " months"
            }
        }
    }

    if (days > 0) {
        if (language.language_short == "de") {
            if (days == 1) {
                final_string += days + " Tag"
            }
            else {
                final_string += days + " Tagen"
            }
        }
        else {
            if (days == 1) {
                final_string += days + " day"
            }
            else {
                final_string += days + " days"
            }
        }
    }

    if (years == 0 && months == 0 && days == 0) {
        if (language.language_short == "de") {
            final_string = "heute";
        }
        else {
            final_string = "today";
        }
    }

    

    return (
        <Animated.View style={[styles.container,{backgroundColor: backgroundColor}]}>
            <View style={styles.part}>
                <Text style={styles.text}>{language.account_member_since} {final_string}</Text>
                <Text style={styles.date}>{date.toLocaleDateString()}</Text>
            </View>
        </Animated.View>
    );
}

export default MemberSince

const styles = StyleSheet.create({
    container: {
        width: "100%",
        alignSelf: "center",
        borderRadius: 15,
        padding: 15
    },
    part: {
        justifyContent: "center"
    },
    text: {
        color: "white",
        textAlign: "center",
        fontFamily: "PoppinsMedium"
    },
    date: {
        color: "#0080FF",
        textAlign: "center",
        fontFamily: "PoppinsMedium"
    }
});