import React from 'react';

import {
  SafeAreaView,
  StatusBar,
  StyleSheet,
  View,
  Text,
  Animated,
} from 'react-native';

import {createNativeStackNavigator} from '@react-navigation/native-stack';

import {FirebaseProvider} from './contexts/firebase_context';

import {NavigationContainer} from '@react-navigation/native';

import {BackgroundColor} from './constants/colors';

import {AppParamsList} from './ParamList';

import {LoginPage} from './pages/LoginPage';

import {HomePage} from './pages/HomePage';
import {ErrorConsumer, ErrorProvider} from './contexts/error_context';
import {AppContext, AppProvider} from './contexts/app_context';
import {TestPage} from './pages/TestPage';

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
      <AppProvider>
        <FirebaseProvider>
          <ErrorProvider>
            <View style={styles.rootContainer}>
              <SafeAreaView style={styles.safeContainer}>
                <StatusBar
                  barStyle={'light-content'}
                  backgroundColor={BackgroundColor}
                />

                <View style={styles.pageContainer}>
                  <Stack.Navigator
                    initialRouteName="Test"
                    screenOptions={{headerShown: false}}>
                    <Stack.Screen name="Login" component={LoginPage} />
                    <Stack.Screen name="Home" component={HomePage} />
                    <Stack.Screen name="Test" component={TestPage} />
                  </Stack.Navigator>
                </View>
              </SafeAreaView>

              <ErrorConsumer>
                {context => (
                  <Animated.View
                    style={[
                      styles.errorContainer,
                      {
                        display: context.errorMessage ? 'flex' : 'none',
                        opacity: context.containerAnim,
                      },
                    ]}>
                    <View style={styles.errorPanel}>
                      <Text style={styles.errorMessage}>
                        {context.errorMessage}
                      </Text>
                    </View>
                  </Animated.View>
                )}
              </ErrorConsumer>
            </View>
          </ErrorProvider>
        </FirebaseProvider>
      </AppProvider>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  rootContainer: {
    flex: 1,
    position: 'relative',
  },
  safeContainer: {
    flex: 1,
  },
  pageContainer: {
    flex: 1,
  },
  errorContainer: {
    position: 'absolute',
    bottom: 10,
    left: 0,
    right: 0,
  },
  errorPanel: {
    backgroundColor: '#f0f0f0',
    borderRadius: 15,
    padding: 15,
    marginHorizontal: 30,
    marginVertical: 15,
  },
  errorMessage: {
    color: 'red',
  },
});

export default App;
