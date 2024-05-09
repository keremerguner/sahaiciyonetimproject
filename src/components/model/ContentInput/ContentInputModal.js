import React, {useState} from 'react';
import {View, TextInput, SafeAreaView, Text, Platform} from 'react-native';
import Button from '../../Button';
import styles from './ContentInputModal.style';
import Modal from 'react-native-modal';
import {showMessage} from 'react-native-flash-message';

const ContentInputModal = ({isVisible, onClose, onSend}) => {
  const [atananUsta, setAtananUsta] = useState(null);
  const [urunAdi, setUrunAdi] = useState(null);
  const [urunRengi, setUrunRengi] = useState(null);
  const [urunAdedi, setUrunAdedi] = useState(null);
  const [urunOlcusu, setUrunOlcusu] = useState(null);

  function handleSend() {
    if (!atananUsta || !urunAdi || !urunRengi || !urunAdedi || !urunOlcusu) {
      showMessage({
        message: 'Tüm alanları doldurun!',
        icon: 'danger',
        type: 'danger',
      });
      return;
    } else {
      onSend(atananUsta, urunAdi, urunRengi, urunAdedi, urunOlcusu);
      setAtananUsta(null);
      setUrunAdi(null);
      setUrunRengi(null);
      setUrunAdedi(null);
      setUrunOlcusu(null);
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
        <View style={styles.input_container}>
          <TextInput
            placeholder="Atanan Usta..."
            onChangeText={setAtananUsta}
            multiline
            style={styles.textInput}
          />
        </View>
        <View style={styles.input_container}>
          <TextInput
            placeholder="Urun Adi..."
            onChangeText={setUrunAdi}
            multiline
            style={styles.textInput}
          />
        </View>
        <View style={styles.input_container}>
          <TextInput
            placeholder="urunRengi..."
            onChangeText={setUrunRengi}
            multiline
            style={styles.textInput}
          />
        </View>
        <View style={styles.input_container}>
          <TextInput
            placeholder="Urun Adedi..."
            onChangeText={setUrunAdedi}
            multiline
            style={styles.textInput}
          />
        </View>
        <View style={styles.input_container}>
          <TextInput
            placeholder="Urun Olcusu..."
            onChangeText={setUrunOlcusu}
            multiline
            style={styles.textInput}
          />
        </View>
        <Button text="Üretime Gönder" onPress={handleSend} />
      </View>
    </Modal>
  );
};
export default ContentInputModal;
