import { StyleSheet, Dimensions } from "react-native";

const deviceSize = Dimensions.get('window')

export default StyleSheet.create({
    container: {
        backgroundColor: 'red',
        padding: 10,
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,
        height: deviceSize.height / 2,
    },
    input_container: {
        flex: 1,
        backgroundColor: 'white',
        borderRadius: 12,
        borderColor: 'gray',
        borderWidth: 0.5,
        marginTop: 6
    },
    modal: {
        justifyContent: 'flex-end',
        margin: 0,
    }
})