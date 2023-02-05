//React
import React, {useEffect, useRef, useState, memo, useContext} from "react";
import { Animated, View, StyleSheet, ScrollView, Text } from "react-native";

//Custom Components
import Empty from "../../../common/Empty";
import FriendListItem from "./FriendListItem/FriendListItem";
import CustomLoader from "../../../common/CustomLoader";
import Button from "../../../common/Button";

//Third Party
import uuid from 'react-native-uuid'

//Service
import { UserContext } from "../../../../data/UserContext";
import { FriendListContext } from "../../../../data/FriendListContext";
import { responsiveHeight } from "react-native-responsive-dimensions";
import { LanguageContext } from "../../../../data/LanguageContext";


const FriendList = memo(({ setActiveFriend, setShowFriend, getFriendList, onSetShowSearchPanel }) => {

    const user = useContext(UserContext);
    const [loading, setLoading] = useState(true);
    const friendList = useContext(FriendListContext);

    const language = useContext(LanguageContext);

    useEffect(() => {
        getFriendList();
        setLoading(false);
    },[]);

    return (
        <Animated.View style={[styles.container]}>
            {!loading ?  
                <>
                    {friendList.length != 0 ? 
                        <ScrollView>
                            {friendList.map((friend) => {
                                return <FriendListItem key={uuid.v4()} userid={friend} onPress={() => {
                                    setActiveFriend(friend);
                                    setShowFriend(true);
                                }}/>
                            })}
                            <View style={{height: responsiveHeight(5)}}></View>
                        </ScrollView>
                        : 
                        <View style={{justifyContent: "center", flex: 1}}>
                            <Text style={styles.empty_label}>{language.empty_no_friends_yet}</Text>
                            <View style={{height: responsiveHeight(2.5)}}></View>
                            <Button title={language.groups_search_for_friends} color={"#484F78"} fontColor={"white"} onPress={() => onSetShowSearchPanel()}/>
                        </View>}
                </> 
                : 
                <View style={{height: "90%", justifyContent: "center"}}>
                    <CustomLoader x={50} color={"#0080FF"}/>
                </View>}
        </Animated.View>
    );
})

export default FriendList

const styles = StyleSheet.create({
    container: {
        width: "100%",
        height: "80%",
    },
    empty_label: {
        color: "white",
        fontFamily: "PoppinsMedium",
        textAlign: "center"
    }
});