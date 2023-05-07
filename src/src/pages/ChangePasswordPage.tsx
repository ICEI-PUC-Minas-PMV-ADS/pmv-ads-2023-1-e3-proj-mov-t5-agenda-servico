import {NOT_INITIALIZED_ERROR} from '@react-navigation/core/lib/typescript/src/createNavigationContainerRef';
import React, {useState} from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {isEnabled} from 'react-native/Libraries/Performance/Systrace';

import {InputIconText} from '../components/Inputs';
import {Alert} from 'react-native';
import {BackgroundColor, SecondaryColor} from '../constants/colors';
import {IcBackArrow} from '../constants/icons';
import {IcEyeOffSvg, IcEyeSvg} from '../constants/icons';
import { UserRepository } from '../repositories/user_repository';
import { hash } from '../utils/crypto';

export function ChangePasswordPage({
  navigation,
}: NativeStackScreenProps<AppParamsList, 'ChangePassword'>) {
  const [showPassword, setShowPassword] = useState(false);

  const [password, setPassword] = useState<string>('');
  const [confirmPassword, setConfirmPassword] = useState<string>('');

  const [currentPassword, setCurrentPassword] = useState<string>('');

  const appContext = useAppContext();
  const errorContext = useErrorContext();

  const userRepo = new UserRepository();


  if (appContext.user === undefined) {
    navigation.replace('Login', {});
    return <></>;
  }
  return (
    <View style={{flex: 1, backgroundColor: 'blue'}}>
      <View style={{flex: 1}}>
        <ScrollView
          style={styles.scrollContainer}
          contentInsetAdjustmentBehavior="automatic">
          <View style={styles.container}>
            <View style={{marginTop: 20}}>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'flex-start',
                }}>
                <TouchableOpacity
                  onPress={() => {
                    navigation.replace('Config', {});
                  }}
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    marginBottom: 5,
                  }}>
                  <View style={{marginLeft: 12}}>
                    <IcBackArrow />
                  </View>
                  <View style={{marginLeft: 10}}>
                    <Text style={{color: '#FDFDFD', fontSize: 18}}>Voltar</Text>
                  </View>
                </TouchableOpacity>
              </View>
            </View>
            <View style={{alignItems: 'center', width: '100%'}}>
              <Text
                style={{
                  color: '#FDFDFD',
                  fontSize: 25,
                  marginTop: 25,
                }}>
                Alterar senha
              </Text>
            </View>
            <View style={{padding: 10}}>
            <View>
                <InputIconText
                  label="Senha Atual"
                  placeholder="senha aqui..."
                  secureTextEntry={!showPassword}
                  icon={showPassword ? IcEyeOffSvg : IcEyeSvg}
                  iconLocation="end"
                  onClickIcon={() => setShowPassword(!showPassword)}
                  onChange={value => setCurrentPassword(value)}
                  value={currentPassword}
                />
              </View>
              <View>
                <InputIconText
                  label="Nova senha"
                  placeholder="senha aqui..."
                  secureTextEntry={!showPassword}
                  icon={showPassword ? IcEyeOffSvg : IcEyeSvg}
                  iconLocation="end"
                  onClickIcon={() => setShowPassword(!showPassword)}
                  onChange={value => setPassword(value)}
                />
              </View>
              <View>
                <InputIconText
                  label="Repetir senha"
                  placeholder="repetir aqui..."
                  secureTextEntry={!showPassword}
                  icon={showPassword ? IcEyeOffSvg : IcEyeSvg}
                  iconLocation="end"
                  onClickIcon={() => setShowPassword(!showPassword)}
                  onChange={value => setConfirmPassword(value)}
                  value={confirmPassword}
                />
              </View>
            </View>

            <View style={{justifyContent: 'center', width: '100%'}}>
              <View style={{alignItems: 'center'}}>
                <TouchableOpacity
                  style={styles.button}
                  onPress={() => {
                    //
                    userRepo.get(appContext.user.id, (user) => {
                      if (user === undefined) {
                        //
                        errorContext.dispatchError('Informações do usuario nao foram localizadas!');
                      } else {
                        //
                        if (user.hash === hash(currentPassword)) {
                          if (password === confirmPassword) {
                            //
                            user.hash = hash(password);

                            //
                            userRepo.update(user, () => {
                              navigation.replace('Config', {});
                              Alert.alert(
                                'Senha alterada',
                                'Sua senha foi alterada com sucesso!',
                                [{text: 'Ok'}],
                              );
                            });
                          } else {
                            //
                            errorContext.dispatchError('A confirmação da senha esta diferente!');
                          }
                        } else {
                          //
                          errorContext.dispatchError('Senha atual invalida!');
                        }
                      }
                    });
                  }}>
                  <Text style={{color: '#FDFDFD'}}>Salvar senha</Text>
                </TouchableOpacity>
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
  button: {
    alignItems: 'center',
    padding: 15,
    marginTop: 25,
    fontSize: 16,
    fontFamily: 'Manrope-SemiBold',
    backgroundColor: SecondaryColor,
    borderRadius: 15,
  },
});
