import React from "react"
import { StyleSheet, Text, View } from "react-native";
import { BackgroundColor, PrimaryColor, SecondaryColor, WhiteColor } from "../constants/colors";
import { PrimaryButton } from "../components/Buttons";
import { useNavigation } from "@react-navigation/native";
import { TextInput } from 'react-native-paper';

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
          <TextInput
            label="Endereço de E-mail"
            value={"teste@email.com"}
            theme={{ colors: { onSurfaceVariant: 'gray' } }}
            onChangeText={() => { }}
            mode="outlined"
            style={styles.input}
            outlineColor="gray"
            activeOutlineColor="gray"
            textColor="gray"
            editable={false}

          />
          <TextInput
            label="Senha"
            value={password}
            theme={{ colors: { onSurfaceVariant: 'white' } }}
            onChangeText={text => setPassword(text)}
            mode="outlined"
            style={styles.input}
            outlineColor={PrimaryColor}
            activeOutlineColor={PrimaryColor}
            textColor={WhiteColor}
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