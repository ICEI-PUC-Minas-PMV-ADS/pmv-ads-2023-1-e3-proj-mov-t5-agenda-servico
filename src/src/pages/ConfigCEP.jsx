import React, { useState } from "react"
import { StyleSheet, Text, View } from "react-native";
import { BackgroundColor, WhiteColor } from "../constants/colors";
import { PrimaryButton } from "../components/Buttons";
import { useNavigation } from "@react-navigation/native";
import { OtherInput } from '../components/OtherInput'



export function Cep() {

  const navigation = useNavigation();
  const [cep, setCep] = useState('')

  return (
    <View style={styles.container}>
      <View>
        <View style={{ alignItems: 'center', justifyContent: 'center' }}>
          <Text style={styles.whiteText}> Onde seus clientes podem te encontrar? </Text>
        </View>
        <View style={styles.inputContainer}>
          <OtherInput
            label="CEP"
            value={cep}
            onChangeText={text => setCep(text)}
            keyboardType='numeric' />
        </View>
      </View>
      <View style={styles.buttonContainer}>
        <PrimaryButton title={'Continuar'} onPress={() => { navigation.navigate('Address', {}) }} />
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