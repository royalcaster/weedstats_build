//React
import React, { useContext, useState } from "react";
import { Dimensions, StyleSheet, View } from "react-native";

//Third Party
import MapView, { Marker, PROVIDER_GOOGLE } from "react-native-maps";
import AntDesign from 'react-native-vector-icons/AntDesign'
import { uuidv4 } from "@firebase/util";
import Modal, { ModalContent } from "react-native-modals";

//Custom Components
import IconButton from "./IconButton";
import Button from "./Button";
import { UserContext } from "../../data/UserContext";
import CustomMarker from "./CustomMarker";

//Service
import { mapStyle } from "../../data/CustomMapStyle";

const MapModal = ({ show, onExit }) => {

    //Context
    const user = useContext(UserContext);

    //States
    const [mapType, setMapType] = useState("standard");

    //Constants
    const switch_icon = <AntDesign name={"picture"} style={{fontSize: 20, color: "white"}}/>

    const toggleMapType = () => {
        mapType == "standard" ? setMapType("hybrid") : setMapType("standard");
      }
    
    return (
            <Modal visible={show} style={{backgroundColor: "green"}}>
            <ModalContent style={{height: "80%", width: Dimensions.get("window").width - 50, padding: 0}}>
            
            

            </ModalContent>
            </Modal>
    );
}

export default MapModal

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "green"
    },
    map: {
        width: "100%",
        height: "100%",
        backgroundColor: "#171717"
      },
});