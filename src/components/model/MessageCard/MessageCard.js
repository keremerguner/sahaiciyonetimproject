import React from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import styles from './MessageCard.style';
import {formatDistance, parseISO} from 'date-fns';
import {tr} from 'date-fns/locale';

const MessageCard = ({message, onComplated}) => {
  const formatedDate = formatDistance(parseISO(message.date), new Date(), {
    addSuffix: true,
    locale: tr,
  });

  return (
    <View style={styles.container}>
      <View style={styles.inner_container}>
        <Text style={styles.user}>Username: {message.username}</Text>
        <Text style={styles.date}>{formatedDate}</Text>
      </View>
      <Text>Mesaj: {message.text} </Text>
      <View>
        <TouchableOpacity onPress={onComplated}>
          {!!message.complated && (
            <View>
              <Text>{message.complated}</Text>
            </View>
          )}
          <Text>Tamamlandı</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default MessageCard;
