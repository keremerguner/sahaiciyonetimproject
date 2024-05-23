import React from 'react'
import { Text, TouchableOpacity, Image } from 'react-native'
import styles from './FloatingButton.style'
// import Icon from "react-native-vector-icons/MaterialCommunityIcons"

const FloatingButton = ({ onPress, icon }) => {
    return (
        <TouchableOpacity style={styles.container} onPress={onPress}>
                      <Image
            source={require('../../assets/images/plus.png')}
            style={{width: 60, height: 60}}
          />
            {/* <Text style={{ fontSize: 16, marginTop: -5, color:'white' }} >SİPARİŞ OLUŞTUR</Text> */}
        </TouchableOpacity>
    )
}

export default FloatingButton;