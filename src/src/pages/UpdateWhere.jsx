import React from "react";
import { StyleSheet, View, Text, TouchableWithoutFeedback } from "react-native";
import { BackgroundColor, PrimaryColor, WhiteColor, LightGray } from "../constants/colors";
import { useNavigation } from "@react-navigation/native";
import { Checkbox, HelperText, Button, Dialog, Portal } from 'react-native-paper';
import { PrimaryButton } from "../components/Buttons";
import { useAppContext } from '../contexts/app_context';
import { UserRepository } from "../repositories/user_repository";
import { List } from 'react-native-paper';
import Icon from 'react-native-vector-icons/FontAwesome';


export function WhereWork() {
  const arrowIcon = <Icon name="chevron-right" size={15} color={LightGray} />;
  const appContext = useAppContext();
  const userRepository = new UserRepository()
  const [visible, setVisible] = React.useState(false);
  const [user, setUser] = React.useState();
  const [whereWork, setWhereWork] = React.useState();
  const [establishment, setEstablishment] = React.useState(true);
  const [home, setHome] = React.useState(false);
  const atLeastOneVerified = establishment || home
  const navigation = useNavigation();

  React.useEffect(() => {
    userRepository.get(appContext.user?.id, user => {
      setWhereWork(JSON.parse(user.onde_trabalha))
      setUser(user)
    })
  }, []);

  React.useEffect(() => {
    if (whereWork) {
      setEstablishment(whereWork.estabelecimento)
      setHome(whereWork.casa_cliente)

    }
  }, [whereWork]);

  const newWhereWork = {
    estabelecimento: establishment,
    casa_cliente: home
  }

  const saveWhereWork = () => {
    const newUser = { ...user }
    newUser.onde_trabalha = newWhereWork
    console.log(user)
    console.log(newUser.onde_trabalha.casa_cliente)
    if (whereWork.casa_cliente == true && newUser.onde_trabalha.casa_cliente == false) {
      setVisible(true)
    }
    else {
      //userRepository.update(newUser, () => {
      //navigation.navigate('Profile', {})
      //})
    }

  }

  return (
    <View style={styles.container}>
      <Portal>
        <Dialog visible={visible} onDismiss={() => setVisible(false)} style={{ backgroundColor: BackgroundColor }}>
          <Dialog.Content>
            <Text style={styles.textWhite}> Ao desmarcar a opção <Text style={styles.textBlue}>"Na casa do cliente"</Text>, todos os seus serviços cadastrados passarão a ser <Text style={styles.textBlue}>realizados no seu estabelecimento.</Text> Deseja confirmar essa alteração? </Text>
          </Dialog.Content>
          <Dialog.Actions>
            <Button onPress={() => setVisible(false)}><Text style={styles.textGray}>Cancelar</Text></Button>
            <Button onPress={() => console.log('Ok')}><Text style={styles.textBlue}>Confirmar</Text></Button>
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
                  navigation.navigate('Opening')
                }}
                right={() => arrowIcon}
              />
            </View>
          }
          <View style={styles.listItem}>
            <List.Item
              title={() => <Text style={styles.textWhite}>ALTERAR ENDEREÇO</Text>}
              onPress={() => {
                navigation.navigate('Services')
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
            saveWhereWork()
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