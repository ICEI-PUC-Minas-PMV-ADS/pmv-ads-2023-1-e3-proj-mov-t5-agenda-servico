import React from "react"
import { StyleSheet, Text, View } from "react-native";
import { BackgroundColor, PrimaryColor, SecondaryColor, WhiteColor } from "../constants/colors";
import { PrimaryButton } from "../components/Buttons";
import { useNavigation } from "@react-navigation/native";
import { TextInput } from 'react-native-paper';

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
          <TextInput
            label="Nome da empresa"
            value={company}
            theme={{ colors: { onSurfaceVariant: 'white' } }}
            onChangeText={text => setCompany(text)}
            mode="outlined"
            style={styles.input}
            outlineColor={PrimaryColor}
            activeOutlineColor={PrimaryColor}
            textColor={WhiteColor}
          />
          <TextInput
            label="Nome e sobrenome"
            value={name}
            theme={{ colors: { onSurfaceVariant: 'white' } }}
            onChangeText={text => setName(text)}
            mode="outlined"
            style={styles.input}
            outlineColor={PrimaryColor}
            activeOutlineColor={PrimaryColor}
            textColor={WhiteColor}
          />
          <TextInput
            label="🇧🇷 Telefone"
            value={text}
            keyboardType='numeric'
            theme={{ colors: { onSurfaceVariant: 'white' } }}
            onChangeText={text => setText(text)}
            mode="outlined"
            style={styles.input}
            outlineColor={PrimaryColor}
            activeOutlineColor={PrimaryColor}
            textColor={WhiteColor}
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

  input: {
    backgroundColor: SecondaryColor,
    fontSize: 18,
    marginTop: 20

  },
  inputContainer: {
    padding: 16

  },
  buttonContainer: {
    marginBottom: 10
  }
})