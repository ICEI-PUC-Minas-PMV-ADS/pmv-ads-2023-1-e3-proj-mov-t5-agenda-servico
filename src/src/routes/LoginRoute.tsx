import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { AppParamsList } from '../@types/ParamList';
import { BackgroundColor, WhiteColor } from "../constants/colors";
import { LoginPage } from '../pages/LoginPage';
import { HomePage } from '../pages/HomePage';
import { WhatsEmail } from '../pages/WhatsEmail';
import { WhoYou } from '../pages/WhoYou'
import { AboutYou } from '../pages/AboutYou';
import { Password } from '../pages/ConfigPassword';
import { Category } from '../pages/ConfigCategory';
import { WhereWork } from '../pages/WhereWork';
import { Cep } from '../pages/ConfigCEP';
import { Address } from '../pages/ConfigAddress';
import { Opening } from '../pages/ConfigOpening';
import { Day } from '../pages/ConfigDay';
import { Interval } from '../pages/ConfigInterval'


const Stack = createNativeStackNavigator<AppParamsList>();

function LoginRoute(): JSX.Element {

  return (

    <Stack.Navigator initialRouteName='Day'>
      <Stack.Screen name='Login' component={LoginPage} options={{ headerShown: false }} />
      <Stack.Screen name='Home' component={HomePage} options={{ headerShown: false }} />
      <Stack.Screen name='Email' component={WhatsEmail} options={{
        title: 'Qual é o seu e-mail?',
        headerStyle: {
          backgroundColor: BackgroundColor
        },
        headerTintColor: WhiteColor

      }} />
      <Stack.Screen name='Who' component={WhoYou} options={{
        title: '',
        headerStyle: {
          backgroundColor: BackgroundColor
        },
        headerTintColor: WhiteColor
      }} />
      <Stack.Screen name='About' component={AboutYou} options={{
        title: 'Sobre você',
        headerStyle: {
          backgroundColor: BackgroundColor
        },
        headerTintColor: WhiteColor
      }} />
      <Stack.Screen name='Password' component={Password} options={{
        title: 'Configuração de senha',
        headerStyle: {
          backgroundColor: BackgroundColor
        },
        headerTintColor: WhiteColor
      }} />
      <Stack.Screen name='Category' component={Category} options={{
        title: 'Que tipo de negócio você tem?',
        headerStyle: {
          backgroundColor: BackgroundColor
        },
        headerTintColor: WhiteColor
      }} />
      <Stack.Screen name='WhereWork' component={WhereWork} options={{
        title: 'Onde você trabalha?',
        headerStyle: {
          backgroundColor: BackgroundColor
        },
        headerTintColor: WhiteColor
      }} />
      <Stack.Screen name='CEP' component={Cep} options={{
        title: 'Confirme seu endereço',
        headerStyle: {
          backgroundColor: BackgroundColor
        },
        headerTintColor: WhiteColor
      }} />
      <Stack.Screen name='Address' component={Address} options={{
        title: 'Confirme seu endereço',
        headerStyle: {
          backgroundColor: BackgroundColor
        },
        headerTintColor: WhiteColor
      }} />
      <Stack.Screen name='Opening' component={Opening} options={{
        title: 'Seu horário de funcionamento',
        headerStyle: {
          backgroundColor: BackgroundColor
        },
        headerTintColor: WhiteColor
      }} />

      <Stack.Screen name='Day' component={Day} options={{
        title: 'Segunda-Feira',
        headerStyle: {
          backgroundColor: BackgroundColor
        },
        headerTintColor: WhiteColor
      }} />
      <Stack.Screen name='Interval' component={Interval} options={{
        title: 'Segunda-Feira * Intervalo',
        headerStyle: {
          backgroundColor: BackgroundColor
        },
        headerTintColor: WhiteColor
      }} />
    </Stack.Navigator>

  );
}

export default LoginRoute;