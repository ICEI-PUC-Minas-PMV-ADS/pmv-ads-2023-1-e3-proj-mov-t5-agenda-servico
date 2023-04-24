import React from 'react';
import EncryptedStorage from 'react-native-encrypted-storage';

import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { View, Text, TouchableWithoutFeedback, ActivityIndicator, StyleSheet } from 'react-native';
import { AppParamsList } from '../ParamList';
import { KEY_USERDATA } from '../constants/app';
import { useAppContext } from '../contexts/app_context';
import { BackgroundColor } from '../constants/colors';

/***
 * HomePage
 */

export function HomePage({
  navigation,
}: NativeStackScreenProps<AppParamsList, 'Home'>) {
  const [loadState, setLoadState] = React.useState(false);
  const appContext = useAppContext();

  React.useLayoutEffect(() => {
    if (!appContext?.user) {
      EncryptedStorage.getItem(KEY_USERDATA).then(userData => {
        if (userData) {
          appContext?.setUser(JSON.parse(userData));
        } else {
          navigation?.replace('Login', {});
        }
        setLoadState(true);
      });
    } else {
      setLoadState(true);
    }
  }, []);

  return (
    !loadState
      ? <></>
      : <View>
        <TouchableWithoutFeedback
          onPress={() => {
            navigation.navigate({ name: 'Login', params: {} });
          }}>
          <Text>Click me!</Text>
        </TouchableWithoutFeedback>
      </View>
  );
}


const style = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: BackgroundColor,
  }
});