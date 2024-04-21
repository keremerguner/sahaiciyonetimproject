import React, {useState} from 'react';
import {Text, View, SafeAreaView, TouchableOpacity} from 'react-native';
import FloatingButton from '../../components/FloatingButton';
import ContentInputModal from '../../components/model/ContentInput/ContentInputModal';
import auth from '@react-native-firebase/auth';

const Home = () => {
  const [inputModalVisible, setInputModalVisible] = useState(false);

  function handleInputToggle() {
    setInputModalVisible(!inputModalVisible);
  }

  function handleSendContent(content) {
    handleInputToggle();
    console.log(content);
  }

  return (
    <SafeAreaView
      style={{
        backgroundColor: 'white',
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
      }}>
      <Text
        style={{
          fontSize: 22,
          color: 'black',
          fontWeight: 'bold',
          flex: 1,
          paddingLeft: 10,
          textAlign: 'center',
          alignSelf: 'center',
        }}>
        Home
      </Text>
      <TouchableOpacity
        onPress={() => {
          auth().signOut();
        }}><Text>ÇIKIŞ YAP</Text></TouchableOpacity>
      <FloatingButton onPress={handleInputToggle} />
      <ContentInputModal
        isVisible={inputModalVisible}
        onClose={handleInputToggle}
        onSend={handleSendContent}
      />
    </SafeAreaView>
  );
};

export default Home;
