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
  let backgroundColor = '#b0E2ff'; // Varsayılan arka plan rengi
  if (message.complated === 'TAMAMLANDI') {
    backgroundColor = '#D2D2D2'; // "complated" özelliği "TAMAMLANDI" ise arka plan rengini yeşil yap
  } else if (message.complated === 'HAZIR DEĞİL') {
    backgroundColor = '#D2D2D2'; // "complated" özelliği "HAZIR DEĞİL" ise arka plan rengini kırmızı yap
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
    <View style={[styles.container, {backgroundColor}]}>
      <View style={styles.inner_container}>
        <Text style={styles.user}>Siparişi Olşturan: {message.username}</Text>
        <Text style={styles.date}>{formatedDate}</Text>
      </View>
      <Text>İsteyen Firma: {message.isteyenFirma} </Text>
      <Text>Usta: {message.atananUsta} </Text>
      <Text>Ürün: {message.urunAdi} </Text>
      <Text>Renk: {message.urunRengi} </Text>
      <Text>Ölçü: {message.urunOlcusu} </Text>
      <Text>Adet: {message.urunAdedi} </Text>
      <Text>
        {!!message.complated && (
          <View>
            <Text>
              Son Durumu:
              <Text>{message.complated}</Text>
            </Text>
          </View>
        )}
      </Text>
      <Text>
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
            backgroundColor: 'gray',
            borderColor: 'white',
          }}>
          <Image
            source={require('../../../assets/telefon.png')}
            style={{width: 30, height: 30, tintColor: '#EDEFED'}}
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
            backgroundColor: '#31B731',
            borderColor: 'white',
          }}>
          <Image
            source={require('../../../assets/ok.png')}
            //source={require('../../../assets/ok.png')}

            style={{width: 30, height: 30, tintColor: '#EDEFED'}}
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
            backgroundColor: '#A42323',
            borderColor: 'white',
          }}>
          <Image
            source={require('../../../assets/cross-button.png')}
            style={{width: 30, height: 30, tintColor: '#EDEFED'}}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default MessageCard;
