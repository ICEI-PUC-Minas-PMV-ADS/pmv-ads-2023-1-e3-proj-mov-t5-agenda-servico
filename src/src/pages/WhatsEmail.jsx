import React from "react";
import { StyleSheet, Text, TouchableWithoutFeedback, View } from "react-native";
import { BackgroundColor, PrimaryColor, WhiteColor } from "../constants/colors";
import { PrimaryButton } from "../components/Buttons";
import { useNavigation } from "@react-navigation/native";
import { OtherInput } from "../components/OtherInput";
import { HelperText } from 'react-native-paper';

export function WhatsEmail() {

  const navigation = useNavigation();
  const [email, setEmail] = React.useState("");
  const [isValid, setIsValid] = React.useState(true);

  //Valida o email
  function handleEmailChange(email) {
    const emailRegex = /^\S+@\S+\.\S+$/;
    setEmail(email);
    setIsValid(emailRegex.test(email));
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
        <PrimaryButton title={'Confirmar'} onPress={() => {
          if (isValid)
            navigation.navigate('Who', {})
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