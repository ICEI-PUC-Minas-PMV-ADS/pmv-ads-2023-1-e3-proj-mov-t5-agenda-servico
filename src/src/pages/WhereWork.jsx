import React from "react";
import { StyleSheet, View, Text, TouchableWithoutFeedback } from "react-native";
import { BackgroundColor, PrimaryColor, WhiteColor, LightGray } from "../constants/colors";
import { useNavigation } from "@react-navigation/native";
import { Checkbox } from 'react-native-paper';
import { PrimaryButton } from "../components/Buttons";

export function WhereWork() {
  const [establishment, setEstablishment] = React.useState(false);
  const [home, setHome] = React.useState(false);
  const navigation = useNavigation();

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
      <PrimaryButton title={'Continuar'} onPress={() => { navigation.navigate('Who', {}) }} />
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