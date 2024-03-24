import React, {useState} from 'react';
import {Text, SafeAreaView} from 'react-native';
import styles from './Sign.style';
import {Formik} from 'formik';
import authErrorMessageParser from '../../utils/authErrorMessageParser';
import { showMessage } from 'react-native-flash-message';
import auth from '@react-native-firebase/auth';

import Input from '../../components/Input';
import Button from '../../components/Button';

const Sign = ({navigation}) => {

  const [loading, setLoading] = useState(false)

  const initialFormValues = {
    usermail: '',
    password: '',
    repassword: '',
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

    try {
      await auth().createUserWithEmailAndPassword(
        formValues.usermail,
        formValues.password,
      );
      setLoading(false);

      showMessage({
        message: 'Kullanıcı oluşturuldu',
        type: 'success',
        icon: 'success',
      });
      // navigation.navigate('LoginPage');
    } catch (error) {
      showMessage({
        message: authErrorMessageParser(error.code),
        type: 'danger',
        icon: 'danger',
      });
      setLoading(false);
      console.log("kullanıcı olusmadı: ",error)
    }
    console.log(formValues);
  }

  return (
    <SafeAreaView style={styles.container}>
      <Text>Sign</Text>
      <Formik initialValues={initialFormValues} onSubmit={handleFormSubmit}>
        {({values, handleChange, handleSubmit}) => (
          <>
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
            <Button text="Sign Up" theme="primary" loading={loading} onPress={handleSubmit} />
          </>
        )}
      </Formik>
      <Button text="Geri" theme="secondary" onPress={handleLogin} />
    </SafeAreaView>
  );
};

export default Sign;
