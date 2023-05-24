import React from "react"
import { StyleSheet, Text, View } from "react-native";
import { BackgroundColor, WhiteColor, LightGray } from "../constants/colors";
import { PrimaryButton } from "../components/Buttons";
import { useNavigation } from "@react-navigation/native";
import { OtherInput } from "../components/OtherInput";
import { HelperText, ActivityIndicator } from "react-native-paper";
import Emoji from 'react-native-emoji';
import AsyncStorage from "@react-native-async-storage/async-storage"
import { hash } from "../utils/crypto";

const imageCheck = <Emoji name="white_check_mark" style={{ fontSize: 18 }} />
const imageClose = <Emoji name="x" style={{ fontSize: 18 }} />

export function Password() {
  const navigation = useNavigation();
  const [error, setError] = React.useState(false)
  const [email, setEmail] = React.useState('Email')
  const [password, setPassword] = React.useState()
  const [loading, setLoading] = React.useState(false)

  React.useEffect(() => {
    AsyncStorage.getItem('email').then(value => {
      if (value !== null) {
        setEmail(value)
      }
    })
  }, []);



  const [validateInput, setValidateInput] = React.useState({
    case: false,
    number: false,
    length: false
  })

  const secureText = (password) => {
    const regexUppercase = new RegExp(/^(?=.*[A-Z]).+$/)
    const regexLowercase = new RegExp(/^(?=.*[a-z]).+$/)
    const regexNumber = new RegExp(/^(?=.*[0-9]).+$/)
    const length = password.length >= 6

    setValidateInput({
      case: regexUppercase.test(password) && regexLowercase.test(password),
      number: regexNumber.test(password),
      length
    })
  }

  const savePassword = () => {
    AsyncStorage.setItem('password', password).then(
      () => {
        navigation.navigate('WhereWork', {})
        setLoading(false)
      }


    )
  }

  const loadingButton = () => {
    if (loading == false) {
      return 'Continuar'
    }
    else {
      return <ActivityIndicator animating={loading} color={WhiteColor} />
    }
  }

  return (
    <View style={styles.container}>
      <View>
        <View style={{ alignItems: 'center', justifyContent: 'center' }}>
          <Text style={styles.whiteText}> Digite uma senha segura para o seu perfil. </Text>
        </View>
        <View style={styles.inputContainer}>
          <View>
            <OtherInput
              label="Endereço de E-mail"
              value={email}
              editable={false}
              desativado={true}
            />
            <HelperText></HelperText>
          </View>
          <View>
            <OtherInput
              label="Senha"
              onChangeText={(password) => {
                setError(false)
                secureText(password)
                setPassword(password)
              }}
              error={error}
              secureTextEntry
            />
            <View style={{ marginTop: 15 }}>
              <Text style={styles.whiteText}>Sua senha deve ter:</Text>

              <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 5 }}>
                {validateInput.length ? imageCheck : imageClose}
                <Text style={styles.description}>6 carcteres</Text>
              </View>
              <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 5 }}>
                {validateInput.number ? imageCheck : imageClose}
                <Text style={styles.description}>Números</Text>
              </View>
              <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 5 }}>
                {validateInput.case ? imageCheck : imageClose}
                <Text style={styles.description}>Letra maiúscula e letra minúscula</Text>
              </View>
            </View>
          </View>
        </View>
      </View>
      <View style={styles.buttonContainer}>
        <View style={{ alignItems: 'center' }}>
          <HelperText type="error" visible={error}>
            Por favor, insira uma senha válida.
          </HelperText>
        </View>
        <PrimaryButton title={loadingButton()} onPress={() => {
          if (validateInput.case && validateInput.length && validateInput.number) {
            setLoading(true)
            savePassword()
          }
          else {
            setError(true)
          }
        }
        }
        />
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
  description: {
    color: LightGray,
    fontFamily: 'Manrope-Bold',
    fontSize: 12,
    marginLeft: 5
  },

  inputContainer: {
    padding: 16

  },
  buttonContainer: {
    marginBottom: 10
  }
})