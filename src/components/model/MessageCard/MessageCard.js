import React, {useRef, useEffect, useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Alert,
  Animated,
  Image,
  Linking,
  TextInput,
} from 'react-native';
import styles from './MessageCard.style';
import {formatDistance, parseISO} from 'date-fns';
import {tr} from 'date-fns/locale';
import auth from '@react-native-firebase/auth';
import database from '@react-native-firebase/database';
import {showMessage} from 'react-native-flash-message';
import Modal from 'react-native-modal';

const MessageCard = ({message, onComplated, onNotComplated, onContinue}) => {
  const userMail = auth().currentUser.email;
  const [userFullName, setUserFullName] = useState('');
  const [cancellationReason, setCancellationReason] = useState('');
  const [isModalVisible, setModalVisible] = useState(false);

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
      }
    });
  }, [message.username]);

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
      .update({complated: 'DEVAM EDİYOR...'})
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
      'Sipariş Durumu Güncelleme',
      'İş tamamlandı olarak işaretlemek istediğinize emin misiniz?',
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
              .update({complated: 'TAMAMLANDI', completedAt: completionTime})
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
    setModalVisible(true);
  };

  const handleCancelOrder = () => {
    if (!cancellationReason) {
      showMessage({
        message: 'Lütfen iptal nedeni giriniz!',
        type: 'danger',
      });
      return;
    }
    const cancellationTime = new Date().toISOString();
    database()
      .ref(`products/${message.id}`)
      .update({
        complated: 'İPTAL EDİLDİ!',
        cancelledAt: cancellationTime,
        cancellationReason: cancellationReason,
      })
      .then(() => {
        showMessage({
          message: 'Sipariş İPTAL EDİLDİ!',
          type: 'danger',
        });
        setModalVisible(false);
        setCancellationReason('');
      })
      .catch(error => {
        showMessage({
          message: `Sipariş iptal edilirken hata oluştu: ${error.message}`,
          type: 'danger',
        });
      });
  };

  const handleContinue = () => {
    Alert.alert(
      'Sipariş Durumu Güncelleme',
      'Siparişe devam etmek istediğinize emin misiniz?',
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
              .update({
                complated: 'DEVAM EDİYOR...',
                completedAt: null,
                cancelledAt: null,
                cancellationReason: null,
              })
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
    Linking.openURL(`tel:${message.phoneNumber}`);
  };

  return userMail === 'serdarerguner@gmail.com' ||
    message.atananUsta === userMail ? (
    <Animated.View style={[styles.container, {borderColor}]}>
      <View style={styles.inner_container}>
        <Text style={styles.firma}>
          Sipariş Geçen: {userFullName || 'Firma Sahibi'}{' '}
        </Text>
        <Text style={styles.date}>{formatedDate}</Text>
      </View>

      <View style={{flexDirection: 'row'}}>
        <Text style={styles.text}>FİRMA:</Text>
        <Text style={{flex: 1, fontWeight: 'bold'}}>
          {message.isteyenFirma}
        </Text>
      </View>
      <View style={{flexDirection: 'row'}}>
        <Text style={styles.text_color}>ÜRÜN: </Text>
        <Text style={{flex: 1, fontWeight: 'bold'}}>{message.urunAdi}</Text>
      </View>
      <View style={{flexDirection: 'row'}}>
        <Text style={styles.text_color}>RENK: </Text>
        <Text style={{flex: 1, fontWeight: 'bold'}}>{message.urunRengi}</Text>
      </View>
      <View style={{flexDirection: 'row'}}>
        <Text style={styles.text_color}>ÖLÇÜ: </Text>
        <Text style={{flex: 1, fontWeight: 'bold'}}>{message.urunOlcusu}</Text>
      </View>
      <View style={{flexDirection: 'row'}}>
        <Text style={styles.text_color}>ADET: </Text>
        <Text style={{flex: 1, fontWeight: 'bold'}}>{message.urunAdedi}</Text>
      </View>

      {message.complated !== 'ATANDI' &&
        message.complated !== 'DEVAM EDİYOR...' && (
          <View style={{flexDirection: 'row'}}>
            <Text style={styles.text_color}>
              {message.complated === 'İPTAL EDİLDİ!'
                ? 'İPTAL ZAMANI:'
                : 'Tamamlanma Zamanı:'}{' '}
            </Text>
            <Text style={{flex: 1}}>
              {message.complated === 'İPTAL EDİLDİ!'
                ? message.cancelledAt
                  ? new Date(message.cancelledAt).toLocaleString()
                  : ''
                : message.completedAt
                ? new Date(message.completedAt).toLocaleString()
                : ''}{' '}
            </Text>
          </View>
        )}

      {message.complated === 'ATANDI' ? (
        <TouchableOpacity onPress={handleAcceptOrder} style={styles.button}>
          <Text style={styles.buttonText}>SİPARİŞİ KABUL ET</Text>
        </TouchableOpacity>
      ) : (
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            onPress={handleComplatedWithConfirmation}
            style={[
              styles.button,
              {
                borderColor: '#31B731',
                opacity: message.complated === 'TAMAMLANDI' ? 0.5 : 1,
              },
            ]}
            disabled={message.complated === 'TAMAMLANDI'}>
            <Image
              source={require('../../../assets/images/ok.png')}
              style={{width: 30, height: 30, tintColor: '#31B731'}}
            />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={handleContinue}
            style={[
              styles.button,
              {
                borderColor: '#FFD328',
                opacity: message.complated === 'DEVAM EDİYOR...' ? 0.5 : 1,
              },
            ]}
            disabled={message.complated === 'DEVAM EDİYOR...'}>
            <Image
              source={require('../../../assets/images/continue.png')}
              style={{width: 30, height: 30, tintColor: '#FFD328'}}
            />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={handleNotComplatedWithConfirmation}
            style={[
              styles.button,
              {
                borderColor: '#cf142b',
                opacity: message.complated === 'İPTAL EDİLDİ!' ? 0.5 : 1,
              },
            ]}
            disabled={message.complated === 'İPTAL EDİLDİ!'}>
            <Image
              source={require('../../../assets/images/cross-button.png')}
              style={{width: 30, height: 30, tintColor: '#cf142b'}}
            />
          </TouchableOpacity>
        </View>
      )}

      <Modal
        isVisible={isModalVisible}
        onBackdropPress={() => setModalVisible(false)}>
        <View style={styles.modalContent}>
          <TouchableOpacity
            style={styles.closeButton}
            onPress={() => setModalVisible(false)}>
            <Image
              source={require('../../../assets/images/cross-button.png')}
              style={{width: 24, height: 24, tintColor: 'black'}}
            />
          </TouchableOpacity>
          <TextInput
            style={styles.cancellationInput}
            placeholder="İptal nedeni giriniz..."
            value={cancellationReason}
            onChangeText={setCancellationReason}
          />
          <TouchableOpacity
            onPress={() => {
              if (!cancellationReason) {
                showMessage({
                  message: 'Lütfen iptal nedeni giriniz!',
                  type: 'danger',
                });
                return;
              }
              Alert.alert(
                'Sipariş İptal',
                'Siparişi iptal etmek istediğinizden emin misiniz?',
                [
                  {
                    text: 'Hayır',
                    style: 'cancel',
                  },
                  {
                    text: 'Evet',
                    onPress: handleCancelOrder,
                  },
                ],
              );
            }}
            style={styles.cancelButton}>
            <Text style={styles.cancledButtonText}>İPTAL ET</Text>
          </TouchableOpacity>
        </View>
      </Modal>
    </Animated.View>
  ) : null;
};

export default MessageCard;
