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
      <Stack.Navigator>
        {!userSession ? (
          <Stack.Screen
            name="AuthStack"
            component={AuthStack}
            options={{headerShown: false}}
          />
        ) : (
          <Stack.Screen
            name="Ana Sayfa"
            component={Home}
            options={{
              headerTitleAlign: 'center', // Başlığı ortalar
              headerRight: () => (
                <TouchableOpacity onPress={() => auth().signOut()}>
                  <Image
                    source={require('./assets/logout.png')}
                    style={{width: 30, height: 30, marginRight: 10}}
                    screenOptions={{headerShown: true}}
                  />
                </TouchableOpacity>
              ),
            }}
          />
        )}
        {/* <Stack.Screen name="SignPage" component={Sign} /> */}
      </Stack.Navigator>
      <FlashMessage position="top" />
    </NavigationContainer>
  );
}

export default App;
