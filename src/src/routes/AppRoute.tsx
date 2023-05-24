import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { AppParamsList } from './ParamList';
import { LoginPage } from '../pages/LoginPage';
import { HomePage } from '../pages/HomePage';
import { TestPage } from '../pages/TestPage';
import { ConfigPage } from '../pages/ConfigPage';
import { ChangePasswordPage } from '../pages/ChangePasswordPage';

import ClientProfilePage from '../pages/ClientProfilePage';
import ProfessionalProfilePage from '../pages/ProfessionalProfilePage';
import ForgotPasswordScreen from '../pages/PassRecover';

const Stack = createNativeStackNavigator<AppParamsList>();

function AppRoute(): JSX.Element {
  return (
    <Stack.Navigator>
      <Stack.Screen name='Login' component={LoginPage} options={{ headerShown: false }} />
      <Stack.Screen name='Home' component={HomePage} options={{ headerShown: false }} />
      <Stack.Screen name="Test" component={TestPage} />
      <Stack.Screen name="ProfessionalProfile" component={ProfessionalProfilePage} options={{ headerShown: false }} />
      <Stack.Screen name="ClientProfile" component={ClientProfilePage} options={{ headerShown: false }} />
      <Stack.Screen name="Support" component={ConfigPage} options={{ headerShown: false }} />
      <Stack.Screen name="ChangePassword" component={ChangePasswordPage} options={{ headerShown: false }} />
      <Stack.Screen name="ForgotPasswordScreen" component={ForgotPasswordScreen} />
    </Stack.Navigator>
  );
}

export default AppRoute;