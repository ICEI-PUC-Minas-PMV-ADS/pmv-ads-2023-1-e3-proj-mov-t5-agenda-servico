import React, { useState } from "react"
import { StyleSheet, Text, View, ScrollView, KeyboardAvoidingView, TouchableWithoutFeedback } from "react-native";
import { BackgroundColor, WhiteColor } from "../constants/colors";
import { PrimaryButton } from "../components/Buttons";
import { useNavigation } from "@react-navigation/native";
import { OtherInput } from '../components/OtherInput'



export function Address() {

  const navigation = useNavigation();
  const [street, setStreet] = useState('')
  const [number, setNumber] = useState('')
  const [neighborhood, setNeighborhood] = useState('')
  const [city, setCity] = useState('')
  const [state, setState] = useState('')

  return (
    <View style={styles.container}>
      <KeyboardAvoidingView>
        <ScrollView>
          <View>
            <View style={{ alignItems: 'center', justifyContent: 'center' }}>
              <Text style={styles.whiteText}> Onde seus clientes podem te encontrar? </Text>
            </View>
            <View style={styles.inputContainer}>

              <OtherInput
                label="Logradouro"
                value={street}
                onChangeText={text => setStreet(text)} />

              <OtherInput
                label="Número"
                value={number}
                onChangeText={text => setNumber(text)}
                keyboardType='numeric' />

              <OtherInput
                label="Bairro"
                value={neighborhood}
                onChangeText={text => setNeighborhood(text)} />

              <OtherInput
                label="Cidade"
                value={city}
                onChangeText={text => setCity(text)} />

              <OtherInput
                label="Estado"
                value={state}
                onChangeText={text => setState(text)} />


              <TouchableWithoutFeedback onPress={() => { navigation.navigate('CEP', {}) }}>
                <View>
                  <OtherInput
                    label="CEP"
                    editable={false} />
                </View>
              </TouchableWithoutFeedback>




            </View>
          </View>
          <View style={styles.buttonContainer}>
            <PrimaryButton title={'Continuar'} onPress={() => { navigation.navigate('CEP', {}) }} />
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
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