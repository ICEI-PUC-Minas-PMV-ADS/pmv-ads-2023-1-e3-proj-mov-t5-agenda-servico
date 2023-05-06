import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { AppParamsList } from './ParamList';
import { LoginPage } from '../pages/LoginPage';
import { HomePage } from '../pages/HomePage';




const Stack = createNativeStackNavigator<AppParamsList>();

function LoginRoute(): JSX.Element {

  return (

    <Stack.Navigator initialRouteName='Login'>
      <Stack.Screen name='Login' component={LoginPage} options={{ headerShown: false }} />
      <Stack.Screen name='Home' component={HomePage} options={{ headerShown: false }} />
    </Stack.Navigator>

  );
}

export default LoginRoute;