//React
import React, { useState, useContext} from "react";
import { Animated, View, StyleSheet, ScrollView, RefreshControl } from "react-native";

//Custom Components
import Empty from "../../../common/Empty";
import FriendListItem from "./FriendListItem/FriendListItem";
import CustomLoader from "../../../common/CustomLoader";
import FriendPage from "./FriendListItem/FriendPage/FriendPage";

//Third Party
import uuid from 'react-native-uuid'

//Service
import { UserContext } from "../../../../data/UserContext";
import { responsiveHeight } from "react-native-responsive-dimensions";
import { LanguageContext } from "../../../../data/LanguageContext";


const FriendList = ({ friendList, toggleNavbar, getFriendList, refreshUser }) => {

    //Context
    const user = useContext(UserContext);
    const language = useContext(LanguageContext);

    //State
    const [loading, setLoading] = useState(false);
    const [showFriend, setShowFriend] = useState(false);
    const [activeFriend, setActiveFriend] = useState(user);
    const [refreshing, setRefreshing] = useState(false);

    return (
        <>
        {friendList.length != 0 ?
            <FriendPage
                show={showFriend}
                user={activeFriend}
                onExit={() => {setShowFriend(false);}}
                onRemoveFriend={() => {setActiveFriend(null); setShowFriend(false);}}
                refreshUser={refreshUser}
                toggleNavbar={toggleNavbar}
            /> 
        : null}

        <Animated.View style={[styles.container]}>
            {!loading ?  
                <>
                    <ScrollView
                        refreshControl={
                            <RefreshControl refreshing={refreshing} onRefresh={() => getFriendList()} colors={["#484F78"]} progressBackgroundColor={"#131520"}/>
                        }>
                        {friendList.length != 0 ?
                        <>
                        {friendList.map((friend) => {
                            return <FriendListItem toggleNavbar={toggleNavbar} key={uuid.v4()} friend={friend} onPress={() => {setActiveFriend(friend); setShowFriend(true)}}/>
                        })}

                        </> : <View style={{justifyContent: "center", flex: 1}}>
                                <View style={{height: responsiveHeight(5)}}></View>
                                <Empty title={language.empty_no_friends_yet}/>
                            </View>}

                        <View style={{height: responsiveHeight(5)}}></View>
                    </ScrollView>
                </> 
                : 
                <View style={{height: "90%", justifyContent: "center"}}>
                    <CustomLoader x={50} color={"#0080FF"}/>
                </View>}
        </Animated.View></>
    );
}

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