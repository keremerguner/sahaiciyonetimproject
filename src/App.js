// In App.js in a new project

import * as React from 'react';
import {Image, TouchableOpacity} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Login from './pages/Login/Login';
import Sign from './pages/Sign/Sign';
import auth from '@react-native-firebase/auth';

import FlashMessage from 'react-native-flash-message';
import Home from './pages/Home';
import Welcome from './pages/Welcome';
import Profile from './pages/profile';
import OrderStatusScreen from './pages/orderstatus/orderstatus';

const Stack = createNativeStackNavigator();

function App() {
  const [userSession, setUserSession] = React.useState(null);

  React.useEffect(() => {
    auth().onAuthStateChanged(user => {
      setUserSession(!!user);
    });
  }, []);

  const AuthStack = () => {
    return (
      <Stack.Navigator screenOptions={{headerShown: false}}>
        <Stack.Screen name="WelcomePage" component={Welcome} />
        <Stack.Screen name="LoginPage" component={Login} />
        <Stack.Screen name="SignPage" component={Sign} />
      </Stack.Navigator>
    );
  };

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{headerShown: false}}>
        {!userSession ? (
          <Stack.Screen
            name="AuthStack"
            component={AuthStack}
            options={{headerShown: false}}
          />
        ) : (
          <>
            <Stack.Screen
              name="SAHA İÇİ ÜRÜN YÖNETİM"
              component={Home}
              options={{
                headerStyle: {
                  backgroundColor: '#EAEDED', // Arka plan rengi
                },
                headerTitleStyle: {
                  color: 'black', // Mor renk
                },
                headerTitleAlign: 'center', // Başlığı ortalar
                headerLeft: () => (
                  <TouchableOpacity onPress={() => {}}>
                    <Image
                      source={require('./assets/images/profileIcon.png')}
                      style={{
                        width: 30,
                        height: 30,
                        marginRight: 10,
                        tintColor: 'black',
                      }}
                      screenOptions={{headerShown: false}}
                    />
                  </TouchableOpacity>
                ),
                headerRight: () => (
                  <TouchableOpacity onPress={() => auth().signOut()}>
                    <Image
                      source={require('./assets/images/logout.png')}
                      style={{
                        width: 30,
                        height: 30,
                        marginRight: 10,
                        tintColor: 'black',
                      }}
                      screenOptions={{headerShown: false}}
                    />
                  </TouchableOpacity>
                ),
              }}
            />
            <Stack.Screen
              name="ProfilePage"
              component={Profile}
              options={{headerShown: false}}
            />
                  <Stack.Screen name="OrderStatus" component={OrderStatusScreen} options={{title: 'Sipariş Durumları'}} />
          </>
        )}
      </Stack.Navigator>
      <FlashMessage position="top" />
    </NavigationContainer>
  );
}

export default App;
