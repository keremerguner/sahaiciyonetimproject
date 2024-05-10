import { Platform, StyleSheet } from "react-native";

export default StyleSheet.create({
    container: {
        margin: 10,
        flexDirection: 'row',
    },
    input: {
        flex: 1,
        padding: Platform.OS === 'android'? 0 : 8
    }
})