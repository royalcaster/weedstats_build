//React
import React, { useContext, useEffect, useRef, useState } from "react";
import { Animated, Dimensions, StyleSheet, Easing, View } from "react-native";
import { LanguageContext } from "../../../../../data/LanguageContext";
import uuid from 'react-native-uuid'

const LevelBar = ({ index, counter }) => {

    const slide = useRef(new Animated.Value(150)).current;

    const language = useContext(LanguageContext);
    const [color, setColor] = useState("#484F78")

    useEffect(() => {
        show();
    },[]);

    const show = () => {
        Animated.timing(slide,{
            toValue: 0,
            duration: 300,
            useNativeDriver: true,
            easing: Easing.bezier(0.2, 1, 0.21, 0.97),
        }).start()
    }

    const RenderItem = ({ level }) => {

        
        if (counter) {
            if (level.key > index) {
                setColor("#1E2132")
            }
            else{
                setColor(level.colors[0])
            }
        }
        else {
            setColor("#484F78");
        }
        

        return <>
        <View key={level} style={{color, flex: 1, margin: 1.5, marginHorizontal: 10, borderRadius:2.5}}>

        </View>
        </>
    }

    return (
        <Animated.View style={[styles.container,{transform:[{translateY: slide}]}]}>
            
            {language.levels.slice(0).reverse().map(level => {
                return <RenderItem level={level} key={uuid.v4()}/>;
            })}

        </Animated.View>
    );
}

export default LevelBar

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: "column",
        paddingVertical: 10
    }
});