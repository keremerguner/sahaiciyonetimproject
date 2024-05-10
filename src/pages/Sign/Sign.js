import React, {useState} from 'react';
import {Text, SafeAreaView, ActivityIndicator} from 'react-native';
import styles from './Sign.style';
import {Formik} from 'formik';
import authErrorMessageParser from '../../utils/authErrorMessageParser';
import {showMessage} from 'react-native-flash-message';
import auth from '@react-native-firebase/auth';
import database from '@react-native-firebase/database'; // Database modülünü import edin

import Input from '../../components/Input';
import Button from '../../components/Button';

const Sign = ({navigation}) => {
  const [loading, setLoading] = useState(false);

  const initialFormValues = {
    usermail: '',
    password: '',
    repassword: '',
    name: '', // Kullanıcı adı alanı
    surname: '', // Soyadı alanı
    phone: '', // Telefon numarası alanı
  };

  function handleLogin() {
    navigation.goBack();
  }

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
      <Text>Sign</Text>
      <Formik initialValues={initialFormValues} onSubmit={handleFormSubmit}>
        {({values, handleChange, handleSubmit}) => (
          <>
            <Input
              placeholder="Enter name"
              onChangeText={handleChange('name')}
              value={values.name}
            />
            <Input
              placeholder="Enter surname"
              onChangeText={handleChange('surname')}
              value={values.surname}
            />
            <Input
              placeholder="Enter phone number"
              onChangeText={handleChange('phone')}
              value={values.phone}
              keyboardType="phone-pad" // Klavye tipini telefon numarası için ayarla
            />
            <Input
              placeholder="    Enter mail"
              onChangeText={handleChange('usermail')}
              value={values.usermail}
              keyboardType="email-address"
            />
            <Input
              placeholder="    Enter password"
              onChangeText={handleChange('password')}
              value={values.password}
              isSecure
            />
            <Input
              placeholder="    Enter repassword"
              onChangeText={handleChange('repassword')}
              value={values.repassword}
              isSecure
            />
            <Button
              text="Sign Up"
              theme="primary"
              loading={loading}
              onPress={handleSubmit}
            />
          </>
        )}
      </Formik>
      <Button text="Geri" theme="secondary" onPress={handleLogin} />
    </SafeAreaView>
  );
};

export default Sign;
