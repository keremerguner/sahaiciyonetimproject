import React, {useState} from 'react';
import {SafeAreaView, Text, Button} from 'react-native';
import auth from '@react-native-firebase/auth';

const App = () => {
  const kayıtOl = () => {
    auth()
      .createUserWithEmailAndPassword('kerem@gm.com', 'kerem123')
      .then(responsem => {
        console.log('Kayıt olundu: ', responsem);
      })
      .catch(hata => {
        console.log('cathe girdi', hata);
        setFirebaseHata(hata.message);
      });
  };

  const girisYap = () => {
    auth()
      .signInWithEmailAndPassword('kerem@gm.com', 'kerem123')
      .then(responsGiris => {
        console.log('giris yaptı: ', responsGiris);
      })
      .catch(hataGiris => {
        console.log('Hata: ', hataGiris);
        setFirebaseHata(hataGiris.message);
      });
  };

  const cikisYap = () => {
    auth()
      .signOut()
      .then(cikisThen => {
        console.log('Cikis yaptı', cikisThen);
        setAnlikKisi(''); // Çıkış yapınca anlık kişiyi temizle
      })
      .catch(cikisCatch => {
        console.log('CikisCatch', cikisCatch);
        setFirebaseHata(cikisCatch.message);
      });
  };

  const [anlikKisi, setAnlikKisi] = useState('');
  const [firebaseHata, setFirebaseHata] = useState();

  const aktifKullanici = () => {
    const anlikUser = auth().currentUser;
    if (anlikUser) {
      // Eğer anlikUser.email null ise boş bir string ata, değilse anlikUser.email değerini kullan
      setAnlikKisi(anlikUser.email ? anlikUser.email : '');
      console.log('Aktif kullanıcı:', anlikUser.email);
    } else {
      setAnlikKisi('Kullanıcı giriş yapmamış.');
      console.log('Kullanıcı giriş yapmamış.');
    }
  };

  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: 'azure',
        alignItems: 'center',
        justifyContent: 'center',
      }}>
      <Text>Saha ici yonetim project</Text>
      <Button title="Kayıt Ol" onPress={kayıtOl}></Button>
      <Button title="Giriş Yap" onPress={girisYap}></Button>
      <Button title="Çıkış yap" onPress={cikisYap}></Button>
      <Button title="Aktif Kullanici" onPress={aktifKullanici}></Button>
      {/* Anlık kullanıcıyı göster */}
      <Text>-{anlikKisi}-</Text>
      <Text>-{firebaseHata}-</Text>
    </SafeAreaView>
  );
};
export default App;

const res = {
  additionalUserInfo: {
    isNewUser: false,
    profile: null,
    providerId: 'password',
    username: null,
  },
  user: {
    displayName: null,
    email: 'kerem@gm.com',
    emailVerified: false,
    isAnonymous: false,
    metadata: [Object],
    multiFactor: [Object],
    phoneNumber: null,
    photoURL: null,
    providerData: [Array],
    providerId: 'firebase',
    refreshToken:
      'AMf-vBy6WJDYxOVgGDiH1ZaTe3kbdHQzmmYp99drJIJq3SaL133SAi-IsdBt22oE44-Tr2hZsJeIIqnNqaXOX5CcgZlrxWtJWr7JyxX-9lRRSF5BaELa5uuvGIiLjtCQZs1-DxeyDz197nVVL4lK7QUA2rtMThtzKdtkB8_B87PmdsniD4N4QXe27mE8gfD-E3pbjDSWzg8h2Ju-0jhhLcbQtnilJIEB3w',
    tenantId: null,
    uid: 'cwD6n2PWH5fkSbxyQNsPtk8tg8a2',
  },
};
