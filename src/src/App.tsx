import React from 'react';
import {
  SafeAreaView,
  StatusBar,
  StyleSheet,
  View,
  Text,
  Animated,
} from 'react-native';

import { BackgroundColor } from './constants/colors';
import { ErrorConsumer, ErrorProvider } from './contexts/error_context';
import { AppConsumer, AppProvider } from './contexts/app_context';
import { Route } from "./routes";
import { NavigationContainer } from '@react-navigation/native';
import { Provider as PaperProvider } from 'react-native-paper';

function App(): JSX.Element {
  return (

    <NavigationContainer>
      <AppProvider>
        <ErrorProvider>
          <PaperProvider>
            <View style={styles.rootContainer}>
              <SafeAreaView style={styles.safeContainer}>
                <StatusBar
                  barStyle={'light-content'}
                  backgroundColor={BackgroundColor}
                />

                <View style={styles.pageContainer}>
                  <Route />
                </View>
              </SafeAreaView>
              <ErrorConsumer>
                {context => <Animated.View style={[styles.errorContainer, { display: context.errorMessage ? 'flex' : 'none', opacity: context.containerAnim }]}>
                  <View style={styles.errorPanel}>
                    <Text style={styles.errorMessage}>{context.errorMessage}</Text>
                  </View>
                </Animated.View>}
              </ErrorConsumer>
            </View>
          </PaperProvider>
        </ErrorProvider>
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
    backgroundColor: BackgroundColor,
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
