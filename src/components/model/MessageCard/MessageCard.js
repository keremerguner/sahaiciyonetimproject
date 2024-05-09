import React from 'react';
import {View, Text, TouchableOpacity, Alert} from 'react-native';
import styles from './MessageCard.style';
import {formatDistance, parseISO} from 'date-fns';
import {tr} from 'date-fns/locale';

const MessageCard = ({message, onComplated, onNotComplated}) => {
  const formatedDate = formatDistance(parseISO(message.date), new Date(), {
    addSuffix: true,
    locale: tr,
  });

  // Tamamlanma zamanını silme işlemi için onay diyalogu
  const handleNotComplatedWithConfirmation = () => {
    Alert.alert(
      "Sipariş Durumu Güncelleme", // Başlık
      "Tamamlanma zamanını silmek istediğinize emin misiniz?", // Mesaj
      [
        {
          text: "İptal",
          onPress: () => console.log("Silme işlemi iptal edildi"),
          style: "cancel"
        },
        { 
          text: "Evet", 
          onPress: () => {
            onNotComplated(message); // onNotComplated fonksiyonunu çağır
          }
        }
      ]
    );
  };
  const handleComplatedWithConfirmation = () => {
    Alert.alert(
      "Sipariş Durumu Güncelleme", // Başlık
      "İş tamamlandı olarak işaretlemek istediğinize emin misiniz?", // Mesaj
      [
        {
          text: "İptal",
          onPress: () => console.log("İşlem iptal edildi"),
          style: "cancel"
        },
        { 
          text: "Evet", 
          onPress: () => {
            onComplated(message); // onComplated fonksiyonunu çağır
          }
        }
      ]
    );
  };
  
  return (
    <View style={styles.container}>
      <View style={styles.inner_container}>
        <Text style={styles.user}>Siparişi Olşturan: {message.username}</Text>
        <Text style={styles.date}>{formatedDate}</Text>
      </View>
      <Text>Usta: {message.atananUsta} </Text>
      <Text>Ürün: {message.urunAdi} </Text>
      <Text>Renk: {message.urunRengi} </Text>
      <Text>Ölçü: {message.urunOlcusu} </Text>
      <Text>Adet: {message.urunAdedi} </Text>
      <Text>{!!message.complated && (<View><Text>Son Durumu: {message.complated}</Text></View>)}</Text>
      <Text>Tamamlanma Zamanı: {message.completedAt ? new Date(message.completedAt).toLocaleString() : ''} </Text>


      <View style={{backgroundColor: 'gray', padding:10, flexDirection:'row'}}>
        <TouchableOpacity
          onPress={handleComplatedWithConfirmation}
          style={{backgroundColor: 'green', flex:1}}>
          <Text>+</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={handleNotComplatedWithConfirmation}
          style={{backgroundColor: 'red', flex:1}}>
          <Text>-</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default MessageCard;
