import React, {useState} from 'react';
import {Text, View, SafeAreaView} from 'react-native';
import styles from './Login.style';
import {Formik} from 'formik';
import {showMessage} from 'react-native-flash-message';
import auth from '@react-native-firebase/auth';

import authErrorMessageParser from '../../utils/authErrorMessageParser';

import Input from '../../components/Input';
import Button from '../../components/Button';

const Login = ({navigation}) => {
  const [loading, setLoading] = useState(false);
  const initialFormValues = {
    usermail: '',
    password: '',
  };
  function handleSingUp() {
    navigation.navigate('SignPage');
  }

  async function handleFormSubmit(formValues) {
    try {
      setLoading(true);
      await auth().signInWithEmailAndPassword(
        formValues.usermail,
        formValues.password,
      );
      showMessage({
        message: 'Giriş Yapıldı',
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
      console.log(error);
    }
  }

  return (
    <SafeAreaView style={styles.container}>
      <Text>Login</Text>
      <Formik initialValues={initialFormValues} onSubmit={handleFormSubmit}>
        {({values, handleChange, handleSubmit}) => (
          <>
            <Input
              placeholder="    Enter mail"
              value={values.usermail}
              onChangeText={handleChange('usermail')}
              keyboardType="email-address"
            />
            <Input
              placeholder="    Enter password"
              value={values.password}
              onChangeText={handleChange('password')}
              isSecure
            />
            <Button text="Sign in" theme="primary" onPress={handleSubmit} loading={loading}  />
          </>
        )}
      </Formik>
      <Button text="Kayıt Ol" theme="secondary" onPress={handleSingUp} />
    </SafeAreaView>
  );
};

export default Login;
