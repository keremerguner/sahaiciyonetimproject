import React, {useState, useEffect} from 'react';
import {Text, SafeAreaView, FlatList} from 'react-native';
import FloatingButton from '../../components/FloatingButton';
import ContentInputModal from '../../components/model/ContentInput/ContentInputModal';
import auth from '@react-native-firebase/auth';
import database from '@react-native-firebase/database';
import parserContentData from '../../utils/parserContentData';
import MessageCard from '../../components/model/MessageCard';

const Home = () => {
  const [inputModalVisible, setInputModalVisible] = useState(false);
  const [contentList, setContentList] = useState([]);

  useEffect(() => {
    database()
      .ref('messages/')
      .on('value', snapshot => {
        const contentData = snapshot.val();
        // console.log('content data: ', contentData);
        const parsedData = parserContentData(contentData || {});

        setContentList(parsedData);
      });
  }, []);

  function handleInputToggle() {
    setInputModalVisible(!inputModalVisible);
  }

  function handleSendContent(content) {
    handleInputToggle();
    console.log(content);
    sendContent(content);
  }

  function sendContent(content) {
    const userMail = auth().currentUser.email;

    const contentObject = {
      text: content,
      username: userMail.split('@')[0],
      date: new Date().toISOString(),
      complated: 'not complated',
    };

    console.log('gonderilen obje: ', contentObject);

    database().ref('messages/').push(contentObject);
  }

  function handleComplated(item) {
    database().ref(`messages/${item.id}/`).update({complated: 'complated'});
  }

  const renderContent = ({item}) => {
    // console.log('item.message', item.username)
    return (
      <MessageCard message={item} onComplated={() => handleComplated(item)} />
    );
  };

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
      <FlatList data={contentList} renderItem={renderContent} />
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
