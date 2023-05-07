import React from "react"
import { StyleSheet, Text, View } from "react-native";
import { BackgroundColor, WhiteColor } from "../constants/colors";
import { PrimaryButton } from "../components/Buttons";
import { useNavigation, useRoute } from "@react-navigation/native";
import { OtherInput } from "../components/OtherInput";
import { HelperText, TextInput } from 'react-native-paper';
import Emoji from 'react-native-emoji';
import AsyncStorage from "@react-native-async-storage/async-storage"


export function AboutYou() {


  const navigation = useNavigation();
  const route = useRoute();
  const [about, setAbout] = React.useState();

  const [error, setError] = React.useState(false);

  const [company, setCompany] = React.useState();
  const [isValidCompany, setIsValidCompany] = React.useState(true);

  const [phoneNumber, setPhoneNumber] = React.useState("");
  const [isValidNumber, setIsValidNumber] = React.useState(true);

  const [name, setName] = React.useState("");
  const [isValidName, setIsValidName] = React.useState(true);

  //carrega os dados anteriormente salvos

  React.useEffect(() => {
    AsyncStorage.getItem('about').then(value => {
      if (value !== null) {
        setAbout(JSON.parse(value))
      }
    })
  }, []);

  React.useEffect(() => {
    if (about) {
      setCompany(about.company)
      setName(about.name)
      setPhoneNumber(about.phone)
    }
  }, [about]);

  //Valida o nome da compania
  function handleCompanyChange(company) {
    const companyRegex = /^[\p{L}\d\s&.'-]+$/u;
    setCompany(company);
    setIsValidCompany(companyRegex.test(company));
    setError(false)
  }

  //Valida o nome
  function handleNameChange(name) {
    const nameRegex = /^([a-zA-ZÀ-ÖØ-öø-ÿ]+ ?[a-zA-ZÀ-ÖØ-öø-ÿ]+)+$/;
    setName(name);
    setIsValidName(nameRegex.test(name));
    setError(false)
  }

  //Formata e valida o telefone
  function formatPhoneNumber(number) {
    const phoneNumber = number.replace(/\D/g, '');
    const match = phoneNumber.match(/^(\d{2})(\d{4,5})(\d{4})$/);
    if (match) {
      setIsValidNumber(true)
      return `(${match[1]}) ${match[2]}-${match[3]}`;
    }
    else {
      setIsValidNumber(false)
      return number;
    }
  }
  function handlePhoneNumberChange(number) {
    setPhoneNumber(formatPhoneNumber(number));
    setError(false)
  }

  function allChecked() {
    if (company === "" || name === "" || phoneNumber === "" || !isValidCompany || !isValidName || !isValidNumber) {
      setError(true);
      return false
    } else {
      setError(false)
      return true
    }
  }

  const newAbout = {
    company: company,
    name: name,
    phone: phoneNumber
  }

  const saveAbout = () => {
    const newData = JSON.stringify(newAbout)
    AsyncStorage.setItem('about', newData).then(
      navigation.navigate('Password', {})
    )
  }

  return (
    <View style={styles.container}>
      <View>
        <View style={{ alignItems: 'center', justifyContent: 'center' }}>
          <Text style={styles.whiteText}> Conte-nos mais sobre você e sua empresa. </Text>
        </View>
        <View style={styles.inputContainer}>
          <View>
            <OtherInput
              label="Nome da empresa"
              value={company}
              onChangeText={handleCompanyChange}
              error={!isValidCompany}

            />
            <HelperText type="error" visible={!isValidCompany}>
              Por favor, digite um nome de empresa valido
            </HelperText>
          </View>
          <View>
            <OtherInput
              label="Nome e sobrenome"
              value={name}
              onChangeText={handleNameChange}
              error={!isValidName}

            />
            <HelperText type="error" visible={!isValidName}>
              Por favor, digite um nome e sobrenome valido
            </HelperText>
          </View>
          <View>
            < OtherInput
              label="Telefone"
              left={
                <TextInput.Icon
                  icon={() => <Emoji name="flag-br" style={{ fontSize: 18 }} />}
                />
              }
              value={phoneNumber}
              keyboardType='numeric'
              onChangeText={handlePhoneNumberChange}
              error={!isValidNumber}

            />
            <HelperText type="error" visible={!isValidNumber}>
              Por favor, digite um telefone valido com DDD
            </HelperText>
          </View>
        </View>
      </View>
      <View style={styles.buttonContainer}>
        <View style={{ alignItems: 'center' }}>
          <HelperText type="error" visible={error}>
            Por favor, preencha corretamente todas as informações acima.
          </HelperText>
        </View>
        <PrimaryButton title={'Continuar'} onPress={() => {
          if (allChecked())
            saveAbout()


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
    fontSize: 16
  },
  inputContainer: {
    padding: 16
  },
  buttonContainer: {
    marginBottom: 10
  },

})