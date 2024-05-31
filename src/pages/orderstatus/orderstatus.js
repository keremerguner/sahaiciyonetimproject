import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  Modal,
  FlatList,
} from 'react-native';
import database from '@react-native-firebase/database';
import auth from '@react-native-firebase/auth';
import {formatDistance, parseISO} from 'date-fns';
import {tr} from 'date-fns/locale';

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
    };

    userOrdersRef.on('value', handleData);

    return () => userOrdersRef.off('value', handleData);
  }, []);

  const renderOrderItem = ({item}) => (
    <View style={styles.orderItem}>
      <Text>{item.isteyenFirma}</Text>
      <Text>{item.urunAdi}</Text>
      <Text>{item.urunRengi}</Text>
      <Text>{item.urunOlcusu}</Text>
      <Text>{item.urunAdedi}</Text>
      <Text>{item.formatedDate}</Text>
    </View>
  );

  const openModal = (title, data) => {
    setModalTitle(title);
    setModalData(data);
    setModalVisible(true);
  };

  return (
    <SafeAreaView style={styles.container}>
      <TouchableOpacity onPress={() => props.navigation.goBack()}>
        <Text style={{marginLeft: 10, color: '#000'}}>Geri</Text>
      </TouchableOpacity>
      <Text style={styles.title}>Sipariş Durumları</Text>
      <View style={styles.statusContainer}>
        <View style={styles.statusRow}>
          <Text style={styles.statusText}>
            Tamamlanan Siparişler: {completedCount}
          </Text>
          <TouchableOpacity
            onPress={() => openModal('Tamamlanan Siparişler', completedOrders)}>
            <Text style={styles.buttonText}>Göster</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.statusRow}>
          <Text style={styles.statusText}>
            Devam Eden Siparişler: {ongoingCount}
          </Text>
          <TouchableOpacity
            onPress={() => openModal('Devam Eden Siparişler', ongoingOrders)}>
            <Text style={styles.buttonText}>Göster</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.statusRow}>
          <Text style={styles.statusText}>
            İptal Edilen Siparişler: {cancelledCount}
          </Text>
          <TouchableOpacity
            onPress={() =>
              openModal('İptal Edilen Siparişler', cancelledOrders)
            }>
            <Text style={styles.buttonText}>Göster</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.statusRow}>
          <Text style={styles.statusText}>
            Bekleyen Siparişler: {notComplatedCount}
          </Text>
          <TouchableOpacity
            onPress={() =>
              openModal('Bekleyen Siparişler', notComplatedOrders)
            }>
            <Text style={styles.buttonText}>Göster</Text>
          </TouchableOpacity>
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
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: 'white',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
  },
  statusContainer: {
    marginTop: 20,
  },
  statusRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  statusText: {
    fontSize: 18,
    marginVertical: 10,
  },
  buttonText: {
    fontSize: 16,
    color: 'blue',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  modalContent: {
    width: '80%',
    height: '80%',
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  orderItem: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  closeButton: {
    marginTop: 20,
    alignItems: 'center',
  },
});

export default OrderStatusScreen;
