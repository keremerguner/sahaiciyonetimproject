// In App.js in a new project

import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Login from './pages/Login/Login';
import Sign from './pages/Sign/Sign';

import FlashMessage from "react-native-flash-message";

const Stack = createNativeStackNavigator();

function App() {

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
        <Stack.Screen name="AuthStack" component={AuthStack} />
        {/* <Stack.Screen name="SignPage" component={Sign} /> */}
      </Stack.Navigator>
      <FlashMessage position="top" /> 
    </NavigationContainer>
  );
}

export default App;