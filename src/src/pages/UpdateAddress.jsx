import React, { useState } from "react"
import { StyleSheet, Text, View, ScrollView, KeyboardAvoidingView, TouchableWithoutFeedback } from "react-native";
import { BackgroundColor, WhiteColor, PrimaryColor, LightGray } from "../constants/colors";
import { PrimaryButton } from "../components/Buttons";
import { useNavigation, useRoute, useIsFocused } from "@react-navigation/native";
import { OtherInput } from '../components/OtherInput'
import { HelperText, Switch, ActivityIndicator } from 'react-native-paper';
import { useAppContext } from '../contexts/app_context';
import { UserRepository } from "../repositories/user_repository";
import { AddressRepository } from "../repositories/address_repository";

const Header = ({ loading }) => {
  const navigation = useNavigation();

  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: !loading
    });
  }, [navigation, loading]);

  return null;
};

export function Address() {
  const appContext = useAppContext();
  const userRepository = new UserRepository()
  const addressRepository = new AddressRepository()
  const navigation = useNavigation();
  const route = useRoute();
  const isFocused = useIsFocused()
  const endereco = route.params.endereco

  const [user, setUser] = useState()
  const [id, setId] = useState()
  const [cep, setCep] = useState()
  const [street, setStreet] = useState()
  const [neighborhood, setNeighborhood] = useState()
  const [number, setNumber] = useState()
  const [complement, setComplement] = useState()
  const [state, setState] = useState()

  const [isValidNumber, setIsValidNumber] = React.useState(true);
  const [error, setError] = React.useState(false);

  const [isSwitchOn, setIsSwitchOn] = React.useState(false);
  const [where, setWhere] = useState('')
  const [home, setHome] = useState('')
  const [description, setDescription] = useState('')
  const [loading, setLoading] = React.useState(true)

  React.useEffect(() => {
    if (endereco != undefined) {
      setCep(endereco.cep)
      setStreet(endereco.logradouro)
      setNeighborhood(endereco.bairro)
      setState(endereco.cidade)
      setNumber()
      setComplement()
      setId(appContext.user?.endereco_fk)
      if (appContext.user?.endereco_visivel == true) {
        setIsSwitchOn(true)
      }
      setLoading(false)
    }
    else {
      userRepository.get(appContext.user?.id, user => {
        setWhere(user.onde_trabalha)
        setUser(user)
        if (user.endereco_visivel == true) {
          setIsSwitchOn(true)
        }
        addressRepository.get(appContext.user?.endereco_fk, address => {
          setCep(address.cep)
          setStreet(address.logradouro)
          setNeighborhood(address.bairro)
          setNumber(address.numero)
          setComplement(address.complemento)
          setState(address.uf)
          setId(address.id)
          setLoading(false)
        })

      })
    }
  }, [isFocused]);


  React.useEffect(() => {
    if (where.casa_cliente == true && where.estabelecimento == false) {
      setHome(true)
      setDescription('Mostre aos clientes locais que você está na área deles e está disponível para reserva.')
    }
    else {
      setHome(false)
      setDescription('Onde seus clientes podem te encontrar?')
    }
  }, [where]);




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
    id: id,
    cep: cep,
    logradouro: street,
    numero: number,
    bairro: neighborhood,
    uf: state,
    complemento: complement,

  }

  const saveAdress = () => {
    setLoading(true)
    addressRepository.update(newAdress, () => {
      const newUser = { ...user }
      newUser.endereco_visivel = isSwitchOn
      userRepository.update(newUser, () => {
        navigation.navigate('Where')
        setLoading(false)
      })
    })
  }

  return (
    <View style={{ flex: 1 }}>
      <Header loading={loading} />
      {
        loading &&
        <View style={styles.loadingContainer}>
          <Text style={styles.whiteText}>Aguarde um instante</Text>
          <ActivityIndicator style={{ marginTop: 20 }} animating={loading} color={PrimaryColor} />
        </View>
      }
      {loading == false &&
        <View style={styles.container}>
          <View>
            <View style={{ alignItems: 'center', justifyContent: 'center', paddingRight: 16, paddingLeft: 16 }}>
              <Text style={styles.whiteText}> {description} </Text>
            </View>
            <View style={{ maxHeight: 490 }}>
              <KeyboardAvoidingView
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                keyboardVerticalOffset={150}>
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
                        editable={false}
                        desativado={true}
                      />
                      <HelperText type='info'>
                        Altere o CEP para alterar o logradouro.
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

                    {
                      home &&
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
                    }


                  </View>
                </ScrollView>
              </KeyboardAvoidingView>
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
      }
    </View>
  )
}

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    backgroundColor: BackgroundColor,
    justifyContent: 'center',
    alignItems: 'center'
  },
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