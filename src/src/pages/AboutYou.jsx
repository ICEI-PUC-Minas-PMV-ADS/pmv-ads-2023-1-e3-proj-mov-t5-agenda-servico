import React from "react"
import { StyleSheet, Text, View } from "react-native";
import { BackgroundColor, WhiteColor } from "../constants/colors";
import { PrimaryButton } from "../components/Buttons";
import { useNavigation } from "@react-navigation/native";
import { OtherInput } from "../components/OtherInput";

export function AboutYou() {

  const navigation = useNavigation();
  const [text, setText] = React.useState("");
  const [company, setCompany] = React.useState("");
  const [name, setName] = React.useState("");

  return (
    <View style={styles.container}>
      <View>
        <View style={{ alignItems: 'center', justifyContent: 'center' }}>
          <Text style={styles.whiteText}> Conte-nos mais sobre você e sua empresa. </Text>
        </View>
        <View style={styles.inputContainer}>
          <OtherInput
            label="Nome da empresa"
            value={company}
            onChangeText={text => setCompany(text)}

          />
          <OtherInput
            label="Nome e sobrenome"
            value={name}
            onChangeText={text => setName(text)}
          />
          < OtherInput
            label="🇧🇷 Telefone"
            value={text}
            keyboardType='numeric'
            onChangeText={text => setText(text)}
          />
        </View>
      </View>
      <View style={styles.buttonContainer}>
        <PrimaryButton title={'Continuar'} onPress={() => { navigation.navigate('Category', {}) }} />
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