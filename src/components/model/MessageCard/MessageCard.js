import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native'
import styles from './MessageCard.style'
import { formatDistance, parseISO } from 'date-fns';
import { en } from 'date-fns/locale';

const MessageCard = ({ message, onPress }) => {
    const formatedDate = formatDistance(parseISO(message.date), new Date(), {
        addSuffix: true,
        locale: en
    })

    return (
        <View style={styles.container}>
            <View style={styles.inner_container}>
                <Text style={styles.user}>Orderer: {message.orderMaker}</Text>
                <Text style={styles.date}>Create Time: {formatedDate}</Text>
            </View>

            <Text style={styles.title}>Product Name: {message.productName}</Text>
            <Text style={styles.title}>Product Color: {message.productColor}</Text>
            <Text style={styles.title}>Product Piece: {message.productPiece}</Text>
            <Text style={styles.title}>Product Dimension: {message.productDimension}</Text>
            <Text style={styles.title}>Worker Name: {message.workerName}</Text>
            <Text style={styles.title}>Status: {message.status}</Text>
            <View style={styles.footer}>
                <TouchableOpacity style={styles.dislike_container} onPress={onPress} >
                    {!!message.dislike && (
                        <View style={styles.dislike_count_container}>
                            <Text style={styles.dislike_count_text}>{message.dislike}</Text>
                        </View>
                    )}
                    <Text style={styles.dislike_text}>DONE</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}

export default MessageCard;