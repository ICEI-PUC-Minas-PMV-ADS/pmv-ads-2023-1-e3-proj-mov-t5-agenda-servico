import { NOT_INITIALIZED_ERROR } from '@react-navigation/core/lib/typescript/src/createNavigationContainerRef';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React, { useState } from 'react';
import {
  Alert,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { PrimaryButton } from '../components/Buttons';
import { BackgroundColor } from '../constants/colors';
import { IcBackArrow, IcFrontArrow } from '../constants/icons';
import { AppParamsList } from '../routes/AppParamList';
import EncryptedStorage from 'react-native-encrypted-storage';
import { KEY_USERDATA } from '../constants/app';
import { useAppContext } from '../contexts/app_context';

export function ConfigPage({
  navigation,
}: NativeStackScreenProps<AppParamsList, 'Config'>) {
  const [isEnabled, setIsEnabled] = useState(false);
  const appContext = useAppContext();
  return (
    <View style={{ flex: 1, backgroundColor: 'blue' }}>
      <View style={{ flex: 1 }}>
        <ScrollView
          style={styles.scrollContainer}
          contentInsetAdjustmentBehavior="automatic">
          <View style={styles.container}>
            <View style={{ marginTop: 20, marginBottom: 15 }}>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'flex-start',
                }}>
                <TouchableOpacity
                  onPress={() => {
                    navigation.pop();
                  }}
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    marginBottom: 5,
                  }}>
                  <View style={{ marginLeft: 12 }}>
                    <IcBackArrow />
                  </View>
                  <View style={{ marginLeft: 10 }}>
                    <Text style={{ color: '#FDFDFD', fontSize: 18 }}>Voltar</Text>
                  </View>
                </TouchableOpacity>
              </View>
            </View>
            <View style={{ flex: 1 }}>
              <Text
                style={{
                  color: '#FDFDFD',
                  fontSize: 28,
                  fontWeight: 'bold',
                  marginLeft: 19,
                  marginBottom: 10,
                }}>
                Configurações
              </Text>
            </View>

            <View style={{ alignItems: 'center', width: '100%' }}>
              <View style={{ width: '85%', marginTop: 20 }}>
                <View>
                  <TouchableOpacity
                    style={styles.settingsButton}
                    onPress={() => {
                      navigation.navigate('ChangePassword', {});
                    }}>
                    <Text style={{ color: '#FFFFFF' }}>Mudar senha</Text>
                    <IcFrontArrow />
                  </TouchableOpacity>
                </View>
                <View>
                  <TouchableOpacity style={styles.settingsButton}>
                    <Text style={{ color: '#FFFFFF' }}>Atualizar App</Text>
                    <IcFrontArrow />
                  </TouchableOpacity>
                </View>
                <View>
                  <TouchableOpacity
                    style={styles.settingsButton}
                    onPress={() => {
                      navigation.navigate('Support', {});
                    }}>
                    <Text style={{ color: '#FFFFFF' }}>Suporte</Text>
                    <IcFrontArrow />
                  </TouchableOpacity>
                </View>
                <View>
                  <TouchableOpacity
                    style={styles.settingsButton}
                    onPress={() => {
                      Alert.alert(
                        'App',
                        'Você deseja realmente sair da aplicação?',
                        [
                          {
                            text: "Sim",
                            onPress: () => {
                              EncryptedStorage.removeItem(
                                KEY_USERDATA
                              ).then(() => {
                                appContext.setUser(undefined);
                                navigation.reset({
                                  index: 0,
                                  routes: [{ name: 'Login' }]
                                });
                              });
                            }
                          },
                          { text: "Não" }
                        ]
                      );
                    }}>
                    <Text style={{ color: '#FFFFFF' }}>Sair</Text>
                    <IcFrontArrow />
                  </TouchableOpacity>
                </View>
              </View>
            </View>

            <View style={{ alignItems: 'center', width: '100%' }}>
              <View style={{ width: '80%' }}>
                <PrimaryButton title="Versão PRO" onPress={() => { }} />
              </View>
            </View>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <View style={{ marginRight: 10 }}>
                <Text style={{ color: '#999999' }}>Termos de uso</Text>
              </View>
              <View style={{ marginLeft: 10 }}>
                <Text style={{ color: '#999999' }}>Política de privacidade</Text>
              </View>
            </View>
          </View>
        </ScrollView>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  scrollContainer: {
    flex: 1,
    backgroundColor: BackgroundColor,
  },

  compontStyle: { color: 'white', backgroundColor: 'red' },

  settingsButton: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderRadius: 5,
    backgroundColor: '#232938',
    padding: 20,
    marginBottom: 20,
    alignItems: 'center',
    fontSize: 16,
    fontFamily: 'Manrope-SemiBold',
  },
});
