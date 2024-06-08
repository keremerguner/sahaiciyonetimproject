// Home.js
import React, {useState, useEffect} from 'react';
import {
  Text,
  SafeAreaView,
  FlatList,
  View,
  TouchableOpacity,
  Image,
} from 'react-native';
import FloatingButton from '../../components/FloatingButton';
import ContentInputModal from '../../components/model/ContentInput/ContentInputModal';
import auth from '@react-native-firebase/auth';
import database from '@react-native-firebase/database';
import parserContentData from '../../utils/parserContentData';
import MessageCard from '../../components/model/MessageCard';
import LottieView from 'lottie-react-native';

const Home = props => {
  const [inputModalVisible, setInputModalVisible] = useState(false);
  const [contentList, setContentList] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    database()
      .ref('products/')
      .on('value', snapshot => {
        const contentData = snapshot.val();
        const parsedData = parserContentData(contentData || {});

        setContentList(parsedData);
        setLoading(false);
      });

    return () => database().ref('products/').off('value');
  }, []);

  function handleInputToggle() {
    setInputModalVisible(!inputModalVisible);
  }

  function handleSendContent(
    isteyenFirmaContent,
    atananUstaContent,
    urunAdiContent,
    urunRengiContent,
    urunAdediContent,
    urunOlcusuContent,
    complatedContent,
  ) {
    handleInputToggle();
    sendContent(
      isteyenFirmaContent,
      atananUstaContent,
      urunAdiContent,
      urunRengiContent,
      urunAdediContent,
      urunOlcusuContent,
      complatedContent,
    );
  }

  function sendContent(
    isteyenFirmaContent,
    atananUstaContent,
    urunAdiContent,
    urunRengiContent,
    urunAdediContent,
    urunOlcusuContent,
    complatedContent,
  ) {
    const userMail = auth().currentUser.email;

    const contentObject = {
      isteyenFirma: isteyenFirmaContent,
      atananUsta: atananUstaContent,
      urunAdi: urunAdiContent,
      urunAdedi: urunAdediContent,
      urunRengi: urunRengiContent,
      urunOlcusu: urunOlcusuContent,
      username: userMail,
      date: new Date().toISOString(),
      complated: complatedContent,
    };

    database().ref('products/').push(contentObject);
  }

  function handleComplated(item) {
    if (item.complated === 'TAMAMLANDI') {
      return;
    }

    const completedDate = new Date().toISOString();
    database().ref(`products/${item.id}/`).update({
      complated: 'TAMAMLANDI',
      completedAt: completedDate,
    });
  }

  function handleNotComplated(item) {
    database().ref(`products/${item.id}/`).update({
      complated: 'İPTAL EDİLDİ!',
      completedAt: null,
    });
  }

  function handleContinue(item) {
    database().ref(`products/${item.id}/`).update({
      complated: 'DEVAM EDİYOR...',
      completedAt: null,
    });
  }

  const renderContent = ({item}) => {
    return (
      <MessageCard
        message={item}
        onComplated={() => handleComplated(item)}
        onNotComplated={() => handleNotComplated(item)}
        onContinue={() => handleContinue(item)}
      />
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
      {loading ? (
        <LottieView
          source={require('../../assets/lottie/loading.json')}
          style={{width: '50%', height: '50%'}}
          autoPlay
          loop
        />
      ) : (
        <>
          <LottieView
            source={require('../../assets/lottie/home.json')}
            style={{
              width: '100%',
              height: '100%',
              flex: 1,
              position: 'absolute',
            }}
            autoPlay
            loop
          />
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
              onPress={() => props.navigation.navigate('ProfilePage')}>
              <Image
                source={require('../../assets/images/profileIcon.png')}
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
                  textAlign: 'center',
                }}>
                SAHA İÇİ YÖNETİM SİSTEMİ
              </Text>
            </View>
            <TouchableOpacity
              style={{justifyContent: 'center', marginRight: 10}}
              onPress={() => props.navigation.navigate('OrderStatus')}>
              <Image
                source={require('../../assets/images/checklist.png')}
                style={{width: 30, height: 30, tintColor: 'black'}}
              />
            </TouchableOpacity>
          </SafeAreaView>
          <FlatList
            data={contentList}
            renderItem={renderContent}
            keyExtractor={item => item.id}
            style={{backgroundColor: 'white'}}
          />
          <FloatingButton onPress={handleInputToggle} />
          <ContentInputModal
            isVisible={inputModalVisible}
            onClose={handleInputToggle}
            onSend={handleSendContent}
          />
        </>
      )}
    </SafeAreaView>
  );
};

export default Home;
