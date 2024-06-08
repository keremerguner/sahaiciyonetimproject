import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  Image,
  SafeAreaView,
  TouchableOpacity,
  Modal,
  FlatList,
} from 'react-native';
import database from '@react-native-firebase/database';
import auth from '@react-native-firebase/auth';
import {formatDistance, parseISO} from 'date-fns';
import {tr} from 'date-fns/locale';
import * as Progress from 'react-native-progress';
import LottieView from 'lottie-react-native';
import styles from './orderstatus.style';

const OrderStatusScreen = props => {
  const [completedCount, setCompletedCount] = useState(0);
  const [ongoingCount, setOngoingCount] = useState(0);
  const [cancelledCount, setCancelledCount] = useState(0);
  const [notComplatedCount, setNotComplatedCount] = useState(0);
  const [completedOrders, setCompletedOrders] = useState([]);
  const [ongoingOrders, setOngoingOrders] = useState([]);
  const [cancelledOrders, setCancelledOrders] = useState([]);
  const [notComplatedOrders, setNotComplatedOrders] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [modalData, setModalData] = useState([]);
  const [modalTitle, setModalTitle] = useState('');
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const userMail = auth().currentUser.email;
    let userOrdersRef;

    if (userMail === 'serdarerguner@gmail.com') {
      userOrdersRef = database().ref('products'); // Tüm siparişleri al
    } else {
      userOrdersRef = database()
        .ref('products')
        .orderByChild('atananUsta')
        .equalTo(userMail); // Kullanıcıya atanmış siparişleri al
    }

    const handleData = snapshot => {
      let completed = 0;
      let ongoing = 0;
      let cancelled = 0;
      let notComplated = 0;
      const completedOrdersList = [];
      const ongoingOrdersList = [];
      const cancelledOrdersList = [];
      const notComplatedOrdersList = [];
      snapshot.forEach(childSnapshot => {
        const order = childSnapshot.val();
        // createdAt yerine order.date'i kullanarak formatedDate oluşturma
        order.formatedDate = formatDistance(parseISO(order.date), new Date(), {
          addSuffix: true,
          locale: tr,
        });
        if (order.complated === 'TAMAMLANDI') {
          completed++;
          completedOrdersList.push(order);
        } else if (order.complated === 'DEVAM EDİYOR...') {
          ongoing++;
          ongoingOrdersList.push(order);
        } else if (order.complated === 'İPTAL EDİLDİ!') {
          cancelled++;
          cancelledOrdersList.push(order);
        } else if (order.complated === 'ATANDI') {
          notComplated++;
          notComplatedOrdersList.push(order);
        }
      });
      setCompletedCount(completed);
      setOngoingCount(ongoing);
      setCancelledCount(cancelled);
      setNotComplatedCount(notComplated);
      setCompletedOrders(completedOrdersList.reverse());
      setOngoingOrders(ongoingOrdersList.reverse());
      setCancelledOrders(cancelledOrdersList.reverse());
      setNotComplatedOrders(notComplatedOrdersList.reverse());

      // Puan hesaplama
      const totalOrders = completed + ongoing + notComplated;
      let score = 0;
      if (totalOrders > 0) {
        score = (completed / totalOrders) * 100;
      }
      setProgress(score / 100);
    };

    userOrdersRef.on('value', handleData);

    return () => userOrdersRef.off('value', handleData);
  }, []);

  const goToUserTaskSummary = () => {
    props.navigation.navigate('UserTaskSummary');
  };

  const user = auth().currentUser;

  const renderOrderItem = ({item}) => (
    <View style={styles.orderItem}>
      <View style={styles.contentText}>
        <Text>TARİH: {new Date(item.date).toLocaleString()} </Text>
        <Text style={{textAlign: 'right', flex: 1}}>{item.formatedDate}</Text>
      </View>

      <View style={styles.contentText}>
        <Text style={{flex: 1}}>FİRMA: </Text>
        <Text style={{flex: 1, fontWeight: 'bold'}}>{item.isteyenFirma}</Text>
      </View>
      <View style={styles.contentText}>
        <Text style={{flex: 1}}>ÜRÜN: </Text>
        <Text style={{flex: 1, fontWeight: 'bold'}}>{item.urunAdi}</Text>
      </View>
      <View style={styles.contentText}>
        <Text style={{flex: 1}}>RENK: </Text>
        <Text style={{flex: 1, fontWeight: 'bold'}}>{item.urunRengi}</Text>
      </View>
      <View style={styles.contentText}>
        <Text style={{flex: 1}}>ÖLÇÜ: </Text>
        <Text style={{flex: 1, fontWeight: 'bold'}}>{item.urunOlcusu}</Text>
      </View>
      <View style={styles.contentText}>
        <Text style={{flex: 1}}>ADET: </Text>
        <Text style={{flex: 1, fontWeight: 'bold'}}>{item.urunAdedi}</Text>
      </View>
    </View>
  );

  const openModal = (title, data) => {
    setModalTitle(title);
    setModalData(data);
    setModalVisible(true);
  };

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: 'white'}}>
      <SafeAreaView
        style={{
          flexDirection: 'row',
          flex: 0.1,
          backgroundColor: 'white',
          height: 70,
          width: '100%',
        }}>
        <LottieView
          source={require('../../assets/lottie/header.json')}
          style={{
            width: '100%',
            height: '100%',
            position: 'absolute',
          }}
          resizeMode="cover"
          autoPlay
          loop
        />
        <TouchableOpacity
          style={{justifyContent: 'center', paddingLeft: 10}}
          onPress={() => props.navigation.goBack()}>
          <Image
            source={require('../../assets/images/Back.png')}
            style={{
              width: 30,
              height: 30,
              tintColor: 'black',
            }}
          />
        </TouchableOpacity>
        <View
          style={{
            justifyContent: 'center',
            alignItems: 'center',
            flex: 3,
          }}>
          <Text
            style={{
              fontSize: 24,
              fontWeight: '500',
              color: 'black',
              textAlign: 'center',
              marginLeft: -20,
            }}>
            SİPARİŞ DURUMLARI
          </Text>
        </View>
      </SafeAreaView>
      <SafeAreaView style={styles.container}>
        <View style={styles.statusContainer}>
          <View style={styles.statusRowView}>
            <View style={styles.statusRow}>
              <Text style={styles.statusText}>Tamamlanan Siparişler:</Text>
              <Text style={styles.countText}>{completedCount}</Text>
              <TouchableOpacity
                style={styles.btnStyle}
                onPress={() =>
                  openModal('Tamamlanan Siparişler', completedOrders)
                }>
                <Text style={styles.buttonText}>Listele</Text>
              </TouchableOpacity>
            </View>
            <View style={styles.statusRow}>
              <Text style={styles.statusText}>Devam Eden Siparişler:</Text>
              <Text style={styles.countText}>{ongoingCount}</Text>
              <TouchableOpacity
                style={styles.btnStyle}
                onPress={() =>
                  openModal('Devam Eden Siparişler', ongoingOrders)
                }>
                <Text style={styles.buttonText}>Listele</Text>
              </TouchableOpacity>
            </View>
            <View style={styles.statusRow}>
              <Text style={styles.statusText}>Bekleyen Siparişler:</Text>
              <Text style={styles.countText}>{notComplatedCount}</Text>
              <TouchableOpacity
                style={styles.btnStyle}
                onPress={() =>
                  openModal('Bekleyen Siparişler', notComplatedOrders)
                }>
                <Text style={styles.buttonText}>Listele</Text>
              </TouchableOpacity>
            </View>
            <View style={styles.statusRow}>
              <Text style={styles.statusText}>İptal Edilen Siparişler:</Text>
              <Text style={styles.countText}>{cancelledCount}</Text>
              <TouchableOpacity
                style={styles.btnStyle}
                onPress={() =>
                  openModal('İptal Edilen Siparişler', cancelledOrders)
                }>
                <Text style={styles.buttonText}>Listele</Text>
              </TouchableOpacity>
            </View>
          </View>

          <View style={styles.progressContainer}>
            <Text style={styles.progressText}>Genel Durum</Text>
            <Progress.Circle
              size={200}
              progress={progress}
              showsText={true}
              formatText={() => `${Math.round(progress * 100)}%`}
              color={'#6200ee'}
            />
          </View>
          <View style={{flex: 1, justifyContent: 'flex-end'}}>
            {user.email === 'serdarerguner@gmail.com' && (
              <TouchableOpacity
                style={{justifyContent: 'center', marginHorizontal: 10}}
                onPress={goToUserTaskSummary}>
                <View
                  style={{
                    backgroundColor: '#6200ee',
                    padding: 10,
                    borderRadius: 5,
                    flexDirection: 'row',
                    alignItems: 'center',
                  }}>
                  <Text
                    style={{
                      color: 'white',
                      marginRight: 10,
                      flex: 1,
                      textAlign: 'center',
                    }}>
                    USTALARIN DETAYLI İŞ DURUMLARI
                  </Text>
                  <Image
                    source={require('../../assets/images/arrow-right.png')}
                    style={{width: 20, height: 20, tintColor: 'white'}}
                  />
                </View>
              </TouchableOpacity>
            )}
          </View>
        </View>

        <Modal
          visible={modalVisible}
          onRequestClose={() => setModalVisible(false)}
          animationType="slide"
          transparent={true}>
          <View style={styles.modalContainer}>
            <View style={styles.modalContent}>
              <Text style={styles.modalTitle}>{modalTitle}</Text>
              <FlatList
                data={modalData}
                renderItem={renderOrderItem}
                keyExtractor={(item, index) => index.toString()}
                contentContainerStyle={{paddingBottom: 20}}
              />
              <TouchableOpacity
                onPress={() => setModalVisible(false)}
                style={styles.closeButton}>
                <Text style={styles.buttonText}>Kapat</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
      </SafeAreaView>
    </SafeAreaView>
  );
};

export default OrderStatusScreen;
