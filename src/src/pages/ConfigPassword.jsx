import React from "react"
import { StyleSheet, Text, View } from "react-native";
import { BackgroundColor, WhiteColor } from "../constants/colors";
import { PrimaryButton } from "../components/Buttons";
import { useNavigation } from "@react-navigation/native";
import { OtherInput } from "../components/OtherInput";

export function Password() {
  const navigation = useNavigation();
  const [password, setPassword] = React.useState("");

  return (
    <View style={styles.container}>
      <View>
        <View style={{ alignItems: 'center', justifyContent: 'center' }}>
          <Text style={styles.whiteText}> Digite uma senha segura para o seu perfil. </Text>
        </View>
        <View style={styles.inputContainer}>
          <OtherInput
            label="Endereço de E-mail"
            value={"teste@email.com"}
            editable={false}

          />
          <OtherInput
            label="Senha"
            value={password}
            onChangeText={text => setPassword(text)}
          />
        </View>
      </View>
      <View style={styles.buttonContainer}>
        <PrimaryButton title={'Continuar'} onPress={() => { navigation.navigate('Who', {}) }} />
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: BackgroundColor,
    paddingTop: 10,
    justifyContent: "space-between"

  },

  whiteText: {
    color: WhiteColor,
    fontFamily: 'Manrope-Bold',
    fontSize: 14
  },

  inputContainer: {
    padding: 16

  },
  buttonContainer: {
    marginBottom: 10
  }
})