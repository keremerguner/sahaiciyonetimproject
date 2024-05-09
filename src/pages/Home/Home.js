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
      .ref('products/')
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

  function handleSendContent(
    atananUstaContent,
    urunAdiContent,
    urunRengiContent,
    urunAdediContent,
    urunOlcusuContent,
  ) {
    handleInputToggle();
    sendContent(
      atananUstaContent,
      urunAdiContent,
      urunRengiContent,
      urunAdediContent,
      urunOlcusuContent,
    );
  }

  function sendContent(
    atananUstaContent,
    urunAdiContent,
    urunRengiContent,
    urunAdediContent,
    urunOlcusuContent,
  ) {
    const userMail = auth().currentUser.email;

    const contentObject = {
      atananUsta: atananUstaContent,
      urunAdi: urunAdiContent,
      urunAdedi: urunAdediContent,
      urunRengi: urunRengiContent,
      urunOlcusu: urunOlcusuContent,
      username: userMail.split('@')[0],
      date: new Date().toISOString(),
      complated: 'HAZIR DEĞİL',
    };

    console.log('gonderilen obje: ', contentObject);

    database().ref('products/').push(contentObject);
  }

  // function handleComplated(item) {
  //   const completedDate = new Date().toISOString();
  //   // database().ref(`products/${item.id}/`).update({complated: 'complated'});
  //   database().ref(`products/${item.id}/`).update({
  //     complated: 'complated',
  //     completedAt: completedDate,  // Burada yeni bir tarih/saat bilgisi ekleniyor
  //   });
  // }

  function handleComplated(item) {
    // Eğer sipariş zaten tamamlanmışsa, hiçbir şey yapma
    if (item.complated === 'TAMAMLANDI') {
      console.log('Sipariş zaten tamamlandı olarak işaretlenmiş.');
      return;
    }
  
    // Sipariş daha önce tamamlanmamışsa, tamamlanma zamanını güncelle
    const completedDate = new Date().toISOString();
    database().ref(`products/${item.id}/`).update({
      complated: 'TAMAMLANDI',
      completedAt: completedDate,  // Yeni tamamlanma tarihini kaydet
    });
  }
  // function handleNotComplated(item) {
  //   database().ref(`products/${item.id}/`).update({complated: 'not complated'});
  // }
  function handleNotComplated(item) {
    database().ref(`products/${item.id}/`).update({
      complated: 'HAZIR DEĞİL',
      completedAt: null,  // Tamamlanma zamanını sil
    });
  }

  const renderContent = ({item}) => {
    // console.log('item.message', item.username)
    return (
      <MessageCard message={item} onComplated={() => handleComplated(item)} onNotComplated={ () => handleNotComplated(item) } />
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
