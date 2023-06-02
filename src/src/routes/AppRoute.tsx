import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { BackgroundColor, WhiteColor } from "../constants/colors";
import { AppParamsList } from './ParamList';
import { LoginPage } from '../pages/LoginPage';
import { HomePage } from '../pages/HomePage';
import { TestPage } from '../pages/TestPage';
import { ConfigPage } from '../pages/ConfigPage';
import { SupportPage } from '../pages/SupportPage';
import { ChangePasswordPage } from '../pages/ChangePasswordPage';
import { Profile } from '../pages/Profile';
import { Services } from '../pages/Services';
import { UpdateServices } from '../pages/UpdateServices';
import { Opening } from '../pages/Opening';
import { Day } from '../pages/Day';
import { Intervalo } from '../pages/Interval';
import { WhereWork } from '../pages/UpdateWhere';
import { Fees } from '../pages/Fees';
import { Address } from '../pages/UpdateAddress';
import { Cep } from '../pages/UpdateCEP';

import ClientProfilePage from '../pages/ClientProfilePage';
import ProfessionalProfilePage from '../pages/ProfessionalProfilePage';
import ForgotPasswordScreen from '../pages/PassRecover';
import BookingPage from '../pages/BookingPage';

const Stack = createNativeStackNavigator<AppParamsList>();

function AppRoute(): JSX.Element {
  return (
    <Stack.Navigator>
      <Stack.Screen name='Login' component={LoginPage} options={{ headerShown: false }} />
      <Stack.Screen name='Home' component={HomePage} options={{ headerShown: false }} />
      <Stack.Screen name="Test" component={TestPage} />
      <Stack.Screen name='Profile' component={Profile} options={{ headerShown: false }} />
      <Stack.Screen name="ProfessionalProfile" component={ProfessionalProfilePage} options={{ headerShown: false }} />
      <Stack.Screen name="ClientProfile" component={ClientProfilePage} options={{ headerShown: false }} />
      <Stack.Screen name="Config" component={ConfigPage} options={{ headerShown: false }} />
      <Stack.Screen name="Support" component={SupportPage} options={{ headerShown: false }} />
      <Stack.Screen name="ChangePassword" component={ChangePasswordPage} options={{ headerShown: false }} />
      <Stack.Screen name='BookingPage' component={BookingPage} options={{ headerShown: false }} />
      <Stack.Screen name="ForgotPasswordScreen" component={ForgotPasswordScreen} />
      <Stack.Screen name='Services' component={Services} options={{
        title: 'Serviços',
        headerStyle: {
          backgroundColor: BackgroundColor
        },
        headerTintColor: WhiteColor
      }} />
      <Stack.Screen name='UpdateServices' component={UpdateServices} options={{
        title: 'Detalhes do serviço',
        headerStyle: {
          backgroundColor: BackgroundColor
        },
        headerTintColor: WhiteColor
      }} />
      <Stack.Screen name='Opening' component={Opening} options={{
        title: 'Horário de funcionamento',
        headerStyle: {
          backgroundColor: BackgroundColor
        },
        headerTintColor: WhiteColor
      }} />
      <Stack.Screen name='Day' component={Day} options={{
        headerStyle: {
          backgroundColor: BackgroundColor
        },
        headerTintColor: WhiteColor
      }} />
      <Stack.Screen name='Intervalo' component={Intervalo} options={{
        headerStyle: {
          backgroundColor: BackgroundColor
        },
        headerTintColor: WhiteColor
      }} />
      <Stack.Screen name='Where' component={WhereWork} options={{
        title: 'Onde você trabalha?',
        headerStyle: {
          backgroundColor: BackgroundColor
        },
        headerTintColor: WhiteColor
      }} />
      <Stack.Screen name='Fees' component={Fees} options={{
        title: 'Taxa de deslocamento',
        headerStyle: {
          backgroundColor: BackgroundColor
        },
        headerTintColor: WhiteColor
      }} />
      <Stack.Screen name='Address' component={Address} options={{
        title: 'Atualize aqui o seu endereço',
        headerStyle: {
          backgroundColor: BackgroundColor
        },
        headerTintColor: WhiteColor
      }} />
      <Stack.Screen name='CEP' component={Cep} options={{
        title: 'Digite o CEP da sua rua',
        headerStyle: {
          backgroundColor: BackgroundColor
        },
        headerTintColor: WhiteColor
      }} />
    </Stack.Navigator>

  );
}

export default AppRoute;