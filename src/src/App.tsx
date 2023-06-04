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
import { MessageConsumer, MessageProvider } from './contexts/message_context';
import { AppProvider } from './contexts/app_context';
import { Route } from "./routes";
import { NavigationContainer } from '@react-navigation/native';
import { Provider as PaperProvider } from 'react-native-paper';

function App(): JSX.Element {
  return (
    <NavigationContainer>
      <AppProvider>
        <MessageProvider>
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
              <MessageConsumer>
                {({ message, containerAnim }) => {
                  console.log(JSON.stringify(message));
                  return <Animated.View style={[styles.messageContainer, { display: message ? 'flex' : 'none', opacity: containerAnim }]}>
                    <View style={message?.type ? styles.notificationPanel : styles.errorPanel}>
                      <Text style={message?.type ? styles.notificationMessage : styles.errorMessage}>{message?.message}</Text>
                    </View>
                  </Animated.View>;
                }}
              </MessageConsumer>
            </View>
          </PaperProvider>
        </MessageProvider>
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
  messageContainer: {
    position: 'absolute',
    bottom: 10,
    left: 0,
    right: 0,
  },
  notificationPanel: {
    backgroundColor: '#f0f0f0',
    borderRadius: 15,
    padding: 15,
    marginHorizontal: 30,
    marginVertical: 15,
  },
  errorPanel: {
    backgroundColor: '#f0f0f0',
    borderRadius: 15,
    padding: 15,
    marginHorizontal: 30,
    marginVertical: 15,
  },
  notificationMessage: {
    color: 'green',
  },
  errorMessage: {
    color: 'red',
  },
});

export default App;
