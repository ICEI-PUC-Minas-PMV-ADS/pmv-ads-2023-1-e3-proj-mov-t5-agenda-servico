import React from "react";
import { StyleSheet, View, Text, TouchableWithoutFeedback } from "react-native";
import { BackgroundColor, PrimaryColor, WhiteColor, LightGray } from "../constants/colors";
import { useNavigation } from "@react-navigation/native";
import { Checkbox, HelperText } from 'react-native-paper';
import { PrimaryButton } from "../components/Buttons";
import AsyncStorage from "@react-native-async-storage/async-storage"

export function WhereWork() {
  const [whereWork, setWhereWork] = React.useState();
  const [establishment, setEstablishment] = React.useState(true);
  const [home, setHome] = React.useState(false);
  const atLeastOneVerified = establishment || home
  const navigation = useNavigation();

  React.useEffect(() => {
    AsyncStorage.getItem('wherework').then(value => {
      if (value !== null) {
        setWhereWork(JSON.parse(value))
      }
    })
  }, []);

  React.useEffect(() => {
    if (whereWork) {
      setEstablishment(whereWork.establishment)
      setHome(whereWork.homeservice)

    }
  }, [whereWork]);

  const newWhereWork = {
    establishment: establishment,
    homeservice: home
  }

  const saveWhereWork = (destiny) => {
    const newData = JSON.stringify(newWhereWork)
    AsyncStorage.setItem('wherework', newData).then(
      navigation.navigate(destiny, {})
    )
  }

  return (
    <View style={styles.container}>
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
        <View style={{ alignItems: 'center' }}>
          <HelperText type="error" visible={!atLeastOneVerified}>
            Por favor, escolha pelo menos uma das opções acima
          </HelperText>
        </View>
        <PrimaryButton title={'Continuar'} onPress={() => {
          if (atLeastOneVerified)
            if (establishment) {
              saveWhereWork('CEP')
            } else {
              saveWhereWork('DisplacementFee')
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
    marginTop: 20,
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
  }


})