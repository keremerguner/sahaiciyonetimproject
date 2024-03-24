import { StyleSheet } from "react-native";

const base_style = StyleSheet.create({
    container: {
        padding: 10,
        margin: 10,
        backgroundColor: '#ADD8E6',
        borderRadius: 5,
        alignItems: 'center'
    },
    title: {
        fontWeight: 'bold',
        fontSize: 17,
        color: 'white'
    }
})

export default {
    primary: StyleSheet.create({
        ...base_style,
        container: {
            ...base_style.container,
            backgroundColor: '#32cf6b',
            alignItems: 'center',
            borderColor:'#9edaab',
            borderWidth:1
        },
        title: {
            ...base_style.title,
            color: 'white'
        }
    }),
    secondary: StyleSheet.create({
        ...base_style,
        container: {
            ...base_style.container,
            borderWidth: 1,
            borderColor:'#f07b52',
            backgroundColor: '#f07b52',
        },
        title: {
            ...base_style.title,

        }
    })
}