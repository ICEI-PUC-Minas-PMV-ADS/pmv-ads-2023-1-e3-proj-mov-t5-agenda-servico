import React, { useState } from "react"
import { StyleSheet, Text, View, ScrollView, KeyboardAvoidingView, TouchableWithoutFeedback } from "react-native";
import { BackgroundColor, WhiteColor, PrimaryColor, LightGray } from "../constants/colors";
import { PrimaryButton } from "../components/Buttons";
import { useNavigation, useRoute } from "@react-navigation/native";
import { OtherInput } from '../components/OtherInput'
import { HelperText, Switch } from 'react-native-paper';
import AsyncStorage from "@react-native-async-storage/async-storage"



export function Address() {

  const navigation = useNavigation();
  const route = useRoute();

  const endereco = route.params.endereco

  const [cep, setCep] = useState(endereco.cep)
  const [street, setStreet] = useState(endereco.logradouro)
  const [neighborhood, setNeighborhood] = useState(endereco.bairro)

  const [number, setNumber] = useState('')
  const [isValidNumber, setIsValidNumber] = React.useState(true);

  const [error, setError] = React.useState(false);

  const [complement, setComplement] = useState('')

  const [isSwitchOn, setIsSwitchOn] = React.useState();

  const nameSwitch = React.useMemo(() => {
    if (isSwitchOn == true) {
      return 'Mostrar'
    }
    else return 'Esconder'
  }, [isSwitchOn]);

  const onToggleSwitch = () => { setIsSwitchOn(!isSwitchOn); }

  function handleNumberChange(number) {
    const numberRegex = /^[0-9]+$/;
    setNumber(number);
    setIsValidNumber(numberRegex.test(number));
    setError(false)
  }

  function allChecked() {
    if (number === "" || !isValidNumber) {
      setError(true);
      return false
    } else {
      setError(false)
      return true
    }
  }

  const newAdress = {
    cep: cep,
    street: street,
    number: number,
    neighborhood: neighborhood,
    city: endereco.cidade,
    state: endereco.estado,
    complement: complement
  }

  const saveAdress = () => {
    const newData = JSON.stringify(newAdress)
    AsyncStorage.setItem('adress', newData).then(
      navigation.navigate('DisplacementFee', {})
    )
  }

  return (
    <View style={styles.container}>
      <View>
        <View style={{ alignItems: 'center', justifyContent: 'center' }}>
          <Text style={styles.whiteText}> Onde seus clientes podem te encontrar? </Text>
        </View>
        <View style={{ maxHeight: 490 }}>
          <ScrollView>
            <View style={styles.inputContainer}>
              <TouchableWithoutFeedback onPress={() => { navigation.navigate('CEP', {}) }}>
                <View>
                  <OtherInput
                    label="CEP"
                    value={cep}
                    editable={false} />
                  <HelperText>
                  </HelperText>
                </View>
              </TouchableWithoutFeedback>
              <View>
                <OtherInput
                  label="Logradouro"
                  value={street}
                  onChangeText={text => setStreet(text)}
                  editable={false}
                  desativado={true}
                />
                <HelperText>
                </HelperText>
              </View>
              <View>
                <OtherInput
                  label="Número"
                  value={number}
                  onChangeText={handleNumberChange}
                  keyboardType='numeric'
                  error={!isValidNumber}
                />
                <HelperText type='error' visible={!isValidNumber}>
                  Por favor, digite um número de residencia valido
                </HelperText>
              </View>

              <View>
                <OtherInput
                  label="Complemento (opcional)"
                  value={complement}
                  onChangeText={text => setComplement(text)}
                />
                <HelperText type='info'>
                  Ex: Apt.200, Casa B, Perto da lanchonete.
                </HelperText>
              </View>

              <TouchableWithoutFeedback onPress={() => {
                onToggleSwitch()
              }}>
                <View style={styles.checkItemContainer}>
                  <View style={{ flex: 1 }}>
                    <Text style={styles.whiteText}>Visibilidade do endereço</Text>
                    <Text style={styles.description}>Determina se os clientes podem ver seu endereço em seu perfil</Text>
                  </View>
                  <View style={{ flexDirection: 'column', alignItems: 'center', marginLeft: 100 }}>
                    <Switch value={isSwitchOn} onValueChange={onToggleSwitch} color={PrimaryColor} />
                    <Text style={{
                      color: LightGray,
                      fontFamily: 'Manrope-Bold',
                      fontSize: 12
                    }}>{nameSwitch}</Text>
                  </View>
                </View>

              </TouchableWithoutFeedback>
            </View>
          </ScrollView>
        </View>
      </View>
      <View style={styles.buttonContainer}>
        <View style={{ alignItems: 'center' }}>
          <HelperText type="error" visible={error}>
            Por favor, preencha corretamente as informações acima.
          </HelperText>
        </View>
        <PrimaryButton title={'Continuar'} onPress={() => {
          if (allChecked()) {
            saveAdress()
          }


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
    paddingTop: 16,
    paddingLeft: 16,
    paddingRight: 16

  },
  buttonContainer: {

  },
  description: {
    color: LightGray,
    fontFamily: 'Manrope-Bold',
    fontSize: 12,
  },
  checkItemContainer: {
    flexDirection: "row",
    borderBottomWidth: 1,
    borderBottomColor: WhiteColor,
    padding: 15,
    alignItems: 'center',

  },

})