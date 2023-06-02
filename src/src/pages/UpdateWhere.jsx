import React from "react";
import { StyleSheet, View, Text, TouchableWithoutFeedback } from "react-native";
import { BackgroundColor, PrimaryColor, WhiteColor, LightGray } from "../constants/colors";
import { useNavigation, useIsFocused } from "@react-navigation/native";
import { Checkbox, HelperText, Button, Dialog, Portal, ActivityIndicator } from 'react-native-paper';
import { PrimaryButton } from "../components/Buttons";
import { useAppContext } from '../contexts/app_context';
import { UserRepository } from "../repositories/user_repository";
import { List } from 'react-native-paper';
import Icon from 'react-native-vector-icons/FontAwesome';
import { ServiceRepository } from "../repositories/service_repository";

const Header = ({ loading }) => {
  const navigation = useNavigation();

  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: !loading
    });
  }, [navigation, loading]);

  return null;
};

export function WhereWork() {
  const arrowIcon = <Icon name="chevron-right" size={15} color={LightGray} />;
  const appContext = useAppContext();
  const isFocused = useIsFocused()
  const userRepository = new UserRepository()
  const serviceRepository = new ServiceRepository()
  const [destiny, setDestiny] = React.useState();
  const [visible, setVisible] = React.useState(false);
  const [user, setUser] = React.useState();
  const [newUser, setNewUser] = React.useState();
  const [whereWork, setWhereWork] = React.useState();
  const [establishment, setEstablishment] = React.useState(true);
  const [home, setHome] = React.useState(false);
  const atLeastOneVerified = establishment || home
  const navigation = useNavigation();
  const [loading, setLoading] = React.useState(true)

  React.useEffect(() => {
    userRepository.get(appContext.user?.id, user => {
      setWhereWork(user.onde_trabalha)
      setUser(user)
      setLoading(false)
    })
  }, [isFocused]);

  React.useEffect(() => {
    if (whereWork) {
      setEstablishment(whereWork.estabelecimento)
      setHome(whereWork.casa_cliente)
      setNewUser({ ...user })

    }
  }, [whereWork, user]);

  const newWhereWork = {
    estabelecimento: establishment,
    casa_cliente: home
  }

  const saveWhereWork = (destiny) => {
    setDestiny(destiny)
    newUser.onde_trabalha = newWhereWork

    if (whereWork.casa_cliente == true && newUser.onde_trabalha.casa_cliente == false) {
      setVisible(true)

    }
    else {
      setLoading(true)
      userRepository.update(newUser, () => {
        setLoading(false)
        navigation.navigate(destiny, {})
      })
    }

  }

  const updateAllServices = () => {
    setVisible(false)
    setLoading(true)
    serviceRepository.getAll(allServices => {
      const services = allServices.filter(service => service.prestador_servico_fk == appContext.user?.id)
      services.forEach(service => {
        service.servico_externo = false
        serviceRepository.update(service, () => {
          userRepository.update(newUser, () => {
            setLoading(false)
            navigation.navigate(destiny, {})
          })
        })
      })
    })
  }

  return (
    <View style={{ flex: 1 }}>
      <Header loading={loading} />
      {
        loading &&
        <View style={styles.loadingContainer}>
          <Text style={styles.textWhite}>Aguarde um instante</Text>
          <ActivityIndicator style={{ marginTop: 20 }} animating={loading} color={PrimaryColor} />
        </View>
      }
      {
        loading == false &&
        <View style={styles.container}>
          <Portal>
            <Dialog visible={visible} onDismiss={() => setVisible(false)} style={{ backgroundColor: BackgroundColor }}>
              <Dialog.Content>
                <Text style={styles.textWhite}> Ao desmarcar a opção <Text style={styles.textBlue}>"Na casa do cliente"</Text>, todos os seus serviços cadastrados passarão a ser <Text style={styles.textBlue}>realizados no seu estabelecimento.</Text> Deseja confirmar essa alteração? </Text>
              </Dialog.Content>
              <Dialog.Actions>
                <Button onPress={() => setVisible(false)}><Text style={styles.textGray}>Cancelar</Text></Button>
                <Button onPress={() => {
                  updateAllServices()
                }}><Text style={styles.textBlue}>Confirmar</Text></Button>
              </Dialog.Actions>
            </Dialog>
          </Portal>
          <View>
            <View style={{ alignItems: 'center', justifyContent: 'center' }}>
              <Text style={styles.whiteText}> Você trabalha em um estabelecimento, vai até os clientes para atendê-los ou ambos? </Text>
            </View>
            <View style={styles.checkContainer}>

              <TouchableWithoutFeedback onPress={() => {
                setEstablishment(!establishment);
              }}>
                <View style={styles.checkItemContainer}>
                  <View style={styles.checkbox}>
                    <Checkbox
                      color={WhiteColor}
                      status={establishment ? 'checked' : 'unchecked'}
                    />
                    <Text style={styles.whiteText}>   No meu estabelecimento</Text>
                  </View>
                  <Text style={styles.description}>Eu trabalho apenas no meu estabelecimento. Sou proprietário ou trabalho com outros profissioanais.</Text>
                </View>
              </TouchableWithoutFeedback>
              <TouchableWithoutFeedback onPress={() => {
                setHome(!home);
              }}>
                <View style={styles.checkItemContainer}>
                  <View style={styles.checkbox}>
                    <Checkbox
                      color={WhiteColor}
                      status={home ? 'checked' : 'unchecked'}
                    />
                    <Text style={styles.whiteText}>   Na casa do cliente</Text>
                  </View>
                  <Text style={styles.description}>Meus serviços são feitos nos domicílios dos clientes.</Text>
                </View>
              </TouchableWithoutFeedback>
            </View>

          </View>
          <View>
            <View style={{ marginBottom: 5 }}>
              {home == true &&
                <View style={styles.listItem}>
                  <List.Item
                    title={() => <Text style={styles.textWhite}>ALTERAR TAXA DE DESLOCAMENTO</Text>}
                    onPress={() => {
                      saveWhereWork('Fees')
                    }}
                    right={() => arrowIcon}
                  />
                </View>
              }
              <View style={styles.listItem}>
                <List.Item
                  title={() => <Text style={styles.textWhite}>ALTERAR ENDEREÇO</Text>}
                  onPress={() => {
                    saveWhereWork('Address')
                  }}
                  right={() => arrowIcon}
                />
              </View>

            </View>
            <View style={{ alignItems: 'center' }}>
              <HelperText type="error" visible={!atLeastOneVerified}>
                Por favor, escolha pelo menos uma das opções acima
              </HelperText>
            </View>
            <PrimaryButton title={'Salvar'} onPress={() => {
              if (atLeastOneVerified)
                saveWhereWork('Profile')
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
    justifyContent: 'space-between'
  },
  whiteText: {
    color: WhiteColor,
    fontFamily: 'Manrope-Bold',
    fontSize: 16
  },
  checkItemContainer: {
    flexDirection: "column",
    borderBottomWidth: 1,
    borderBottomColor: WhiteColor,
    padding: 25
  },
  checkContainer: {
    paddingLeft: 15,
    paddingRight: 15,
  },
  checkbox: {
    flexDirection: "row",
    alignItems: 'center',
  },
  description: {
    color: LightGray,
    fontFamily: 'Manrope-Bold',
    fontSize: 12,
    paddingLeft: 45
  },
  textWhite: {
    color: WhiteColor,
    fontFamily: 'Manrope-Bold',
    fontSize: 14,
    marginBottom: 5
  },
  listItem: {
    borderBottomWidth: 1,
    borderColor: LightGray,
    marginTop: 5,
    marginLeft: 15,
    marginRight: 15,
    paddingBottom: 10,
    paddingTop: 10
  },

  textGray: {
    color: LightGray,
    fontFamily: 'Manrope-Bold',
    fontSize: 14,

  },
  textBlue: {
    color: PrimaryColor,
    fontFamily: 'Manrope-Bold',
    fontSize: 14,

  },


})