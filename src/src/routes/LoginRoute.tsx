import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { AppParamsList } from '../@types/ParamList';
import { LoginPage } from '../pages/LoginPage';
import { HomePage } from '../pages/HomePage';
import { WhatsEmail } from '../pages/WhatsEmail';
import { WhoYou } from '../pages/WhoYou'
import { AboutYou } from '../pages/AboutYou';
import { Password } from '../pages/ConfigPassword';
import { Category } from '../pages/ConfigCategory';
import { WhereWork } from '../pages/WhereWork';
import { BackgroundColor, WhiteColor } from "../constants/colors";

const Stack = createNativeStackNavigator<AppParamsList>();

function LoginRoute(): JSX.Element {

  return (

    <Stack.Navigator initialRouteName='Login'>
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
    </Stack.Navigator>

  );
}

export default LoginRoute;