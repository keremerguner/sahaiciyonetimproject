import React, {useState} from 'react';
import {
  SafeAreaView,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  ScrollView,
  Modal,
  Alert,
  Pressable,
  ActivityIndicator,
  Platform,
} from 'react-native';
import styles from './Sign.style';
import {Formik} from 'formik';
import authErrorMessageParser from '../../utils/authErrorMessageParser';
import {showMessage} from 'react-native-flash-message';
import auth from '@react-native-firebase/auth';
import database from '@react-native-firebase/database';

const Sign = props => {
  const [loading, setLoading] = useState(false);

  const privacyPolicy =
    '1) Kişisel bilgilerinizi toplarken ve kullanırken gizlilik ve güvenlik önlemleri alıyoruz. \n2) Kişisel bilgilerinizi ticari amaçlarla asla üçüncü taraflarla paylaşmıyoruz. \n3) İnternet üzerinden iletişimin tamamen güvenli olmadığını ve riskler bulunduğunu unutmayın. \n4) Çerezler gibi teknolojileri kullanarak kullanıcıları tanıyabilir ve kullanıcı tercihlerini hatırlayabiliriz. \n5) Üçüncü taraf web sitelerine veya hizmetlere bağlantılar içeriyoruz, ancak bu bağlantıların gizlilik politikalarından sorumlu değiliz.\n\n';

  const termsAndConditionds =
    "1) Hesap oluştururken doğru ve güncel bilgiler sağlamalısınız. \n2) Uygulamayı yasa dışı, ahlaka aykırı veya başkalarının haklarını ihlal eden amaçlarla kullanmamalısınız.\n3)Uygulama ve içeriğin fikri mülkiyet hakları Şirketimize aittir ve izinsiz kullanımı yasaktır.\n4) Şirket, takdir yetkisiyle Uygulama'nın kullanımını sonlandırabilir veya erişimi askıya alabilir.";

  const [privacyModal, setPrivacyModal] = useState(false);

  const initialFormValues = {
    usermail: '',
    password: '',
    repassword: '',
    name: '', // Kullanıcı adı alanı
    surname: '', // Soyadı alanı
    phone: '', // Telefon numarası alanı
  };

  async function handleFormSubmit(formValues) {
    if (formValues.password !== formValues.repassword) {
      showMessage({
        message: 'Şifreler uyuşmuyor',
        type: 'danger',
      });
      return;
    }

    // Name ve Surname uzunluğunu kontrol et
    if (!formValues.name || formValues.name.trim().length < 3) {
      showMessage({
        message: 'Ad en az 3 karakter olmalıdır!',
        type: 'danger',
      });
      return;
    }

    if (!formValues.surname || formValues.surname.trim().length < 3) {
      showMessage({
        message: 'Soyad en az 3 karakter olmalıdır!',
        type: 'danger',
      });
      return;
    }

    // Telefon numarasının uzunluğunu kontrol et
    if (formValues.phone.length !== 10) {
      showMessage({
        message: 'Telefon numarası 10 haneli olmalıdır!',
        type: 'danger',
      });
      return;
    }

    try {
      setLoading(true); // Yüklenme durumunu başlat
      const userCredential = await auth().createUserWithEmailAndPassword(
        formValues.usermail,
        formValues.password,
      );
      const user = userCredential.user;
      // Kullanıcı bilgilerini database'e kaydet
      database().ref(`users/${user.uid}`).set({
        email: user.email,
        uid: user.uid,
        name: formValues.name, // Kullanıcı adı
        surname: formValues.surname, // Soyadı
        phone: formValues.phone, // Telefon numarası
      });

      showMessage({
        message: 'Kullanıcı oluşturuldu',
        type: 'success',
        icon: 'success',
      });
    } catch (error) {
      setLoading(false); // Yüklenme durumunu sonlandır
      showMessage({
        message: authErrorMessageParser(error.code),
        type: 'danger',
        icon: 'danger',
      });
      console.log('Kullanıcı oluşturulamadı: ', error);
    }
    setLoading(false); // Yüklenme durumunu sonlandır
    console.log(formValues);
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <View style={{flex: 1}}>
          <TouchableOpacity
            style={{marginLeft: 20, marginTop: 30}}
            onPress={() => props.navigation.goBack()}>
            <Image
              source={require('../../assets/Back.png')}
              style={{
                width: 26,
                height: 26,
                tintColor: 'black',
              }}
            />
          </TouchableOpacity>
          <View style={{marginLeft: 20, marginTop: 40}}>
            <View style={{flexDirection: 'row'}}>
              <Text style={{fontSize: 30, color: '#930AFF'}}>
                Saha İçi Yönetim Sistemi
              </Text>
              <Text style={{fontSize: 30, color: 'gray'}}>'ne</Text>
            </View>
            <Text
              style={{
                fontSize: 32,
                fontWeight: '400',
                color: '#2E2E2E',
                paddingTop: 10,
              }}>
              Kayıt ol
            </Text>
          </View>
        </View>
        <Formik initialValues={initialFormValues} onSubmit={handleFormSubmit}>
          {({values, handleChange, handleSubmit}) => (
            <>
              {/* INPUT START */}

              <View style={{flex: 1, paddingHorizontal: 20, marginTop: 40}}>
                <TextInput
                  onChangeText={handleChange('name')}
                  value={values.name}
                  style={styles.input}
                  placeholder="Ad"
                />
                <TextInput
                  onChangeText={handleChange('surname')}
                  value={values.surname}
                  style={styles.input}
                  placeholder="Soyad"
                />
                <TextInput
                  onChangeText={handleChange('phone')}
                  keyboardType="number-pad"
                  maxLength={10}
                  value={values.phone}
                  style={styles.input}
                  placeholder="Telefon numarası"
                />
                <TextInput
                  onChangeText={handleChange('usermail')}
                  value={values.usermail}
                  keyboardType="email-address"
                  autoCapitalize="none"
                  style={styles.input}
                  placeholder="E-posta adresi"
                />
                <TextInput
                  value={values.password}
                  onChangeText={handleChange('password')}
                  secureTextEntry
                  autoCapitalize="none"
                  style={styles.input}
                  placeholder="Şifreyi girin"
                />
                <TextInput
                  onChangeText={handleChange('repassword')}
                  secureTextEntry
                  value={values.repassword}
                  autoCapitalize="none"
                  style={styles.input}
                  placeholder="Şifreyi tekrar girin"
                />
              </View>
              {/* INPUT END */}

              {/* POPUP START */}
              <View style={{marginTop: 20}}>
                <View>
                  <Modal
                    animationType="slide"
                    transparent={true}
                    visible={privacyModal}
                    onRequestClose={() => {
                      Alert.alert('Modal has been closed.');
                      setPrivacyModal(!privacyModal);
                    }}>
                    <View
                      style={{
                        flex: 1,
                        justifyContent: 'center',
                        alignItems: 'center',
                        marginTop: 22,
                      }}>
                      <View style={styles.modalView}>
                        <Text style={styles.modalTextHeader}>
                          Gizlilik Sözleşmesi
                        </Text>
                        <Text>{privacyPolicy} </Text>
                        <Text
                          style={{
                            marginBottom: 15,
                            textAlign: 'center',
                            fontWeight: 600,
                          }}>
                          Şartlar ve Koşullar
                        </Text>
                        <Text>{termsAndConditionds} </Text>
                        <Pressable
                          style={styles.closeModalButton}
                          onPress={() => setPrivacyModal(!privacyModal)}>
                          <Text style={styles.closeModalText}>Kapat</Text>
                        </Pressable>
                      </View>
                    </View>
                  </Modal>
                  <Pressable onPress={() => setPrivacyModal(true)}>
                    <Text
                      style={{
                        color: 'black',
                        fontWeight: 'bold',
                        fontStyle: 'italic',
                        marginLeft: 30,
                        textDecorationLine: 'underline',
                      }}>
                      Gizlilik, Şartlar ve Koşullar sözleşmesini kabul ediyorum.
                    </Text>
                  </Pressable>
                </View>
              </View>
              {/* POPUP END */}

              <View style={styles.kayit_button}>
                <TouchableOpacity
                  loading={loading}
                  style={styles.registerButton}
                  onPress={handleSubmit}>
                  {loading ? (
                    <ActivityIndicator color="white" />
                  ) : (
                    <Text style={{color: 'black', fontSize: 20}}>Kayıt Ol</Text>
                  )}
                </TouchableOpacity>

                <View style={{alignItems: 'center'}}>
                  <Text
                    style={{
                      fontWeight: '400',
                      fontSize: 17,
                      color: '#2E2E2ECC',
                    }}>
                    Hesabın var mı?{' '}
                    <Text
                      onPress={() => props.navigation.navigate('LoginPage')}
                      style={{
                        fontWeight: '700',
                        fontSize: 18,
                        color: '#2E2E2ECC',
                      }}>
                      Giriş Yap
                    </Text>
                  </Text>
                </View>
              </View>
            </>
          )}
        </Formik>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Sign;
