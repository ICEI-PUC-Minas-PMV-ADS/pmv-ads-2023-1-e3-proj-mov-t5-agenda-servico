import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { AppParamsList } from './ParamList';
import { LoginPage } from '../pages/LoginPage';
import { HomePage } from '../pages/HomePage';
import { TestPage } from '../pages/TestPage';
import { ConfigPage } from '../pages/ConfigPage';
import { SupportPage } from '../pages/SupportPage';
import { ChangePasswordPage } from '../pages/ChangePasswordPage';
import { MapPage } from '../pages/MapPage';

import ClientProfilePage from '../pages/ClientProfilePage';
import ProfessionalProfilePage from '../pages/ProfessionalProfilePage';
import ForgotPasswordScreen from '../pages/PassRecover';
import BookingPage from '../pages/BookingPage';

const Stack = createNativeStackNavigator<AppParamsList>();

function AppRoute(): JSX.Element {
  return (
    <Stack.Navigator initialRouteName='Login'>
      <Stack.Screen name='Login' component={LoginPage} options={{ headerShown: false }} />
      <Stack.Screen name='Home' component={HomePage} options={{ headerShown: false }} />
      <Stack.Screen name="Test" component={TestPage} />
      <Stack.Screen name="ProfessionalProfile" component={ProfessionalProfilePage} options={{ headerShown: false }} />
      <Stack.Screen name="ClientProfile" component={ClientProfilePage} options={{ headerShown: false }} />
      <Stack.Screen name="Config" component={ConfigPage} options={{ headerShown: false }} />
      <Stack.Screen name="Support" component={SupportPage} options={{ headerShown: false }} />
      <Stack.Screen name="ChangePassword" component={ChangePasswordPage} options={{ headerShown: false }} />
      <Stack.Screen name='BookingPage' component={BookingPage} options={{ headerShown: false }} />
      <Stack.Screen name="ForgotPasswordScreen" component={ForgotPasswordScreen} />
      <Stack.Screen name="MapPage" component={MapPage} options={{ headerShown: false }} />
    </Stack.Navigator>
  );
}

export default AppRoute;