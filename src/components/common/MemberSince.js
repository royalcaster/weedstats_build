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
            final_string += years + " Jahren"
        }
        else {
            final_string += years + " Years"
        }
    }

    if (months > 0) {
        if (language.language_short == "de") {
            final_string += months + " Monaten"
        }
        else {
            final_string += months + " months"
        }
    }

    if (days > 0) {
        if (language.language_short == "de") {
            final_string += days + " Tagen"
        }
        else {
            final_string += days + " day"
        }
    }

    return (
        <Animated.View style={[styles.container,{backgroundColor: backgroundColor}]}>
            <View style={styles.part}>
                <Text>{language.account_member_since} {final_string}</Text>
            </View>
            <View style={styles.part}>
                <Text>{date.toLocaleDateString()}</Text>
            </View>
        </Animated.View>
    );
}

export default MemberSince

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "green",
        width: "80%",
        alignSelf: "center",
        borderRadius: 15,
        display: "flex",
        flexDirection: "column"
    },
    part: {
        flex: 1,
        padding: 10
    }
});