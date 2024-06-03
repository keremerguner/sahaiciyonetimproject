import React, {useState, useEffect} from 'react';
import {
  SafeAreaView,
  View,
  Text,
  TouchableOpacity,
  Image,
  ScrollView,
} from 'react-native';
import auth from '@react-native-firebase/auth';
import database from '@react-native-firebase/database';

const Profile = props => {
  const [userInfo, setUserInfo] = useState({
    name: '',
    surname: '',
    phone: '',
  });
  const userMail = auth().currentUser.email;

  useEffect(() => {
    const userMail = auth().currentUser.email.toLowerCase();
    const usersRef = database().ref('/users');

    usersRef
      .once('value')
      .then(snapshot => {
        let userDataFound = false;
        snapshot.forEach(childSnapshot => {
          const userData = childSnapshot.val();
          // console.log("Kullanıcı verisi: ", userData.email);
          if (userData.email === userMail) {
            userDataFound = true;
            setUserInfo({
              name: userData.name,
              surname: userData.surname,
              phone: userData.phone,
            });
          }
        });
        if (!userDataFound) {
          // console.log('Kullanıcı verisi bulunamadı:', userMail);
        }
      })
      .catch(error => {
        // console.error('Veri çekme hatası:', error);
      });
  }, []);

  return userMail === 'serdarerguner@gmail.com' ? (
    <SafeAreaView style={{flex: 1, backgroundColor: 'white'}}>
      <ScrollView>
        <View style={{flex: 1}}>
          <View style={{flexDirection: 'row'}}>
            <View style={{flex: 0.3, marginTop: 30, marginLeft: 10}}>
              <TouchableOpacity onPress={() => props.navigation.goBack()}>
                <Image
                  source={require('../../assets/images/Back.png')}
                  style={{
                    width: 26,
                    height: 26,
                    tintColor: 'black',
                  }}
                />
              </TouchableOpacity>
            </View>

            <View
              style={{
                textAlign: 'center',
                flex: 3,
                paddingTop: 26,
                marginRight: 40,
              }}>
              <Text
                style={{
                  flex: 1,
                  fontSize: 30,
                  color: 'black',
                  textAlign: 'center',
                }}>
                Bilgilerim
              </Text>
            </View>
          </View>
          <View
            style={{
              justifyContent: 'center',
              alignItems: 'center',
              marginTop: 30,
            }}>
            <Image
              source={require('../../assets/images/profile.png')}
              style={{
                width: 140,
                height: 140,
                resizeMode: 'contain',
              }}
            />
          </View>
        </View>
        <View style={{flex: 1, paddingHorizontal: 20, marginTop: 80}}>
          <Text
            style={{
              fontWeight: '500',
              fontSize: 32,
              color: '#2E2E2E',
              textAlign: 'center',
            }}>
            ADMİN{' '}
          </Text>
          <Text
            style={{
              fontWeight: '400',
              fontSize: 24,
              color: '#2E2E2E',
              textAlign: 'center',
            }}>
            {auth().currentUser.email}{' '}
          </Text>
        </View>
        <View style={{flex: 1, alignItems: 'center', marginTop: 100}}>
          <TouchableOpacity
            onPress={() => auth().signOut()}
            style={{
              borderWidth: 1.5,
              paddingHorizontal: 60,
              padding: 16,
              borderRadius: 20,
              backgroundColor: 'red',
              borderColor: 'gray',
              flexDirection: 'row',
              alignItems: 'center',
            }}>
            <Text
              style={{
                color: 'white',
                fontSize: 16,
                textAlign: 'center',
                justifyContent: 'center',
                alignItems: 'center',
                alignContent: 'center',
                flex: 0.3,
              }}>
              ÇIKIŞ YAP
            </Text>
            <Image
              source={require('../../assets/images/logout.png')}
              style={{
                width: 24,
                height: 24,
                tintColor: 'white',
              }}
            />
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  ) : (
    <SafeAreaView style={{flex: 1, backgroundColor: 'white'}}>
      <ScrollView>
        <View style={{flex: 1}}>
          <View style={{flexDirection: 'row'}}>
            <View style={{flex: 0.3, marginTop: 30, marginLeft: 10}}>
              <TouchableOpacity onPress={() => props.navigation.goBack()}>
                <Image
                  source={require('../../assets/images/Back.png')}
                  style={{
                    width: 26,
                    height: 26,
                    tintColor: 'black',
                  }}
                />
              </TouchableOpacity>
            </View>

            <View
              style={{
                textAlign: 'center',
                flex: 3,
                paddingTop: 26,
                marginRight: 40,
              }}>
              <Text
                style={{
                  flex: 1,
                  fontSize: 30,
                  color: 'black',
                  textAlign: 'center',
                }}>
                Bilgilerim
              </Text>
            </View>
          </View>
          <View
            style={{
              justifyContent: 'center',
              alignItems: 'center',
              marginTop: 30,
            }}>
            <Image
              source={require('../../assets/images/profile.png')}
              style={{
                width: 140,
                height: 140,
                resizeMode: 'contain',
              }}
            />
          </View>
        </View>
        <View style={{flex: 1, paddingHorizontal: 20, marginTop: 30}}>
          <Text
            style={{
              fontWeight: '500',
              fontSize: 32,
              color: '#2E2E2E',
              textAlign: 'center',
            }}>
            Ad
          </Text>
          <Text
            style={{
              fontWeight: '400',
              fontSize: 24,
              color: '#2E2E2E',
              textAlign: 'center',
            }}>
            {userInfo.name}{' '}
          </Text>
          <Text
            style={{
              fontWeight: '500',
              fontSize: 32,
              color: '#2E2E2E',
              textAlign: 'center',
              marginTop: 10,
            }}>
            Soyad
          </Text>
          <Text
            style={{
              fontWeight: '400',
              fontSize: 24,
              color: '#2E2E2E',
              textAlign: 'center',
            }}>
            {userInfo.surname}{' '}
          </Text>
          <Text
            style={{
              fontWeight: '500',
              fontSize: 32,
              color: '#2E2E2E',
              textAlign: 'center',
              marginTop: 10,
            }}>
            Telefon
          </Text>
          <Text
            style={{
              fontWeight: '400',
              fontSize: 24,
              color: '#2E2E2E',
              textAlign: 'center',
            }}>
            {userInfo.phone}{' '}
          </Text>
          <Text
            style={{
              fontWeight: '500',
              fontSize: 32,
              color: '#2E2E2E',
              textAlign: 'center',
              marginTop: 10,
            }}>
            Mail
          </Text>
          <Text
            style={{
              fontWeight: '400',
              fontSize: 24,
              color: '#2E2E2E',
              textAlign: 'center',
            }}>
            {auth().currentUser.email}{' '}
          </Text>
        </View>
        <View style={{flex: 1, alignItems: 'center', marginTop: 20}}>
          <TouchableOpacity
            onPress={() => auth().signOut()}
            style={{
              borderWidth: 1.5,
              paddingHorizontal: 60,
              padding: 16,
              borderRadius: 20,
              backgroundColor: 'red',
              borderColor: 'gray',
              flexDirection: 'row',
              alignItems: 'center',
            }}>
            <Text
              style={{
                color: 'white',
                fontSize: 16,
                textAlign: 'center',
                justifyContent: 'center',
                alignItems: 'center',
                alignContent: 'center',
                flex: 0.3,
              }}>
              ÇIKIŞ YAP
            </Text>
            <Image
              source={require('../../assets/images/logout.png')}
              style={{
                width: 24,
                height: 24,
                tintColor: 'white',
              }}
            />
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Profile;
