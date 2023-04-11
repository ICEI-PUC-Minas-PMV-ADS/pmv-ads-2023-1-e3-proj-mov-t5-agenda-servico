import React from "react";
import { StyleSheet, Text, TouchableWithoutFeedback, View } from "react-native";
import { BackgroundColor, PrimaryColor, SecondaryColor, WhiteColor } from "../constants/colors";
import { PrimaryButton } from "../components/Buttons";
import { useNavigation } from "@react-navigation/native";
import { TextInput } from 'react-native-paper';

export function WhatsEmail() {

  const navigation = useNavigation();
  const [text, setText] = React.useState("");

  return (
    <View style={styles.container}>
      <View style={styles.inputContainer}>
        <TextInput
          label="Email"
          value={text}
          theme={{ colors: { onSurfaceVariant: 'white' } }}
          onChangeText={text => setText(text)}
          mode="outlined"
          style={styles.input}
          outlineColor={PrimaryColor}
          activeOutlineColor={PrimaryColor}
          textColor={WhiteColor}
        />
      </View>
      <View style={styles.buttonContainer}>
        <PrimaryButton title={'Confirmar'} onPress={() => { navigation.navigate('Who', {}) }} />
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
    paddingTop: 30

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
  input: {
    backgroundColor: SecondaryColor,
    fontSize: 18,

  },
  inputContainer: {
    padding: 16
  }


})