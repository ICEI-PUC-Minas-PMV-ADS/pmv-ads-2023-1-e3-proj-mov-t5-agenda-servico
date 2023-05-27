import React from "react";
import { StyleSheet, View } from "react-native";
import { BackgroundColor, PrimaryColor, WhiteColor } from "../constants/colors";
import { PrimaryButton } from "../components/Buttons";
import { useNavigation } from "@react-navigation/native";
import { Text } from 'react-native-paper';
import AsyncStorage from "@react-native-async-storage/async-storage";

export function WhoYou() {

  const navigation = useNavigation()

  return (
    <View style={styles.container}>
      <View style={styles.textContainer}>
        <Text style={styles.textTitle}>A <Text style={styles.textTitleBlue}>Agenda Serviço</Text> permite que clientes encontrem profissionais e agende serviços, bem como permite que esses profissionais divulguem seus trabalhos. </Text>
      </View>

      <View style={styles.buttonContainer}>
        <Text style={styles.textSub}>Quem é você?</Text>
        <PrimaryButton title={'Sou um cliente'} onPress={() => {
          AsyncStorage.setItem('type', 'cliente').then(
            navigation.navigate('About', { type: 'cliente' })
          )
        }} />

        <PrimaryButton title={'Sou um profissional'} onPress={() => {
          AsyncStorage.setItem('type', 'prestador').then(
            navigation.navigate('About', { type: 'prestador' })
          )
        }} />
      </View>
    </View>
  )
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: BackgroundColor,
    justifyContent: "space-between"
  },

  textTitle: {
    color: WhiteColor,
    textAlign: 'center',
    fontFamily: 'Manrope-Bold',
    fontSize: 26,
  },

  textTitleBlue: {
    color: PrimaryColor,
    textAlign: 'center',
    fontFamily: 'Manrope-Bold',
    fontSize: 26,
  },

  textSub: {
    textAlign: 'center',
    color: PrimaryColor,
    fontFamily: 'Manrope-Bold',
    fontSize: 16
  },

  buttonContainer: {
    marginBottom: 50
  },

  textContainer: {
    marginTop: 50
  }

})