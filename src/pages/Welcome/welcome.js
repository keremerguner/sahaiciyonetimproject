import React from 'react';
import {SafeAreaView, Text, Image, TouchableOpacity} from 'react-native';
import styles from './welcome.style';

const Welcome = props => {
  return (
    <SafeAreaView style={styles.container}>
      <SafeAreaView style={styles.imageContainer}>
        <Image
          source={require('../../assets/welcomeimages.png')}
          style={styles.image}
        />
      </SafeAreaView>
      <SafeAreaView style={styles.textContainer}>
        <Text style={styles.titleText}>Enigma</Text>
        <Text style={styles.subTitleText}>Farklı odalar,</Text>
        <Text style={styles.subTitleText}>Farklı muhabbetler...</Text>
        <SafeAreaView style={styles.buttonContainer}>
          <TouchableOpacity
            style={styles.loginButton}
            onPress={() => props.navigation.navigate('LoginPage')}>
            <Text style={styles.buttonText}>Giriş Yap</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.signUpButton}
            onPress={() => props.navigation.navigate('SignPage')}>
            <Text style={styles.buttonText}>Kayıt Ol</Text>
          </TouchableOpacity>
        </SafeAreaView>
      </SafeAreaView>
    </SafeAreaView>
  );
};

export default Welcome;
