//React
import React, { useEffect, useRef } from "react";
import { Animated, Dimensions, StyleSheet, Easing, View, Text } from "react-native";

const CustomModal = ({ show, child}) => {

    const slideRef = useRef(new Animated.Value(0)).current;

    const slide = () => {
        Animated.timing(slideRef,{
            toValue: 1,
            duration: 300,
            useNativeDriver: true,
            easing: Easing.bezier(0.2, 1, 0.21, 0.97),
        }).start()
    }

    const hide = () => {
        Animated.timing(slideRef,{
            toValue: 0,
            duration: 300,
            useNativeDriver: true,
            easing: Easing.bezier(0.2, 1, 0.21, 0.97),
        }).start();
    }

    show ? slide() : hide();

    return (
        <>
            {show ? 
                <Animated.View style={[styles.container,{opacity:slideRef}]}>
                    {child}
                </Animated.View>
            : null}
        </>
    );
}

export default CustomModal

const styles = StyleSheet.create({
    container: {
        height: "100%",
        width: "100%",
        position: "absolute",
        zIndex: 10
    }
});