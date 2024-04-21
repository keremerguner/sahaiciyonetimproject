// In App.js in a new project

import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Login from './pages/Login/Login';
import Sign from './pages/Sign/Sign';
import auth from '@react-native-firebase/auth';

import FlashMessage from "react-native-flash-message";
import Home from './pages/Home';

const Stack = createNativeStackNavigator();

function App() {

  const [userSession, setUserSession] = React.useState(null);

  React.useEffect(() => {
    auth().onAuthStateChanged(user => {
      setUserSession(!!user)
    });
  }, [])

  const AuthStack = () => {
    return(
      <Stack.Navigator screenOptions={{ headerShown: false }} >
      <Stack.Screen name="LoginPage" component={Login} />
      <Stack.Screen name="SignPage" component={Sign} />
    </Stack.Navigator>
    )
  }


  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }} >
        {!userSession ? (
          <Stack.Screen name="AuthStack" component={AuthStack} />
        ): (
        <Stack.Screen name='HomePage' component={Home} />
        )}
        {/* <Stack.Screen name="SignPage" component={Sign} /> */}
      </Stack.Navigator>
      <FlashMessage position="top" /> 
    </NavigationContainer>
  );
}

export default App;