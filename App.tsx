import * as React from 'react';
import {Text, View, StyleSheet, SafeAreaView, Button} from 'react-native';
import database from '@react-native-firebase/database';

const App = () => {
  const dbGoruntule = () => {
    const referance = database().ref('car/');
    referance.once('value').then(snapshot => {
      console.log('User data: ', snapshot.val());
    });
  };

  const dbGoruntuleGuncelle = () => {
    const referance = database().ref('car/');
    referance.on('value', snapshot => {
      console.log('User data: ', snapshot.val());
    });
  };

  const pushDb = () => {
    const referance = database().ref('car/');

    referance.push({
      model: 'Passat',
      fiyat: '1.350.000',
      sene: '2019',
    });
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text>App</Text>
      <Button title="DB Görüntüle" onPress={dbGoruntule}></Button>
      <Button
        title="DB Görüntüle ve Anlık Güncelle"
        onPress={dbGoruntuleGuncelle}></Button>
      <Button title="Push DB" onPress={pushDb}></Button>
    </SafeAreaView>
  );
};

export default App;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
