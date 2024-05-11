import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Alert,
  Image,
  Linking,
} from 'react-native';
import styles from './MessageCard.style';
import {formatDistance, parseISO} from 'date-fns';
import {tr} from 'date-fns/locale';

const MessageCard = ({message, onComplated, onNotComplated}) => {
  let borderColor = '#FFD328'; // Varsayılan arka plan rengi
  if (message.complated === 'TAMAMLANDI') {
    borderColor = '#00ee00'; // "complated" özelliği "TAMAMLANDI" ise arka plan rengini yeşil yap
  } else if (message.complated === 'HAZIR DEĞİL') {
    borderColor = '#8b0000'; // "complated" özelliği "HAZIR DEĞİL" ise arka plan rengini kırmızı yap
  }

  const formatedDate = formatDistance(parseISO(message.date), new Date(), {
    addSuffix: true,
    locale: tr,
  });

  // Tamamlanma zamanını silme işlemi için onay diyalogu
  const handleNotComplatedWithConfirmation = () => {
    Alert.alert(
      'Sipariş Durumu Güncelleme', // Başlık
      'Tamamlanma zamanını silmek istediğinize emin misiniz?', // Mesaj
      [
        {
          text: 'İptal',
          onPress: () => console.log('Silme işlemi iptal edildi'),
          style: 'cancel',
        },
        {
          text: 'Evet',
          onPress: () => {
            onNotComplated(message); // onNotComplated fonksiyonunu çağır
          },
        },
      ],
    );
  };
  const handleComplatedWithConfirmation = () => {
    Alert.alert(
      'Sipariş Durumu Güncelleme', // Başlık
      'İş tamamlandı olarak işaretlemek istediğinize emin misiniz?', // Mesaj
      [
        {
          text: 'İptal',
          onPress: () => console.log('İşlem iptal edildi'),
          style: 'cancel',
        },
        {
          text: 'Evet',
          onPress: () => {
            onComplated(message); // onComplated fonksiyonunu çağır
          },
        },
      ],
    );
  };
  const handleCall = () => {
    // Telefon numarasını aramak için Linking modülünü kullanma
    Linking.openURL(`tel:${message.phoneNumber}`);
  };

  return (
    // <View style={styles.container}>
    <View style={[styles.container, {borderColor}]}>
      <View style={styles.inner_container}>
        <Text style={styles.user}>Siparişi Olşturan: {message.username}</Text>
        <Text style={styles.date}>{formatedDate}</Text>
      </View>
      <Text style={styles.text_color} >İsteyen Firma: {message.isteyenFirma} </Text>
      <Text style={styles.text_color} >Usta: {message.atananUsta} </Text>
      <Text style={styles.text_color} >Ürün: {message.urunAdi} </Text>
      <Text style={styles.text_color} >Renk: {message.urunRengi} </Text>
      <Text style={styles.text_color} >Ölçü: {message.urunOlcusu} </Text>
      <Text style={styles.text_color} >Adet: {message.urunAdedi} </Text>
      <Text>
        {!!message.complated && (
          <View>
            <Text style={styles.text_color} >
              Son Durumu:
              <Text style={styles.text_color} >{message.complated}</Text>
            </Text>
          </View>
        )}
      </Text>
      <Text style={styles.text_color} >
        Tamamlanma Zamanı:{' '}
        {message.completedAt
          ? new Date(message.completedAt).toLocaleString()
          : ''}{' '}
      </Text>

      <View style={{padding: 10, flexDirection: 'row'}}>
        <TouchableOpacity
          onPress={handleCall}
          style={{
            flex: 1,
            alignItems: 'center',
            borderWidth: 1,
            borderRadius: 30,
            paddingVertical: 6,
            marginHorizontal: 6,
            backgroundColor: 'white',
            borderColor: 'gray',
          }}>
          <Image
            source={require('../../../assets/telefon.png')}
            style={{width: 30, height: 30, tintColor: 'gray'}}
          />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={handleComplatedWithConfirmation}
          style={{
            flex: 1,
            alignItems: 'center',
            borderWidth: 1,
            borderRadius: 30,
            paddingVertical: 6,
            marginHorizontal: 6,
            backgroundColor: 'white',
            borderColor: '#31B731',
          }}>
          <Image
            source={require('../../../assets/ok.png')}
            //source={require('../../../assets/ok.png')}

            style={{width: 30, height: 30, tintColor: '#31B731'}}
          />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={handleNotComplatedWithConfirmation}
          style={{
            flex: 1,
            alignItems: 'center',
            borderWidth: 1,
            borderRadius: 30,
            paddingVertical: 6,
            marginHorizontal: 6,
            backgroundColor: 'white',
            borderColor: '#A42323',
          }}>
          <Image
            source={require('../../../assets/cross-button.png')}
            style={{width: 30, height: 30, tintColor: '#A42323'}}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default MessageCard;
