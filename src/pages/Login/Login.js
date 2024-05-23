import React, {useState} from 'react';
import {
  Text,
  View,
  SafeAreaView,
  TextInput,
  TouchableOpacity,
  Image,
  ScrollView,
  ActivityIndicator,
} from 'react-native';
import styles from './Login.style';
import {Formik} from 'formik';
import {showMessage} from 'react-native-flash-message';
import auth from '@react-native-firebase/auth';

import authErrorMessageParser from '../../utils/authErrorMessageParser';

const Login = props => {
  const [loading, setLoading] = useState(false);
  const initialFormValues = {
    usermail: '',
    password: '',
  };
  function handleSignUp() {
    props.navigation.navigate('SignPage');
  }

  async function handleFormSubmit(formValues) {
    if (!formValues.usermail || !formValues.password) {
      showMessage({
        message: 'Email ve şifre alanlarını doldurunuz.',
        type: 'danger',
        icon: 'danger',
      });
      return; // Eğer bilgiler eksikse, fonksiyonu burada sonlandır.
    }

    try {
      setLoading(true);
      await auth().signInWithEmailAndPassword(
        formValues.usermail,
        formValues.password,
      );
      showMessage({
        message: 'Başarıyla giriş yapıldı.',
        icon: 'success',
        type: 'success',
      });
      setLoading(false);
    } catch (error) {
      showMessage({
        message: authErrorMessageParser(error.code),
        type: 'danger',
        icon: 'danger',
      });
      setLoading(false);
      // console.log(error);
    }
  }

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: 'white'}}>
      <ScrollView>
        <View style={styles.container}>
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => props.navigation.goBack()}>
            <Image
              source={require('../../assets/images/Back.png')}
              style={{
                width: 26,
                height: 26,
                tintColor: 'black',
              }}
            />
          </TouchableOpacity>

          <View style={styles.header}>
            <View style={styles.title}>
              <Text style={styles.mainTitle}>Saha İçi Yönetim Sistemi</Text>
              <Text style={styles.subTitle}>'ne</Text>
            </View>
            <Text style={styles.welcomeText}>Hoşgeldin.</Text>
          </View>
        </View>

        <Formik initialValues={initialFormValues} onSubmit={handleFormSubmit}>
          {({values, handleChange, handleSubmit}) => (
            <>
              <View style={{flex: 1, paddingHorizontal: 20, marginTop: 80}}>
                <Text
                  style={{fontWeight: '400', fontSize: 22, color: '#2E2E2ECC'}}>
                  Giriş Yap
                </Text>
                <TextInput
                  value={values.usermail}
                  autoCapitalize="none"
                  onChangeText={handleChange('usermail')}
                  keyboardType="email-address"
                  style={styles.input}
                  placeholder="Email"
                />
                <TextInput
                  value={values.password}
                  onChangeText={handleChange('password')}
                  secureTextEntry
                  autoCapitalize="none"
                  style={styles.input}
                  placeholder="Şifre"
                />
                <TouchableOpacity
                  onPress={() =>
                    showMessage({
                      message: 'ADMİNLE İLETİŞİME GEÇİN.',
                      icon: 'warning',
                      type: 'warning',
                    })
                  }>
                  <Text style={styles.forgotPassword}>Şifreni mi unuttun?</Text>
                </TouchableOpacity>
              </View>
              <View style={{flex: 1, marginHorizontal: 20, marginTop: 70}}>
                <TouchableOpacity
                  loading={loading}
                  style={styles.loginButton}
                  onPress={handleSubmit}>
                  {loading ? (
                    <ActivityIndicator color="white" />
                  ) : (
                    <Text style={{color: 'black', fontSize: 20}}>
                      Giriş Yap
                    </Text>
                  )}
                </TouchableOpacity>
                <View style={{alignItems: 'center'}}>
                  <Text style={styles.signUpText}>
                    Hesabın yok mu?{' '}
                    <Text onPress={handleSignUp} style={styles.signUpLink}>
                      Kayıt Ol
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

export default Login;
