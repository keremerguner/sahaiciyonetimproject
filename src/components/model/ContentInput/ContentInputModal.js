import React, {useState, useEffect} from 'react';
import {View, TextInput, Text, TouchableOpacity, Image} from 'react-native';
import Button from '../../Button';
import styles from './ContentInputModal.style';
import Modal from 'react-native-modal';
import {showMessage} from 'react-native-flash-message';
import RNPickerSelect from 'react-native-picker-select';
import CheckBox from '@react-native-community/checkbox';
import database from '@react-native-firebase/database';

const ContentInputModal = ({isVisible, onClose, onSend}) => {
  const [atananUsta, setAtananUsta] = useState(null);
  const [loading, setLoading] = useState(null);
  const [urunAdi, setUrunAdi] = useState(null);
  const [urunRengi, setUrunRengi] = useState(null);
  const [urunAdedi, setUrunAdedi] = useState(null);
  const [urunOlcusu, setUrunOlcusu] = useState(null);
  const [isteyenFirma, setIsteyenFirma] = useState(null);
  const [users, setUsers] = useState([]);

  const [firmaModalVisible, setFirmaModalVisible] = useState(false);
  const [newFirmaName, setNewFirmaName] = useState('');
  const [firmaList, setFirmaList] = useState([]);

  const [olcuModalVisible, setOlcuModalVisible] = useState(false);
  const [newOlcu, setNewOlcu] = useState('');
  const [olcuList, setOlcuList] = useState([]);

  const [renkModalVisible, setRenkModalVisible] = useState(false);
  const [newRenk, setNewRenk] = useState('');
  const [renkList, setRenkList] = useState([]);

  useEffect(() => {
    const usersRef = database().ref('users');
    usersRef.on('value', snapshot => {
      const usersArray = [];
      snapshot.forEach(userSnapshot => {
        usersArray.push({
          label: userSnapshot.val().name + ' ' + userSnapshot.val().surname,
          value: userSnapshot.val().uid,
          email: userSnapshot.val().email,
        });
      });
      setUsers(usersArray);
    });
    return () => usersRef.off('value');
  }, []);

  useEffect(() => {
    const firmaRef = database().ref('firmalar');
    firmaRef.on('value', snapshot => {
      const loadedFirmalar = [];
      snapshot.forEach(snap => {
        loadedFirmalar.push({
          label: snap.val().name,
          value: snap.val().name,
        });
      });
      setFirmaList(loadedFirmalar);
    });
    return () => firmaRef.off('value');
  }, []);

  useEffect(() => {
    const olcuRef = database().ref('olculer');
    olcuRef.on('value', snapshot => {
      const loadedOlculer = [];
      snapshot.forEach(snap => {
        loadedOlculer.push({
          label: snap.val().olcu,
          value: snap.val().olcu,
        });
      });
      setOlcuList(loadedOlculer);
    });
    return () => olcuRef.off('value');
  }, []);

  useEffect(() => {
    const renkRef = database().ref('renkler');
    renkRef.on('value', snapshot => {
      const loadedRenkler = [];
      snapshot.forEach(snap => {
        loadedRenkler.push({
          label: snap.val().renk,
          value: snap.val().renk,
        });
      });
      setRenkList(loadedRenkler);
    });
    return () => renkRef.off('value');
  }, []);

  const addFirma = () => {
    if (newFirmaName.trim() !== '') {
      const firmaRef = database().ref('firmalar');
      firmaRef
        .push({name: newFirmaName})
        .then(() => {
          setNewFirmaName('');
          setFirmaModalVisible(false);
          showMessage({
            message: 'Firma başarıyla eklendi!',
            type: 'success',
          });
        })
        .catch(error => {
          showMessage({
            message: `Firma eklenirken hata oluştu: ${error.message}`,
            type: 'danger',
          });
        });
    } else {
      showMessage({
        message: 'Lütfen bir firma adı giriniz!',
        type: 'danger',
      });
    }
  };

  const addOlcu = () => {
    if (newOlcu.trim() !== '') {
      const olcuRef = database().ref('olculer');
      olcuRef
        .push({olcu: newOlcu})
        .then(() => {
          setNewOlcu('');
          setOlcuModalVisible(false);
          showMessage({
            message: 'Ölçü başarıyla eklendi!',
            type: 'success',
          });
        })
        .catch(error => {
          showMessage({
            message: `Ölçü eklenirken hata oluştu: ${error.message}`,
            type: 'danger',
          });
        });
    } else {
      showMessage({
        message: 'Lütfen bir ölçü giriniz!',
        type: 'danger',
      });
    }
  };

  const addRenk = () => {
    if (newRenk.trim() !== '') {
      const renkRef = database().ref('renkler');
      renkRef
        .push({renk: newRenk})
        .then(() => {
          setNewRenk('');
          setRenkModalVisible(false);
          showMessage({
            message: 'Renk başarıyla eklendi!',
            type: 'success',
          });
        })
        .catch(error => {
          showMessage({
            message: `Renk eklenirken hata oluştu: ${error.message}`,
            type: 'danger',
          });
        });
    } else {
      showMessage({
        message: 'Lütfen bir renk giriniz!',
        type: 'danger',
      });
    }
  };

  function handleSend() {
    setLoading(true);
    if (
      !isteyenFirma ||
      !atananUsta ||
      !urunAdi ||
      !urunRengi ||
      !urunAdedi ||
      !urunOlcusu
    ) {
      showMessage({
        message: 'Tüm alanları doldurun!',
        icon: 'danger',
        type: 'danger',
      });
      setLoading(false);
      return;
    } else {
      onSend(
        isteyenFirma,
        atananUsta,
        urunAdi,
        urunRengi,
        urunAdedi,
        urunOlcusu,
        'ATANDI',
      );
      setIsteyenFirma(null);
      setAtananUsta(null);
      setUrunAdi(null);
      setUrunRengi(null);
      setUrunAdedi(null);
      setUrunOlcusu(null);
      setLoading(false);
    }
  }

  return (
    <Modal
      isVisible={isVisible}
      onSwipeComplete={onClose}
      onBackButtonPress={onClose}
      onBackdropPress={onClose}
      style={styles.modal}
      swipeDirection="down">
      <View style={styles.container}>
        {/* Firma Ekle Modal */}
        <Modal
          isVisible={firmaModalVisible}
          onBackdropPress={() => setFirmaModalVisible(false)}>
          <View
            style={{backgroundColor: 'white', padding: 20, borderRadius: 10}}>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <Text style={{fontWeight: 'bold', fontSize: 20}}>Firma Adı</Text>
              <TouchableOpacity
                onPress={() => setFirmaModalVisible(false)}
                style={{flex: 1}}>
                <Image
                  source={require('../../../assets/images/cross-button.png')}
                  style={{
                    width: 30,
                    height: 30,
                    tintColor: '#cf142b',
                    alignSelf: 'flex-end',
                  }}
                />
              </TouchableOpacity>
            </View>
            <TextInput
              placeholder="Firma adı giriniz"
              value={newFirmaName}
              onChangeText={setNewFirmaName}
              style={{
                height: 40,
                borderColor: 'gray',
                borderWidth: 1,
                marginBottom: 10,
              }}
            />
            <Button text="Ekle" onPress={addFirma} />
          </View>
        </Modal>

        {/* Ölçü Ekle Modal */}
        <Modal
          isVisible={olcuModalVisible}
          onBackdropPress={() => setOlcuModalVisible(false)}>
          <View
            style={{backgroundColor: 'white', padding: 20, borderRadius: 10}}>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <Text style={{fontWeight: 'bold', fontSize: 20}}>
                Ürün Ölçüsü
              </Text>
              <TouchableOpacity
                onPress={() => setOlcuModalVisible(false)}
                style={{flex: 1}}>
                <Image
                  source={require('../../../assets/images/cross-button.png')}
                  style={{
                    width: 30,
                    height: 30,
                    tintColor: '#cf142b',
                    alignSelf: 'flex-end',
                    marginBottom: 10,
                  }}
                />
              </TouchableOpacity>
            </View>
            <TextInput
              placeholder="Ürün Ölçüsü Giriniz"
              value={newOlcu}
              onChangeText={setNewOlcu}
              style={{
                height: 40,
                borderColor: 'gray',
                borderWidth: 1,
                marginBottom: 10,
              }}
            />
            <Button text="Ekle" onPress={addOlcu} />
          </View>
        </Modal>

        {/* Renk Ekle Modal */}
        <Modal
          isVisible={renkModalVisible}
          onBackdropPress={() => setRenkModalVisible(false)}>
          <View
            style={{backgroundColor: 'white', padding: 20, borderRadius: 10}}>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <Text style={{fontWeight: 'bold', fontSize: 20}}>Renk</Text>
              <TouchableOpacity
                onPress={() => setRenkModalVisible(false)}
                style={{flex: 1}}>
                <Image
                  source={require('../../../assets/images/cross-button.png')}
                  style={{
                    width: 30,
                    height: 30,
                    tintColor: '#cf142b',
                    alignSelf: 'flex-end',
                    marginBottom: 10,
                  }}
                />
              </TouchableOpacity>
            </View>
            <TextInput
              placeholder="Renk Giriniz"
              value={newRenk}
              onChangeText={setNewRenk}
              style={{
                height: 40,
                borderColor: 'gray',
                borderWidth: 1,
                marginBottom: 10,
              }}
            />
            <Button text="Ekle" onPress={addRenk} />
          </View>
        </Modal>

        {/* Atanan Usta START */}
        <View style={styles.input_container}>
          <RNPickerSelect
            style={styles.picker}
            onValueChange={value => {
              const selectedUser = users.find(user => user.value === value);
              setAtananUsta(selectedUser ? selectedUser.email : null);
            }}
            items={users}
            placeholder={{label: 'Atanan Usta Seçin...', value: null}}
          />
        </View>
        {/* Atanan Usta END */}

        {/* Firma Sec START */}
        <View style={{flexDirection: 'row'}}>
          <View
            style={{
              flex: 1,
              backgroundColor: 'white',
              borderRadius: 12,
              borderColor: '#4A90E2',
              borderWidth: 0.5,
              marginTop: 6,
              justifyContent: 'center',
            }}>
            <RNPickerSelect
              onValueChange={value => setIsteyenFirma(value)}
              items={firmaList}
              placeholder={{label: 'Firma seçin...', value: null}}
            />
          </View>
          <Button
            text="Firma Ekle"
            onPress={() => setFirmaModalVisible(true)}
          />
        </View>
        {/* Firma Sec END */}

        {/* Urun START */}
        <View style={styles.input2}>
          <View style={{flexDirection: 'row', alignItems: 'center', flex: 1}}>
            <CheckBox
              value={urunAdi === 'Baza'}
              onValueChange={() => setUrunAdi('Baza')}
            />
            <Text>Baza</Text>
          </View>
          <View style={{flexDirection: 'row', alignItems: 'center', flex: 1}}>
            <CheckBox
              value={urunAdi === 'Başlık'}
              onValueChange={() => setUrunAdi('Başlık')}
            />
            <Text>Başlık</Text>
          </View>
          <View style={{flexDirection: 'row', alignItems: 'center', flex: 1}}>
            <CheckBox
              value={urunAdi === 'Yatak'}
              onValueChange={() => setUrunAdi('Yatak')}
            />
            <Text>Yatak</Text>
          </View>
        </View>
        {/* Urun END */}

        {/* Urun Renk START */}
        <View style={{flexDirection: 'row'}}>
          <View
            style={{
              flex: 1,
              backgroundColor: 'white',
              borderRadius: 12,
              borderColor: '#4A90E2',
              borderWidth: 0.5,
              marginTop: 6,
              justifyContent: 'center',
            }}>
            <RNPickerSelect
              onValueChange={value => setUrunRengi(value)}
              items={renkList}
              placeholder={{label: 'Ürün Rengi Seçin...', value: null}}
            />
          </View>
          <Button text="Renk Ekle" onPress={() => setRenkModalVisible(true)} />
        </View>
        {/* Urun Renk END */}

        {/* Urun Adedi START */}
        <View style={styles.input_container}>
          <RNPickerSelect
            onValueChange={value => setUrunAdedi(value)}
            items={[
              {label: '1', value: '1'},
              {label: '2', value: '2'},
              {label: '3', value: '3'},
              {label: '4', value: '4'},
              {label: '5', value: '5'},
              {label: '6', value: '6'},
              {label: '7', value: '7'},
              {label: '8', value: '8'},
              {label: '9', value: '9'},
              {label: '10', value: '10'},
              // Diğer değerler
            ]}
            placeholder={{label: 'Ürün Adedi Seçin...', value: null}}
          />
        </View>
        {/* Urun Adedi END */}

        {/* Urun Olcusu START */}
        <View style={{flexDirection: 'row'}}>
          <View
            style={{
              flex: 1,
              backgroundColor: 'white',
              borderRadius: 12,
              borderColor: '#4A90E2',
              borderWidth: 0.5,
              marginTop: 6,
              justifyContent: 'center',
            }}>
            <RNPickerSelect
              onValueChange={value => setUrunOlcusu(value)}
              items={olcuList}
              placeholder={{label: 'Ürün Ölçüsü Seçin...', value: null}}
            />
          </View>
          <Button text="Ölçü Ekle" onPress={() => setOlcuModalVisible(true)} />
        </View>
        {/* Urun Olcusu END */}

        <Button text="Üretime Gönder" onPress={handleSend} loading={loading} />
      </View>
    </Modal>
  );
};
export default ContentInputModal;
