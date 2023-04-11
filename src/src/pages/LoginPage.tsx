import React, { useState } from "react";
import { ScrollView, StyleSheet, Text, TouchableWithoutFeedback, View } from "react-native";
import { BackgroundColor, BlackColor, PrimaryColor, TextInputHintColor, WhiteColor } from "../constants/colors";
import { InputIconText, InputText } from "../components/Inputs";
import { IcEyeOffSvg, IcEyeSvg } from "../constants/icons";
import { FacebookButton, GoogleButton, PrimaryButton } from "../components/Buttons";
import { GoogleSignin } from "@react-native-google-signin/google-signin";
import { Settings, AccessToken, LoginManager, Profile } from 'react-native-fbsdk-next';
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { AppParamsList } from "../@types/ParamList";
import { UserRepository } from "../repositories/user_repository";
import { User } from '../models/user';
import { useErrorContext } from "../contexts/error_context";
import { KEY_USERDATA, USER_CLIENT } from "../constants/app";
import { hash } from "../utils/crypto";
import { useAppContext } from "../contexts/app_context";

import CheckBox from "@react-native-community/checkbox";
import EncryptedStorage from "react-native-encrypted-storage";



GoogleSignin.configure({
  scopes: ['email'],
  webClientId: '1044670167757-f5a5b86b7f067ebr6q14vn8s14h8941f.apps.googleusercontent.com',
  forceCodeForRefreshToken: true,
});

Settings.setAppID('2273447656158262');

/***
 * LoginPage
 */

export function LoginPage({ navigation }: NativeStackScreenProps<AppParamsList, 'Login'>) {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState<string>('');
  const [remember, setRemember] = useState(false);
  const [isCheckingAuth, setIsCheckingAuth] = useState(false);
  const [isCheckingUserData, setIsCheckingUserData] = useState(true);

  const errorContext = useErrorContext();
  const appContext = useAppContext();

  React.useEffect(() => {
    EncryptedStorage.getItem(KEY_USERDATA).then((value) => {
      if (value) {
        appContext.setUser(JSON.parse(value));
        navigation.replace('Home', {});
      } else {
        setIsCheckingUserData(false);
      }
    });
  }, []);

  return (
    isCheckingUserData ?
      <View style={styles.container}></View> :
      <View style={styles.container}>
        <ScrollView style={styles.scrollContainer} contentInsetAdjustmentBehavior="automatic">
          <View style={styles.titleContainer}>
            <Text style={styles.title}>Olá, Bem-vindo!</Text>
            <Text style={styles.title}>👋</Text>
          </View>

          <Text style={styles.subtitle}>Faça login!</Text>

          <InputText
            label="Email"
            placeholder="email"
            onChange={(value) => setEmail(value)}
          />

          <InputIconText
            label="Senha"
            placeholder="senha"
            secureTextEntry={!showPassword}
            icon={showPassword ? IcEyeOffSvg : IcEyeSvg}
            iconLocation="end"
            onClickIcon={() => setShowPassword(!showPassword)}
            onChange={(value) => setPassword(value)}
          />

          <View style={{ marginHorizontal: 16, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <CheckBox
                tintColors={{ true: WhiteColor }}
                value={remember}
                onChange={() => setRemember(!remember)}
              />
              <Text style={styles.whiteText}>Relembrar</Text>
            </View>

            <TouchableWithoutFeedback onPress={() => { }}>
              <Text style={styles.touchableText}>Esqueceu a senha?</Text>
            </TouchableWithoutFeedback>
          </View>

          <PrimaryButton title={isCheckingAuth ? "Aguarde" : "Login"} disabled={isCheckingAuth} onPress={() => {
            setIsCheckingAuth(true);

            const userRepo = new UserRepository();
            userRepo.findUserByEmail(email, (user) => {
              if (user && user.tipo_login === 'app') {
                const passwordHash = hash(password);
                if (user.hash === passwordHash) {
                  EncryptedStorage.setItem(KEY_USERDATA, JSON.stringify(user)).then(() => {
                    navigation.replace('Home', {});
                  });
                } else {
                  errorContext.dispatchError('Usuário e/ou senha invalido!');
                }
              } else {
                errorContext.dispatchError('Usuário e/ou senha invalido!');
              }
              setIsCheckingAuth(false);
            });
          }} />

          <View style={{ flexDirection: 'row', alignItems: 'center', margin: 10 }}>
            <View style={{ flex: 1, height: 1, backgroundColor: BlackColor }} />
            <Text style={{ color: TextInputHintColor, fontFamily: 'Manrope-Bold', fontSize: 16, marginHorizontal: 16 }}>Ou com</Text>
            <View style={{ flex: 1, height: 1, backgroundColor: BlackColor }} />
          </View>

          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <GoogleButton onPress={async () => {
              try {
                await GoogleSignin.hasPlayServices()
                const userInfo = await GoogleSignin.signIn();
                const userRepo = new UserRepository();

                userRepo.findUserByEmail(userInfo.user.email, (user) => {
                  if (user && user.tipo_login === 'google') {
                    EncryptedStorage.setItem(KEY_USERDATA, JSON.stringify(user)).then(() => {
                      navigation.replace('Home', {});
                    });
                  } else {
                    const newUser = new User();
                    newUser.email = userInfo.user.email;
                    newUser.nome = userInfo.user.name ?? userInfo.user.email;
                    newUser.imagem_perfil = userInfo.user.photo ?? "";
                    newUser.tipo = USER_CLIENT;
                    newUser.tipo_login = 'google';
                    userRepo.create(newUser, (_) => {
                      EncryptedStorage.setItem(KEY_USERDATA, JSON.stringify(newUser)).then(() => {
                        navigation.replace('Home', {});
                      });
                    });
                  }
                });

                // TODO: O token na base de dados.
              } catch (e: any) {
                console.log(e.code);
                errorContext.dispatchError('Falha ao fazer autenticação!');
              }
            }} />

            <FacebookButton onPress={async () => {
              Settings.initializeSDK();

              try {
                const result = await LoginManager.logInWithPermissions(
                  ['public_profile', 'email'], 'limited', 'my_nonce'
                );

                // TODO: O token na base de dados.
                if (!result.isCancelled) {
                  const acessToken = await AccessToken.getCurrentAccessToken();
                  if (acessToken) {
                    const currentProfile = await Profile.getCurrentProfile();
                    if (currentProfile) {
                      const userRepo = new UserRepository();
                      const newUser = new User();

                      newUser.email = currentProfile.email ?? currentProfile.userID ?? "";
                      newUser.nome = currentProfile.firstName ?? "";
                      newUser.imagem_perfil = currentProfile.imageURL ?? "";
                      newUser.tipo = USER_CLIENT;
                      newUser.tipo_login = 'facebook';
                      userRepo.create(newUser, (_) => {
                        EncryptedStorage.setItem(KEY_USERDATA, JSON.stringify(newUser)).then(() => {
                          navigation.replace('Home', {});
                        });
                      });
                    }
                  } else {
                    errorContext.dispatchError('Falha ao fazer autenticação!');
                  }
                } else {
                  errorContext.dispatchError('Falha ao fazer autenticação!');
                }
              } catch (error) {
                console.log(error);
                errorContext.dispatchError('Falha ao fazer autenticação!');
              }
            }} />
          </View>

          <TouchableWithoutFeedback onPress={() => { }}>
            <Text style={[styles.touchableText, { textAlign: 'center' }]}>Entrar como empresa!</Text>
          </TouchableWithoutFeedback>

          <TouchableWithoutFeedback onPress={() => { navigation.navigate('Email', {}) }}>
            <View style={{ flexDirection: 'row', justifyContent: 'center', margin: 48 }}>
              <Text style={styles.whiteText}>Não tem uma conta?</Text>
              <Text style={[styles.touchableText, { marginHorizontal: 4 }]}>Sign Up</Text>
            </View>
          </TouchableWithoutFeedback>
        </ScrollView>
      </View>
  );
}

/***
 * styles
 */

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: BackgroundColor,
    position: 'relative',
  },
  scrollContainer: {
    flex: 1,
  },
  titleContainer: {
    marginVertical: 24,
  },
  title: {
    color: WhiteColor,
    textAlign: 'center',
    fontFamily: 'Manrope-Bold',
    fontSize: 32,
  },
  subtitle: {
    color: TextInputHintColor,
    textAlign: 'center',
    marginBottom: 24,
    fontFamily: 'Manrope-Regular',
    fontSize: 14,
  },
  whiteText: {
    color: WhiteColor,
    fontFamily: 'Manrope-Bold',
  },
  touchableText: {
    color: PrimaryColor,
    fontFamily: 'Manrope-Bold',
    fontSize: 16,
  },
});