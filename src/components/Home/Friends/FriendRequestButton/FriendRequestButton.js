//React
import React, { useContext, useState } from "react";
import { StyleSheet, TouchableNativeFeedback, View } from "react-native";

//Third Party
import Feather from 'react-native-vector-icons/Feather'
import { responsiveFontSize } from "react-native-responsive-dimensions";

//Custom Components
import FriendRequests from './FriendRequests/FriendRequests'
import { UserContext } from "../../../../data/UserContext";

const FriendRequestButton = ({ refreshUser, getFriendList }) => {

    //Context
    const user = useContext(UserContext);

    //State
    const [showRequests, setShowRequests] = useState();
    

    return (<>
        {showRequests ? <FriendRequests onExit={() => setShowRequests(false)} refresh={refreshUser} getFriendList={getFriendList}/> : null}

        <TouchableNativeFeedback
            background={TouchableNativeFeedback.Ripple(
            "rgba(255,255,255,0.1)",
            true
            )} onPress={() => setShowRequests(true)}
        >
            <View
            style={[
                styles.touchable,
                { height: 50, backgroundColor: "#1E2132", width: 50 },
            ]}
            >
            <Feather name="user-check" style={[styles.icon,{color: user.requests.length != 0 ? "#F2338C" : "white"}]} />
            </View>
        </TouchableNativeFeedback>
    </>)
}

export default FriendRequestButton

const styles = StyleSheet.create({
    touchable: {
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "row",
        backgroundColor: "green"
      },
    icon: {
        textAlignVertical: "center",
        color: "white",
        fontSize: responsiveFontSize(2.3),
        marginLeft: 10,
        marginRight: 10,
        marginBottom: 10
    },
});