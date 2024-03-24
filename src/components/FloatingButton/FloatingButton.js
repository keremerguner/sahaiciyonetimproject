import React from 'react'
import { Text, TouchableOpacity } from 'react-native'
import styles from './FloatingButton.style'
// import Icon from "react-native-vector-icons/MaterialCommunityIcons"

const FloatingButton = ({ onPress, icon }) => {
    return (
        <TouchableOpacity style={styles.container} onPress={onPress}>
            <Text style={{ fontSize: 50, marginTop: -5, color:'white' }} >+</Text>
            {/* <Icon name={icon} color="white" size={30} /> */}
        </TouchableOpacity>
    )
}

export default FloatingButton;