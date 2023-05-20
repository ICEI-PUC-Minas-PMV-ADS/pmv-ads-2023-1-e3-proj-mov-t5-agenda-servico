import React from "react";
import { StyleSheet, Text, TouchableWithoutFeedback, View } from "react-native";
import { BackgroundColor, PrimaryColor, WhiteColor } from "../constants/colors";
import { PrimaryButton } from "../components/Buttons";
import { useNavigation } from "@react-navigation/native";
import { OtherInput } from "../components/OtherInput";
import { HelperText } from 'react-native-paper';
import AsyncStorage from "@react-native-async-storage/async-storage"
import { UserRepository } from "../repositories/user_repository";

export function WhatsEmail() {

  const navigation = useNavigation();
  const [email, setEmail] = React.useState("");
  const [isValid, setIsValid] = React.useState(true);
  const [error, setError] = React.useState(false);
  const [mensage, setMensage] = React.useState(null)

  //Valida o email
  function handleEmailChange(email) {
    const emailRegex = /^\S+@\S+\.\S+$/;
    setEmail(email);
    setIsValid(emailRegex.test(email));
    setError(false)
  }

  const mensageError = (type) => {
    if (type === 'exist') {
      setMensage("Email já cadastrado, por favor digite um novo email ou retorne e faça login")
    }
    else {
      setMensage("Por favor, digite um email valido")
    }
  }

  const saveEmail = () => {
    const userRepository = new UserRepository();
    userRepository.findUserByEmail(email, (user) => {
      if (user) {
        setError(true)
        mensageError('exist')
      }
      else {
        AsyncStorage.setItem('email', email).then(
          navigation.navigate('Who', {})
        )
      }
    })
  }

  return (
    <View style={styles.container}>
      <View style={styles.inputContainer}>
        <OtherInput
          label="Email"
          value={email}
          onChangeText={handleEmailChange}
          error={!isValid}
          autoCapitalize="none"
          autoCompleteType="email"
          keyboardType="email-address"
        />
        <HelperText type="error" visible={!isValid}>
          Por favor, digite um email valido
        </HelperText>
      </View>
      <View style={styles.buttonContainer}>
        <View style={{ alignItems: 'center' }}>
          <HelperText type="error" visible={error}>
            {mensage}
          </HelperText>
        </View>
        <PrimaryButton title={'Confirmar'} onPress={() => {
          if (isValid && email != "") {
            saveEmail()
          }
          else {
            mensageError()
            setError(true)
          }

        }} />
        <View style={{ alignItems: 'center', justifyContent: 'center' }}>
          <Text style={styles.whiteText}>Ao inscrever-se você concorda com nossos</Text>
          <TouchableWithoutFeedback onPress={() => { }}>
            <Text style={[styles.touchableText, { marginHorizontal: 4 }]}> Termos e Condições e Política de Privacidade</Text>
          </TouchableWithoutFeedback>
        </View>
      </View>

    </View>
  )

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: BackgroundColor,
    justifyContent: "space-between",

  },
  buttonContainer: {
    marginBottom: 50

  },
  whiteText: {
    color: WhiteColor,
    fontFamily: 'Manrope-Bold',
    fontSize: 14
  },
  touchableText: {
    color: PrimaryColor,
    fontFamily: 'Manrope-Bold',
    fontSize: 14
  },

  inputContainer: {
    padding: 16
  }


})