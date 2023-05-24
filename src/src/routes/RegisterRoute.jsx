import React from 'react';
import { BackgroundColor, WhiteColor } from "../constants/colors";
import { WhatsEmail } from '../pages/WhatsEmail';
import { WhoYou } from '../pages/WhoYou'
import { AboutYou } from '../pages/AboutYou';
import { Password } from '../pages/ConfigPassword';
import { WhereWork } from '../pages/WhereWork';
import { Cep } from '../pages/ConfigCEP';
import { Address } from '../pages/ConfigAddress';
import { Opening } from '../pages/ConfigOpening';
import { Day } from '../pages/ConfigDay';
import { Interval } from '../pages/ConfigInterval';
import { DisplacementFee } from '../pages/DisplacementFee';
import { Services } from '../pages/ConfigServices';
import { ServiceDetails } from '../pages/ServiceDetails';
import { TestRegister } from '../pages/newRegisterTest';
import { createNativeStackNavigator } from '@react-navigation/native-stack'





export default function RegisterRoute() {
  const Stack = createNativeStackNavigator();
  return (

    <Stack.Navigator initialRouteName='Email'>

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

      <Stack.Screen name='DisplacementFee' component={DisplacementFee} options={{
        title: 'Qual é a sua taxa de deslocamento?',
        headerStyle: {
          backgroundColor: BackgroundColor
        },
        headerTintColor: WhiteColor
      }} />

      <Stack.Screen name='Services' component={Services} options={{
        title: 'Comece a adicionar serviços',
        headerStyle: {
          backgroundColor: BackgroundColor
        },
        headerTintColor: WhiteColor
      }} />

      <Stack.Screen name='ServiceDetails' component={ServiceDetails} options={{
        title: 'Detalhes do serviço',
        headerStyle: {
          backgroundColor: BackgroundColor
        },
        headerTintColor: WhiteColor
      }} />


    </Stack.Navigator>

  );
}

