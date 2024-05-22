import React, {useState, useEffect} from 'react';
import {View, TextInput, Text} from 'react-native';
import Button from '../../Button';
import styles from './ContentInputModal.style';
import Modal from 'react-native-modal';
import {showMessage} from 'react-native-flash-message';
import RNPickerSelect from 'react-native-picker-select';
import CheckBox from '@react-native-community/checkbox';

import database from '@react-native-firebase/database'; // Database modülünü import edin

const ContentInputModal = ({isVisible, onClose, onSend}) => {
  const [atananUsta, setAtananUsta] = useState(null);
  const [loading, setLoading] = useState(null);
  const [urunAdi, setUrunAdi] = useState(null);
  const [urunRengi, setUrunRengi] = useState(null);
  const [urunAdedi, setUrunAdedi] = useState(null);
  const [urunOlcusu, setUrunOlcusu] = useState(null);
  const [isteyenFirma, setIsteyenFirma] = useState(null);
  const [users, setUsers] = useState([]); // Kullanıcıları tutacak state
  const [firmaModalVisible, setFirmaModalVisible] = useState(false);
  const [newFirmaName, setNewFirmaName] = useState('');
  const [firmaList, setFirmaList] = useState([
    {label: 'Ekol', value: 'Ekol'},
    {label: 'Karacan', value: 'Karacan'},
    {label: 'Yataş', value: 'Yataş'},
  ]);

  // Kullanıcıları yükleme
  useEffect(() => {
    const usersRef = database().ref('users');
    usersRef.on('value', snapshot => {
      const usersArray = [];
      snapshot.forEach(userSnapshot => {
        usersArray.push({
          label: userSnapshot.val().email,
          value: userSnapshot.val().uid,
        });
      });
      setUsers(usersArray);
    });

    // Listener'ı temizleme
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
        <Modal
          isVisible={firmaModalVisible}
          onBackdropPress={() => setFirmaModalVisible(false)}>
          <View
            style={{backgroundColor: 'white', padding: 20, borderRadius: 10}}>
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
        <View style={styles.input_container}>
          <RNPickerSelect
            style={styles.picker}
            onValueChange={value => {
              const selectedUser = users.find(user => user.value === value);
              setAtananUsta(selectedUser ? selectedUser.label : null);
            }}
            items={users}
            placeholder={{label: 'Atanan Usta Seçin...', value: null}}
          />
        </View>
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
        <View style={styles.input_container}>
          <RNPickerSelect
            onValueChange={value => setUrunRengi(value)}
            items={[
              {label: 'Mavi', value: 'Mavi'},
              {label: 'Gri', value: 'Gri'},
              {label: 'Krem', value: 'Krem'},
            ]}
            placeholder={{label: 'Ürün Rengi Seçin...', value: null}}
          />
        </View>
        <View style={styles.input_container}>
          <RNPickerSelect
            onValueChange={value => setUrunAdedi(value)}
            items={[
              {label: '1', value: '1'},
              {label: '2', value: '2'},
              {label: '3', value: '3'},
              // Diğer değerler
            ]}
            placeholder={{label: 'Ürün Adedi Seçin...', value: null}}
          />
        </View>
        <View style={styles.input_container}>
          <RNPickerSelect
            onValueChange={value => setUrunOlcusu(value)}
            items={[
              {label: '90x120', value: '90x120'},
              {label: '100x200', value: '100x200'},
              {label: '150x200', value: '150x200'},
            ]}
            placeholder={{label: 'Ürün Ölçüsü Seçin...', value: null}}
          />
        </View>

        <Button text="Üretime Gönder" onPress={handleSend} loading={loading} />
      </View>
    </Modal>
  );
};
export default ContentInputModal;
