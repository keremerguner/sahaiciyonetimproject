import React, {useState} from 'react';
import {View, TextInput, SafeAreaView, Text} from 'react-native';
import Button from '../../Button';
import styles from './ContentInputModal.style';
import Modal from 'react-native-modal';
import {showMessage} from 'react-native-flash-message';

const ContentInputModal = ({isVisible, onClose, onSend}) => {
  const [text, setText] = useState(null);

  function handleSend() {
    if(!text){
        return;
    }
    onSend(text);
    setText(null);
  }

  return (
    <Modal
      isVisible={isVisible}
      onSwipeComplete={onClose}
      onBackButtonPress={onClose}
      onBackdropPress={onClose}
      style={styles.modal}>
      <View style={styles.container}>
        <View style={styles.input_container} >
        <TextInput placeholder="TextInput..." onChangeText={setText} multiline />
        </View>
        <Button text="gönder" onPress={handleSend} />
      </View>
    </Modal>
  );
};

/*
const ContentInputModal = ({ isVisible, onClose, onSend }) => {

    const [workerName, setWorkerName] = useState(null)
    const [productName, setProductName] = useState(null)
    const [productColor, setProductColor] = useState(null)
    const [productPiece, setProductPiece] = useState(null)
    const [productDimension, setProductDimension] = useState(null)

    function handleSend() {

        if (!workerName || !productColor || !productName || !productPiece || !productDimension) {
            showMessage({
                message: 'Tüm alanları doldurun!',
                icon: 'danger',
                type: "danger",
            });
            return
        } else {
            onSend(workerName, productName, productColor, productPiece, productDimension)
            // console.log('usta:' + text +'color:'+ productColor + 'urun:' + productName + 'adet:' + productPiece )
            setWorkerName(null)
            setProductName(null)
            setProductColor(null)
            setProductPiece(null)
            setProductDimension(null)
        }

    }

    return (
        <Modal
            style={styles.modal}
            isVisible={isVisible}
            onSwipeComplete={onClose}
            onBackdropPress={onClose}
            onBackButtonPress={onClose}
            swipeDirection='down'
        >
            <View style={styles.container}>
                <View style={styles.input_container}>
                    <TextInput
                        placeholder='Worker Name'
                        onChangeText={setWorkerName}
                        multiline
                    />
                </View>
                <View style={styles.input_container}>
                    <TextInput
                        placeholder='Product Name'
                        onChangeText={setProductName}
                        multiline
                    />
                </View>
                <View style={styles.input_container}>
                    <TextInput
                        placeholder='Product Color'
                        onChangeText={setProductColor}
                        multiline
                    />
                </View>
                <View style={styles.input_container}>
                    <TextInput
                        placeholder='Product Dimension'
                        onChangeText={setProductDimension}
                        multiline
                    />
                </View>
                <View style={styles.input_container}>
                    <TextInput
                        placeholder='Product Piece'
                        onChangeText={setProductPiece}
                        multiline
                    />
                </View>
                <Button text='Create Order' onPress={handleSend} />
            </View>
        </Modal>
    )
}
*/

export default ContentInputModal;
