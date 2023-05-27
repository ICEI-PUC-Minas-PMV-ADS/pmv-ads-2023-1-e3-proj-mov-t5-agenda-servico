import React, { useState } from "react"
import { StyleSheet, Text, View } from "react-native";
import { BackgroundColor, WhiteColor } from "../constants/colors";
import { PrimaryButton } from "../components/Buttons";
import { useNavigation, useRoute } from "@react-navigation/native";
import { OtherInput } from '../components/OtherInput'
import { HelperText } from 'react-native-paper';



export function Cep() {

  const navigation = useNavigation();
  const route = useRoute();

  const [error, setError] = React.useState(false);
  const [cep, setCep] = useState('')
  const [isValidCep, setIsValidCep] = React.useState(true);

  function handleCepChange(cep) {
    const cepRegex = /^\d{5}-?\d{3}$/;
    setCep(cep);
    setIsValidCep(cepRegex.test(cep));
    setError(false)
  }

  return (
    <View style={styles.container}>
      <View>
        <View style={{ alignItems: 'center', justifyContent: 'center' }}>
          <Text style={styles.whiteText}> Digite o seu CEP </Text>
        </View>
        <View style={styles.inputContainer}>
          <OtherInput
            label="CEP"
            value={cep}
            onChangeText={handleCepChange}
            keyboardType='numeric'
            error={!isValidCep}
          />
          <HelperText type="error" visible={!isValidCep}>
            Por favor, digite um CEP valido
          </HelperText>

        </View>
      </View>
      <View style={styles.buttonContainer}>
        <View style={{ alignItems: 'center' }}>
          <HelperText type="error" visible={error}>
            O CEP digitado não foi encontrado. Por favor, digite um novo CEP.
          </HelperText>
        </View>
        <PrimaryButton title={'Continuar'} onPress={() => {
          if (isValidCep && cep != "") {
            const formatedCep = cep.replace(/\D/g, '')
            fetch(`https://viacep.com.br/ws/${formatedCep}/json/`).then(res => res.json()).then(data => {
              const endereco = {
                cep: formatedCep,
                logradouro: data.logradouro,
                bairro: data.bairro,
                cidade: data.localidade,
                estado: data.uf
              }
              if (data.erro == true || data.erro == 'true') {
                setError(true)
              }
              else {
                navigation.navigate('Address', { ...route.params, endereco })
              }
            });
          }

          else setIsValidCep(false)


        }} />
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