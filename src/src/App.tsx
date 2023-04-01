import React from 'react';

import {
  SafeAreaView,
  StatusBar,
  StyleSheet,
  View,
} from 'react-native';

import { FirebaseProvider } from './contexts/firebase_context';

import { NavigationContainer } from '@react-navigation/native';

import { BackgroundColor } from './constants/colors';

import { LoginPage } from './pages/LoginPage';

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
              <LoginPage />
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
