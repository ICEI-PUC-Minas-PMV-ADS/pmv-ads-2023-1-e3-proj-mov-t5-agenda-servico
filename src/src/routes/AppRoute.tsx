import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { BackgroundColor, WhiteColor } from "../constants/colors";
import { AppParamsList } from './ParamList';
import { LoginPage } from '../pages/LoginPage';
import { HomePage } from '../pages/home_page';
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
import { MapPage } from '../pages/MapPage';
import { ChatPage } from '../pages/chat_page';

import ClientProfilePage from '../pages/ClientProfilePage';
import ProfessionalProfilePage from '../pages/ProfessionalProfilePage';
import ForgotPasswordScreen from '../pages/PassRecover';
import { ScheduleServiceCepPage } from '../pages/schedule_service_pages/schedule_service_start_cep';
import BookingPage from './../pages/schedule_service_pages/BookingPage';
import { ScheduleServiceReducer } from '../pages/schedule_service_pages/schedule_service_reducer';
import { ScheduleServiceProvider } from '../pages/schedule_service_pages/schedule_service_context';
import { RouteProp, useRoute } from '@react-navigation/native';
import { ScheduleServiceConfirmPage } from '../pages/schedule_service_pages/schedule_service_confirm';
import { CategorySelectorPage } from '../pages/CategorySelectorPage';

const Stack = createNativeStackNavigator<AppParamsList>();

function AppRoute(): JSX.Element {
  return (
    <Stack.Navigator initialRouteName='Login'>
      <Stack.Screen name='Login' component={LoginPage} options={{ headerShown: false }} />
      <Stack.Screen name='Home' component={HomePage} options={{ headerShown: false }} />

      <Stack.Screen name="Test" component={TestPage} />
      <Stack.Screen name='Profile' component={Profile} options={{ headerShown: false }} />
      <Stack.Screen name="ProfessionalProfile" component={ProfessionalProfilePage} options={{ headerShown: false }} />
      <Stack.Screen name="ClientProfile" component={ClientProfilePage} options={{ headerShown: false }} />
      <Stack.Screen name="Config" component={ConfigPage} options={{ headerShown: false }} />
      <Stack.Screen name="Support" component={SupportPage} options={{ headerShown: false }} />
      <Stack.Screen name="ChangePassword" component={ChangePasswordPage} options={{ headerShown: false }} />
      <Stack.Screen name="ForgotPasswordScreen" component={ForgotPasswordScreen} />
      <Stack.Screen name="BookingRoutes" component={BookingRoutes} options={{ headerShown: false }} />
      <Stack.Screen name="CategorySelector" component={CategorySelectorPage} options={{
        title: 'Categorias',
        headerStyle: {
          backgroundColor: BackgroundColor
        },
        headerTintColor: WhiteColor
      }} />
      <Stack.Screen name="ChatPage" component={ChatPage} options={{
        title: 'Chat',
        headerStyle: {
          backgroundColor: BackgroundColor
        },
        headerTintColor: WhiteColor
      }} />
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
      <Stack.Screen name="MapPage" component={MapPage} options={{ headerShown: false }} />
    </Stack.Navigator>

  );
}

const BookingRoutes = () => {
  const [state, dispatch] = React.useReducer(ScheduleServiceReducer, {});
  const bookingStack = createNativeStackNavigator<AppParamsList>();
  const route = useRoute<RouteProp<AppParamsList, 'BookingRoutes'>>();
  const id = route?.params.id;

  return (
    <ScheduleServiceProvider value={{ state, dispatch }}>
      <bookingStack.Navigator initialRouteName='BookingPage'>
        <bookingStack.Screen name='BookingPage' initialParams={{ id }} component={BookingPage} options={{ headerShown: false }} />
        <bookingStack.Screen name='ScheduleServiceCepPage' component={ScheduleServiceCepPage} options={{ headerShown: false }} />
        <bookingStack.Screen name='ScheduleServiceConfirmPage' component={ScheduleServiceConfirmPage} options={{ headerShown: false }} />
      </bookingStack.Navigator>
    </ScheduleServiceProvider>
  );
};

export default AppRoute;