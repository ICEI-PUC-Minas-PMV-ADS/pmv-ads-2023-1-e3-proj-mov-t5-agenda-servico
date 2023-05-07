import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { AppParamsList } from './ParamList';
import { LoginPage } from '../pages/LoginPage';
import { HomePage } from '../pages/HomePage';
import { TestPage } from '../pages/TestPage';
import ClientProfilePage from '../pages/ClientProfilePage';
import ProfessionalProfilePage from '../pages/ProfessionalProfilePage';




const Stack = createNativeStackNavigator<AppParamsList>();

function LoginRoute(): JSX.Element {

  return (

    <Stack.Navigator initialRouteName='Login'>
      <Stack.Screen name='Login' component={LoginPage} options={{ headerShown: false }} />
      <Stack.Screen name='Home' component={HomePage} options={{ headerShown: false }} />
      <Stack.Screen name="Test" component={TestPage} />
      <Stack.Screen name="ProfessionalProfile" component={ProfessionalProfilePage} />
      <Stack.Screen name="ClientProfile" component={ClientProfilePage} />
    </Stack.Navigator>

  );
}

export default LoginRoute;