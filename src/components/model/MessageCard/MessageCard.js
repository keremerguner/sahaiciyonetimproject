import React, {useRef, useEffect, useState} from 'react';
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
import database from '@react-native-firebase/database';
import { showMessage } from 'react-native-flash-message';

const MessageCard = ({message, onComplated, onNotComplated, onContinue}) => {
  const userMail = auth().currentUser.email;
  const [userFullName, setUserFullName] = useState('');

  useEffect(() => {
    const userRef = database()
      .ref(`users`)
      .orderByChild('email')
      .equalTo(message.username);
    userRef.once('value', snapshot => {
      if (snapshot.exists()) {
        snapshot.forEach(childSnapshot => {
          const userData = childSnapshot.val();
          setUserFullName(`${userData.name} ${userData.surname}`);
        });
      } else {
        // sürekli ekrana basıyo
        // console.log('Geçersiz kullanıcı adı:', message.username);
      }
    });
  }, [message.username]);

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

  const handleAcceptOrder = () => {
    database()
      .ref(`products/${message.id}`)
      .update({ complated: 'DEVAM EDİYOR...' })
      .then(() => {
        showMessage({
          message: 'Sipariş kabul edildi!',
          type: 'success',
        });
      })
      .catch(error => {
        showMessage({
          message: `Sipariş kabul edilirken hata oluştu: ${error.message}`,
          type: 'danger',
        });
      });
  };

  const handleComplatedWithConfirmation = () => {
    Alert.alert(
      'Sipariş Durumu Güncelleme', // Başlık
      'İş tamamlandı olarak işaretlemek istediğinize emin misiniz?', // Mesaj
      [
        {
          text: 'İptal',
          style: 'cancel',
        },
        {
          text: 'Evet',
          onPress: () => {
            const completionTime = new Date().toISOString();
            database()
              .ref(`products/${message.id}`)
              .update({ complated: 'TAMAMLANDI', completedAt: completionTime })
              .then(() => {
                showMessage({
                  message: 'Sipariş TAMAMLANDI!',
                  type: 'success',
                });
              })
              .catch(error => {
                showMessage({
                  message: `Sipariş TAMAMLANDI olarak işaretlenirken hata oluştu: ${error.message}`,
                  type: 'danger',
                });
              });
          },
        },
      ],
    );
  };

  const handleNotComplatedWithConfirmation = () => {
    Alert.alert(
      'Sipariş Durumu Güncelleme', // Başlık
      'Siparişi İPTAL etmek istediğinize emin misiniz?', // Mesaj
      [
        {
          text: 'İptal',
          style: 'cancel',
        },
        {
          text: 'Evet',
          onPress: () => {
            const cancellationTime = new Date().toISOString();
            database()
              .ref(`products/${message.id}`)
              .update({ complated: 'İPTAL EDİLDİ!', cancelledAt: cancellationTime })
              .then(() => {
                showMessage({
                  message: 'Sipariş İPTAL EDİLDİ!',
                  type: 'danger',
                });
              })
              .catch(error => {
                showMessage({
                  message: `Sipariş iptal edilirken hata oluştu: ${error.message}`,
                  type: 'danger',
                });
              });
          },
        },
      ],
    );
  };

  const handleContinue = () => {
    Alert.alert(
      'Sipariş Durumu Güncelleme', // Başlık
      'Siparişe devam etmek istediğinize emin misiniz?', // Mesaj
      [
        {
          text: 'İptal',
          style: 'cancel',
        },
        {
          text: 'Evet',
          onPress: () => {
            database()
              .ref(`products/${message.id}`)
              .update({ complated: 'DEVAM EDİYOR...', completedAt: null, cancelledAt: null })
              .then(() => {
                showMessage({
                  message: `Sipariş DEVAM EDİYOR!`,
                  type: 'warning',
                });
              })
              .catch(error => {
                showMessage({
                  message: `Sipariş DEVAM EDİYOR olarak işaretlenirken hata oluştu: ${error.message}`,
                  type: 'danger',
                });
              });
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
        <Text style={styles.firma}>
          İsteyen Firma: {message.isteyenFirma}{' '}
        </Text>
        <Text style={styles.date}>{formatedDate}</Text>
      </View>
      <Text style={styles.text}>
        Siparişi Oluşturan: {userFullName || 'Firma Sahibi'}
      </Text>
      <Text style={styles.text_color}>Ürün: {message.urunAdi} </Text>
      <Text style={styles.text_color}>Renk: {message.urunRengi} </Text>
      <Text style={styles.text_color}>Ölçü: {message.urunOlcusu} </Text>
      <Text style={styles.text_color}>Adet: {message.urunAdedi} </Text>
      {message.complated !== 'ATANDI' && message.complated !== 'DEVAM EDİYOR...' && (
        <Text style={styles.text_color}>
          {message.complated === 'İPTAL EDİLDİ!' ? 'İPTAL ZAMANI:' : 'Tamamlanma Zamanı:'}{' '}
          {message.complated === 'İPTAL EDİLDİ!'
            ? message.cancelledAt
              ? new Date(message.cancelledAt).toLocaleString()
              : ''
            : message.completedAt
            ? new Date(message.completedAt).toLocaleString()
            : ''}{' '}
        </Text>
      )}
      {message.complated === 'ATANDI' ? (
        <TouchableOpacity
          onPress={handleAcceptOrder}
          style={styles.button}
        >
          <Text style={styles.buttonText}>SİPARİŞİ KABUL ET</Text>
        </TouchableOpacity>
      ) : (
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            onPress={handleComplatedWithConfirmation}
            style={[styles.button, {borderColor: '#31B731', opacity: message.complated === 'TAMAMLANDI' ? 0.5 : 1}]}
            disabled={message.complated === 'TAMAMLANDI'}
          >
            <Image
              source={require('../../../assets/images/ok.png')}
              style={{width: 30, height: 30, tintColor: '#31B731'}}
            />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={handleContinue}
            style={[styles.button, {borderColor: '#FFD328', opacity: message.complated === 'DEVAM EDİYOR...' ? 0.5 : 1}]}
            disabled={message.complated === 'DEVAM EDİYOR...'}
          >
            <Image
              source={require('../../../assets/images/continue.png')}
              style={{width: 30, height: 30, tintColor: '#FFD328'}}
            />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={handleNotComplatedWithConfirmation}
            style={[styles.button, {borderColor: '#cf142b', opacity: message.complated === 'İPTAL EDİLDİ!' ? 0.5 : 1}]}
            disabled={message.complated === 'İPTAL EDİLDİ!'}
          >
            <Image
              source={require('../../../assets/images/cross-button.png')}
              style={{width: 30, height: 30, tintColor: '#cf142b'}}
            />
          </TouchableOpacity>
        </View>
      )}
    </Animated.View>
  ) : null;
};

export default MessageCard;
