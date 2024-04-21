import React, {useState} from 'react';
import {Text, View, SafeAreaView} from 'react-native';
import FloatingButton from '../../components/FloatingButton';
import ContentInputModal from '../../components/model/ContentInput/ContentInputModal';

const Home = () => {
  const [inputModalVisible, setInputModalVisible] = useState(false);

  function handleInputToggle() {
    setInputModalVisible(!inputModalVisible);
  }

  function handleSendContent(content) {
    handleInputToggle();
    console.log(content)
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
          color: 'white',
          fontWeight: 'bold',
          flex: 1,
          paddingLeft: 10,
          textAlign: 'center',
          alignSelf: 'center',
        }}>
        Home
      </Text>
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
