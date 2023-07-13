import react from 'react'
import { View, Image, StyleSheet } from 'react-native'

const TypeImage = ({ type, backgroundColor, x }) => {

    const size = x;
   
    switch(type){
        case "joint": 
        return (
        <View style={[styles.container, {backgroundColor: backgroundColor ? backgroundColor : null, height: x}]}>
            <Image style={[styles.image,{height: x*0.5, width: x*0.9}]} source={require('../../data/img/joint.png')}/>
        </View>
        )
        break;

        case "bong": 
        return (
        <View style={[styles.container, {backgroundColor: backgroundColor ? backgroundColor : null, height: x}]}>
            <Image style={[styles.image,{height: x*1.1, width: x*0.5}]} source={require('../../data/img/bong.png')}/>
        </View>
        )
        break;

        case "vape": 
        return (
        <View style={[styles.container, {backgroundColor: backgroundColor ? backgroundColor : null, height: x}]}>
            <Image style={[styles.image,{height: x*1.1, width: x*0.4}]} source={require('../../data/img/vape.png')}/>
        </View>
        )
        break;

        case "pipe": 
        return (
        <View style={[styles.container, {backgroundColor: backgroundColor ? backgroundColor : null, height: x}]}>
            <Image style={[styles.image,{height: x*0.5, width: x*0.9}]} source={require('../../data/img/pipe.png')}/>
        </View>
        )
        break;

        case "cookie": 
        return (
        <View style={[styles.container, {backgroundColor: backgroundColor ? backgroundColor : null, height: x}]}>
            <Image style={[styles.image,{height: x*0.8, width: x*0.9}]} source={require('../../data/img/cookie.png')}/>
        </View>
        )
        break;
        
        default: 
        return (
        <View style={[styles.container, {backgroundColor: backgroundColor ? backgroundColor : null, height: x}]}>
            <Image style={[styles.image,{height: x-10, width: x-15}]} source={require('../../data/img/logo.png')}/>
        </View>
        )
    }

}

export default TypeImage

const styles = StyleSheet.create({
    container: {
        justifyContent: "center",
        alignItems: "center",
        alignContent: "center",
        backgroundColor: "green"
    },
    image: {
        alignSelf: "center"
    }
});