import { useState } from "react";
import { ScrollView, StyleSheet, Text, TouchableWithoutFeedback, View } from "react-native";
import { BackgroundColor, BlackColor, PrimaryColor, TextInputHintColor, WhiteColor } from "../constants/colors";
import { InputIconText, InputText } from "../components/Inputs";
import { IcEyeOffSvg, IcEyeSvg } from "../constants/icons";
import { FacebookButton, GoogleButton, PrimaryButton } from "../components/Buttons";
import { GoogleSignin } from "@react-native-google-signin/google-signin";
import { Settings, AccessToken, LoginManager } from 'react-native-fbsdk-next';
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { AppParamsList } from "../ParamList";

import CheckBox from "@react-native-community/checkbox";
import { UserRepository } from "../repositories/user_repository";
import { User } from '../models/user';

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

  return (
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

          <View style={{marginHorizontal: 16, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between'}}>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <CheckBox 
                tintColors={{ true: WhiteColor }}
                value={remember}
                onChange={() => setRemember(!remember)}
                />
              <Text style={styles.whiteText}>Relembrar</Text>
            </View>

            <TouchableWithoutFeedback onPress={() => {}}>
              <Text style={styles.touchableText}>Esqueceu a senha?</Text>
            </TouchableWithoutFeedback>
          </View>

          <PrimaryButton title={"Login"} onPress={() => {
            // TODO: Implementar login.
            const userRepo = new UserRepository();
            userRepo.findUserByEmail('john@email.com', (user) => {
              console.log(user);
            });
          }} />

          <View style={{ flexDirection: 'row', alignItems: 'center', margin: 10 }}>
            <View style={{ flex: 1, height: 1, backgroundColor: BlackColor}} />
            <Text style={{ color: TextInputHintColor, fontFamily: 'Manrope-Bold', fontSize: 16, marginHorizontal: 16}}>Ou com</Text>
            <View style={{ flex: 1, height: 1, backgroundColor: BlackColor}} />
          </View>

          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <GoogleButton onPress={async () => {
              try {
                await GoogleSignin.hasPlayServices()
                const userInfo = await GoogleSignin.signIn();
                console.log(userInfo);

                navigation.navigate({ name: 'Home', params: {} });

                // TODO: O token na base de dados.
              } catch(e: any) {
                console.log(e.code);
              }
            }} />

            <FacebookButton onPress={async () => {
              Settings.initializeSDK();

              try {
                const result = await LoginManager.logInWithPermissions(
                  ['public_profile', 'email'],
                  'limited',
                  'my_nonce'
                );

                // TODO: O token na base de dados.
                console.log(result);
                {
                  const result = await AccessToken.getCurrentAccessToken();
                  console.log(result?.accessToken);
                }
                navigation.navigate({ name: 'Home', params: {} });
              } catch (error) {
                console.log(error);
              }              
            }} />
          </View>

          <TouchableWithoutFeedback onPress={() => {}}>
            <Text style={[ styles.touchableText, { textAlign: 'center' }]}>Entrar como empresa!</Text>
          </TouchableWithoutFeedback>

          <View style={{ flexDirection: 'row', justifyContent: 'center', margin: 48 }}>
            <Text style={styles.whiteText}>Não tem uma conta?</Text>
            <Text style={[styles.touchableText, {marginHorizontal: 4}]}>Sign Up</Text>
          </View>
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
  }
});