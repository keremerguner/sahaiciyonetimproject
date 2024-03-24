import React from "react";
import { TextInput, Text, View } from 'react-native'
import styles from './Input.style';


const Input = ({ placeholder, onChangeText, value, isSecure, keyboardType }) => {

    return (
        <View style={styles.container}>
            <TextInput style={styles.input} placeholder={placeholder} onChangeText={onChangeText} value={value} secureTextEntry={isSecure} autoCapitalize='none' keyboardType={keyboardType} />
        </View>
    )
}

export default Input;