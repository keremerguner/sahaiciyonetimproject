import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  Image,
  SafeAreaView,
  TouchableOpacity,
  FlatList,
  Modal,
  Linking,
  RefreshControl,
} from 'react-native';
import database from '@react-native-firebase/database';
import {formatDistance, parseISO} from 'date-fns';
import {tr} from 'date-fns/locale';
import styles from './userTaskSummary.style';
import LottieView from 'lottie-react-native';
import * as Progress from 'react-native-progress';

const UserTaskSummary = props => {
  const [users, setUsers] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedUserOrders, setSelectedUserOrders] = useState([]);
  const [refreshing, setRefreshing] = useState(false);

  const fetchData = async () => {
    const snapshot = await database().ref('users').once('value');
    const usersData = snapshot.val();
    const formattedUsers = Object.keys(usersData).map(key => ({
      email: key,
      ...usersData[key],
      completed: 0,
      ongoing: 0,
      cancelled: 0,
      notCompleted: 0,
      orders: [],
    }));

    const ordersSnapshot = await database().ref('products').once('value');

    ordersSnapshot.forEach(childSnapshot => {
      const order = childSnapshot.val();
      const user = formattedUsers.find(u => u.email === order.atananUsta);

      if (user) {
        user.orders.push(order);
        if (order.complated === 'TAMAMLANDI') {
          user.completed += 1;
        } else if (order.complated === 'DEVAM EDİYOR...') {
          user.ongoing += 1;
        } else if (order.complated === 'İPTAL EDİLDİ!') {
          user.cancelled += 1;
        } else if (order.complated === 'ATANDI') {
          user.notCompleted += 1;
        }
      }
    });

    formattedUsers.sort((a, b) => a.name.localeCompare(b.name));

    setUsers(formattedUsers);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const onRefresh = () => {
    setRefreshing(true);
    fetchData().then(() => setRefreshing(false));
  };

  const renderUserOrderItem = ({item}) => {
    const totalOrders = item.completed + item.ongoing + item.notCompleted;
    const progress = totalOrders > 0 ? item.completed / totalOrders : 0;

    return (
      <View style={styles.card}>
        <View>
          <Text style={styles.emailText}>
            USTA: {item.name} {item.surname}
          </Text>
          <Text style={styles.orderText}>
            Tamamlanan İşler: {item.completed}
          </Text>
          <Text style={styles.orderText}>Devam Eden İşler: {item.ongoing}</Text>
          <Text style={styles.orderText}>
            İptal Edilen İşler: {item.cancelled}
          </Text>
          <Text style={styles.orderText}>
            Bekleyen İşler: {item.notCompleted}
          </Text>
          <TouchableOpacity
            style={styles.button}
            onPress={() => {
              setSelectedUserOrders(item.orders.reverse());
              setModalVisible(true);
            }}>
            <Text style={styles.buttonText}>İşleri Listele</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.phoneIcon}
            onPress={() => Linking.openURL(`tel:0${item.phone}`)}>
            <Image
              source={require('../../assets/images/telefon.png')}
              style={{width: 32, height: 32, tintColor: 'green'}}
            />
          </TouchableOpacity>
          <Progress.Circle
            size={80}
            progress={progress}
            showsText={true}
            formatText={() => `${Math.round(progress * 100)}%`}
            color={'#6200ee'}
            style={styles.progressCircle}
          />
        </View>
      </View>
    );
  };

  const renderOrderItem = ({item}) => {
    return (
      <View style={styles.orderItem}>
        <Text>Firma: {item.isteyenFirma}</Text>
        <Text>Ürün: {item.urunAdi}</Text>
        <Text>Renk: {item.urunRengi}</Text>
        <Text>Ölçü: {item.urunOlcusu}</Text>
        <Text>Adet: {item.urunAdedi}</Text>
        <Text>Durum: {item.complated}</Text>
        {(item.complated === 'DEVAM EDİYOR...' ||
          item.complated === 'ATANDI') && (
          <Text>
            Geçen Zaman:{' '}
            {formatDistance(parseISO(item.date), new Date(), {locale: tr})}
          </Text>
        )}
        <Text>Tarih: {new Date(item.date).toLocaleString()}</Text>
      </View>
    );
  };
  return (
    <SafeAreaView style={styles.container}>
      <>
        <SafeAreaView
          style={{
            flexDirection: 'row',
            backgroundColor: 'white',
            height: 70,
            width: '100%',
          }}>
          <LottieView
            source={require('../../assets/lottie/header.json')}
            style={{
              width: '100%',
              marginBottom: 100,
              height: '100%',
              position: 'absolute',
            }}
            resizeMode="cover"
            autoPlay
            loop
          />
          <TouchableOpacity
            style={{justifyContent: 'center', marginLeft: 10}}
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
                marginLeft: -30,
                textAlign: 'center',
              }}>
              USTA İŞ DURUMU
            </Text>
          </View>
        </SafeAreaView>
      </>
      <FlatList
        data={users}
        renderItem={renderUserOrderItem}
        keyExtractor={item => item.email}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      />
      <Modal
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
        animationType="slide"
        transparent={true}>
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>İşler</Text>
            <FlatList
              data={selectedUserOrders}
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
  );
};

export default UserTaskSummary;
