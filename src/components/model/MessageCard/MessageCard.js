import React, {useRef, useEffect} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Alert,
  Animated,
  Image,
  Linking,
} from 'react-native';
import styles from './MessageCard.style';
import {formatDistance, parseISO} from 'date-fns';
import {tr} from 'date-fns/locale';
import auth from '@react-native-firebase/auth';

const MessageCard = ({message, onComplated, onNotComplated, onContinue}) => {
  const userMail = auth().currentUser.email;

  // Duruma göre başlangıç renk değerini al
  const getInitialColorValue = status => {
    switch (status) {
      case 'TAMAMLANDI':
        return 1;
      case 'DEVAM EDİYOR...':
        return 2;
      default:
        return 0;
    }
  };

  // Duruma göre renk değerini al
  const getColorValue = status => {
    switch (status) {
      case 'TAMAMLANDI':
        return 1;
      case 'DEVAM EDİYOR...':
        return 2;
      default:
        return 0;
    }
  };

  // İlk renk değerini belirle
  const initialColorValue = getInitialColorValue(message.complated);
  const borderColorAnim = useRef(new Animated.Value(initialColorValue)).current;

  useEffect(() => {
    const newValue = getColorValue(message.complated);
    Animated.timing(borderColorAnim, {
      toValue: newValue,
      duration: 500,
      useNativeDriver: false,
    }).start();
  }, [message.complated, borderColorAnim]);

  const borderColor = borderColorAnim.interpolate({
    inputRange: [0, 1, 2],
    outputRange: ['#cf142b', '#00ee00', '#FFD328'],
  });

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
          // onPress: () => console.log('Silme işlemi iptal edildi'),
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
          // onPress: () => console.log('İşlem iptal edildi'),
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
  const handleContinue = () => {
    Alert.alert(
      'Sipariş Durumu Güncelleme', // Başlık
      'Siparişe devam etmek istediğine emin misiniz?', // Mesaj
      [
        {
          text: 'İptal',
          // onPress: () => console.log('Devam işlemi iptal edildi'),
          style: 'cancel',
        },
        {
          text: 'Evet',
          onPress: () => {
            onContinue(message); // onNotComplated fonksiyonunu çağır
          },
        },
      ],
    );
  };
  const handleCall = () => {
    // Telefon numarasını aramak için Linking modülünü kullanma
    Linking.openURL(`tel:${message.phoneNumber}`);
  };

  return userMail === 'serdarerguner@gmail.com' ||
    message.atananUsta === userMail ? (
    <Animated.View style={[styles.container, {borderColor}]}>
      <View style={styles.inner_container}>
        <Text style={styles.user}>Usta Maili: {message.atananUsta}</Text>
        <Text style={styles.date}>{formatedDate}</Text>
      </View>
      <Text style={styles.text_color}>
        İsteyen Firma: {message.isteyenFirma}{' '}
      </Text>
      <Text style={styles.text_color}>
        Siparişi Olşturan: {message.username}
      </Text>
      <Text style={styles.text_color}>Ürün: {message.urunAdi} </Text>
      <Text style={styles.text_color}>Renk: {message.urunRengi} </Text>
      <Text style={styles.text_color}>Ölçü: {message.urunOlcusu} </Text>
      <Text style={styles.text_color}>Adet: {message.urunAdedi} </Text>
      <Text>
        {!!message.complated && (
          <View>
            <Text style={styles.text_color}>
              Son Durumu:
              <Text style={styles.text_color}>{message.complated}</Text>
            </Text>
          </View>
        )}
      </Text>
      <Text style={styles.text_color}>
        Tamamlanma Zamanı:{' '}
        {message.completedAt
          ? new Date(message.completedAt).toLocaleString()
          : ''}{' '}
      </Text>
      <View style={{padding: 10, flexDirection: 'row'}}>
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
            opacity: message.complated === 'TAMAMLANDI' ? 0.5 : 1, // Disable button if complated is 'İPTAL EDİLDİ!'
          }}
          disabled={message.complated === 'TAMAMLANDI'} // Disable button if complated is 'İPTAL EDİLDİ!'
        >
          <Image
            source={require('../../../assets/ok.png')}
            style={{width: 30, height: 30, tintColor: '#31B731'}}
          />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={handleContinue}
          style={{
            flex: 1,
            alignItems: 'center',
            borderWidth: 1,
            borderRadius: 30,
            paddingVertical: 6,
            marginHorizontal: 6,
            backgroundColor: 'white',
            borderColor: '#FFD328',
            opacity: message.complated === 'DEVAM EDİYOR...' ? 0.5 : 1, // Disable button if complated is 'İPTAL EDİLDİ!'
          }}
          disabled={message.complated === 'DEVAM EDİYOR...'} // Disable button if complated is 'İPTAL EDİLDİ!'
        >
          <Image
            source={require('../../../assets/continue.png')}
            style={{width: 30, height: 30, tintColor: '#FFD328'}}
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
            borderColor: '#cf142b',
            opacity: message.complated === 'İPTAL EDİLDİ!' ? 0.5 : 1, // Disable button if complated is 'İPTAL EDİLDİ!'
          }}
          disabled={message.complated === 'İPTAL EDİLDİ!'} // Disable button if complated is 'İPTAL EDİLDİ!'
        >
          <Image
            source={require('../../../assets/cross-button.png')}
            style={{width: 30, height: 30, tintColor: '#cf142b'}}
          />
        </TouchableOpacity>
      </View>
    </Animated.View>
  ) : null;
};

export default MessageCard;
