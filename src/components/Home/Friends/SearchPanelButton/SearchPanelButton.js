//React
import React, { useState } from "react";
import { StyleSheet, TouchableNativeFeedback, View } from "react-native";

//Third Party
import Feather from 'react-native-vector-icons/Feather'
import { responsiveFontSize } from "react-native-responsive-dimensions";

//Custom Components
import SearchPanel from './SearchPanel/SearchPanel'

const SearchPanelButton = () => {

    //Context

    //State
    const [showAddFriend, setShowAddFriend] = useState(false);
    

    return (<>
        {showAddFriend ? <SearchPanel onExit={() => setShowAddFriend(false)}/> : null}

        <TouchableNativeFeedback
        background={TouchableNativeFeedback.Ripple("rgba(255,255,255,0.0)", false)}
        onPress={() => setShowAddFriend(true)}
        >
        <View style={[styles.touchable, { height: 50, backgroundColor: "#1E2132", width: 50 }]}>
            <Feather name="plus" style={styles.icon} />
        </View>
        </TouchableNativeFeedback>
    </>)
}

export default SearchPanelButton

const styles = StyleSheet.create({
    touchable: {
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "row",
        backgroundColor: "#131520"
      },
    icon: {
        textAlignVertical: "center",
        color: "white",
        fontSize: responsiveFontSize(2.3),
        marginLeft: 10,
        marginRight: 20,
        marginBottom: 10
    },
});