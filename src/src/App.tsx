import React from 'react';

import {
  SafeAreaView,
  StatusBar,
  StyleSheet,
  View,
} from 'react-native';

import { createNativeStackNavigator } from '@react-navigation/native-stack'

import { FirebaseProvider } from './contexts/firebase_context';

import { NavigationContainer } from '@react-navigation/native';

import { BackgroundColor } from './constants/colors';

import { AppParamsList } from './ParamList';

import { LoginPage } from './pages/LoginPage';

import { HomePage } from './pages/HomePage';



/***
 * Stack Navigator
 */

const Stack = createNativeStackNavigator<AppParamsList>();

/***
 * App
 */

function App(): JSX.Element {
  return (
    <NavigationContainer>
      <FirebaseProvider>
        <View style={styles.rootContainer}>
          <SafeAreaView style={styles.safeContainer}>
            <StatusBar
              barStyle={'light-content'}
              backgroundColor={BackgroundColor}
            />
            
            <View style={styles.pageContainer}>
              <Stack.Navigator initialRouteName='Login' screenOptions={{ headerShown: false }}>
                <Stack.Screen name='Login' component={LoginPage} />
                <Stack.Screen name='Home' component={HomePage} />
              </Stack.Navigator>
            </View>
          </SafeAreaView>
        </View>
      </FirebaseProvider>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  rootContainer: {
    flex: 1
  },
  safeContainer: {
    flex: 1,
  },
  pageContainer: {
    flex: 1,
  }
});

export default App;
