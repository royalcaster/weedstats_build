import react from 'react'
import { View, Image, StyleSheet } from 'react-native'

const TypeImage = ({ type, backgroundColor, x }) => {

    const size = x;
   
    switch(type){
        case "joint": 
        return (
        <View style={[styles.container, {backgroundColor: backgroundColor ? backgroundColor : null}]}>
            <Image style={[styles.image,{height: x, width: x/3}]} source={require('../../data/img/joint.png')}/>
        </View>
        )
        break;

        case "bong": 
        return (
        <View style={[styles.container, {backgroundColor: backgroundColor ? backgroundColor : null}]}>
            <Image style={[styles.image,{height: x, width: x/1.6}]} source={require('../../data/img/bong.png')}/>
        </View>
        )
        break;

        case "vape": 
        return (
        <View style={[styles.container, {backgroundColor: backgroundColor ? backgroundColor : null}]}>
            <Image style={[styles.image,{height: x, width: x/1.6}]} source={require('../../data/img/vape.png')}/>
        </View>
        )
        break;

        case "pipe": 
        return (
        <View style={[styles.container, {backgroundColor: backgroundColor ? backgroundColor : null}]}>
            <Image style={[styles.image,{height: x, width: x/1.6}]} source={require('../../data/img/pipe.png')}/>
        </View>
        )
        break;

        case "cookie": 
        return (
        <View style={[styles.container, {backgroundColor: backgroundColor ? backgroundColor : null}]}>
            <Image style={[styles.image,{height: x, width: x-2.5}]} source={require('../../data/img/cookie.png')}/>
        </View>
        )
        break;
        
        default: 
        return (
        <View style={[styles.container, {backgroundColor: backgroundColor ? backgroundColor : null}]}>
            <Image style={[styles.image,{height: x-10, width: x-15}]} source={require('../../data/img/logo.png')}/>
        </View>
        )
    }

}

export default TypeImage

const styles = StyleSheet.create({
    container: {

    },
    image: {

    }
});