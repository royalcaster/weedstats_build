//React
import React, { useRef, useEffect, useContext } from 'react';
import { StyleSheet, Image, View, Text, Animated, Easing, Dimensions } from 'react-native';
import { useBackHandler } from '@react-native-community/hooks'

//Custom Components
import BackButton from '../../../common/BackButton';
import Button from '../../../common/Button';

//Third Party
import { responsiveFontSize, responsiveHeight } from 'react-native-responsive-dimensions';
import { LanguageContext } from '../../../../data/LanguageContext';
import uuid from 'react-native-uuid'

const Donation = ( { onexit } ) => {

    const screen_width = Dimensions.get("screen").width;
    const fadeAnim = useRef(new Animated.Value(screen_width)).current;
    const opacityAnim = useRef(new Animated.Value(0)).current;

    const language = useContext(LanguageContext)

    useEffect(() => {
        Animated.timing(fadeAnim, {
          toValue: 0,
          duration: 400,
          easing: Easing.bezier(0,.79,0,.99),
          useNativeDriver: true,
        }).start();
        Animated.timing(opacityAnim, {
            toValue: 1,
            duration: 200,
            easing: Easing.bezier(0,.79,0,.99),
            useNativeDriver: true,
          }).start();
      }, [fadeAnim, opacityAnim]);

    useBackHandler(() => {
        hide();
        return true
    })
    
    const hide = () => {
        Animated.timing(fadeAnim, {
            toValue: screen_width,
            duration: 300,
            useNativeDriver: true,
        }).start(({finished}) => {
            if (finished) {
                onexit();
            }
        });
    }

    return (
        <Animated.View style={[{transform: [{translateX: fadeAnim}], opacity: opacityAnim, height: "100%"},styles.container]}>

            <View style={{ height: responsiveHeight(5) }}></View>

            <View style={{flexDirection: "row", maxHeight: 60, alignItems: "center"}}>
                <View style={{marginLeft: 20, justifyContent: "center"}}>
                    <BackButton onPress={() => hide()}/>
                </View>
                <View >
                    <Text style={styles.heading}>{language.account_support_weedstats}</Text>
                </View>
            </View>

            <View style={{width: "80%", alignSelf: "center"}}>

                <View style={{ height: responsiveHeight(4)}}></View>

                <Text style={[styles.bold]}>{language.account_support_catch}</Text>

                <Text style={[styles.text]}>{language.account_support_text}{"\n"}</Text>
            
                {language.account_support_features.map((feature) => {
                    return <Text style={styles.feature} key={uuid.v4()}>{feature}</Text>
                })}

                <View style={{ height: responsiveHeight(4)}}></View>

    
                {/* <Text style={[styles.bold, {fontSize: responsiveFontSize(5)}]}>{language.language_short == "de" ? "4,20 €" : "€4.20"}<Text style={[styles.text,{fontSize: responsiveFontSize(1.5)}]}>   ({language.account_support_one_time_fee})</Text></Text> */}
            </View>

            {/* <Button title={language.account_support_go_premium} color={"#F2338C"} fontColor={"white"} hovercolor={"rgba(255,255,255,0.5)"}/> */}

        </Animated.View>
    )
}

export default Donation

const styles = StyleSheet.create({
    container: {
        width: "100%",
        backgroundColor: "#131520",
        flexDirection: "column",
        flex: 1,
        position: "absolute",
        zIndex: 5,
        borderTopRightRadius: 25,
        borderTopLeftRadius: 25
    },
    text: {
        fontFamily: "PoppinsLight",
        fontSize: responsiveFontSize(2),
        color: "white",
    },
    feature: {
        fontFamily: "PoppinsLight",
        fontSize: responsiveFontSize(2),
        color: "white",
        backgroundColor: "#1E2132",
        borderRadius: 10,
        margin: 5,
        padding: 15,
    },
    bold: {
        fontFamily: "PoppinsBlack",
        fontSize: responsiveFontSize(3),
        color: "#F2338C",
    },
    image: {
        height: 150,
        width: 200,
        alignSelf: "center"
    },
    close: {
        color: "#696969",
        fontSize:40,
        position: "relative",
    },
    close_text: {
        marginLeft: 20,
        borderRadius: 15,
        position: "absolute",
        bottom: 20
    },
    cancelButton: { 
        width: "80%",
        alignSelf: "center",
        height: 50,
        borderRadius: 100,
        justifyContent: "center",
        flexDirection: "row",
        position: "absolute",
        bottom: 20
    },
    cancel_icon: {
        fontSize: 25,
        color: "white",
        textAlignVertical: "center",
    },
    pressable_back: {
        width: 80, 
        padding: 10, 
        borderRadius: 25, 
        marginLeft: 10
    },
    icon_back: {
        color: "white", 
        fontSize: 30, 
        left: 5
    },
    heading: {
        color: "white",
        fontSize: 20,
        fontFamily: "PoppinsMedium",
        marginLeft: 20,
        marginTop:5
      },
});