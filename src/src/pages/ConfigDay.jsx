import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { BackgroundColor, WhiteColor, LightGray } from "../constants/colors";
import { PrimaryButton } from "../components/Buttons";
import { useNavigation } from "@react-navigation/native";
import Icon from 'react-native-vector-icons/FontAwesome';
import { List } from 'react-native-paper';
import { TimePicker } from '../components/TimePicker'



export function Day() {
  const arrowIcon = <Icon name="chevron-right" size={15} color={WhiteColor} />;
  const plusIcon = <Icon name="plus" size={15} color={WhiteColor} />
  const navigation = useNavigation();

  function addZeroes(num, len) {
    var numberWithZeroes = String(num);
    var counter = numberWithZeroes.length;
    while (counter < len) {
      numberWithZeroes = "0" + numberWithZeroes;
      counter++;
    }
    return numberWithZeroes;
  }

  const [opening, setOpening] = React.useState('            09:00            ')
  const [closure, setClosure] = React.useState('            18:00            ')
  const [visibleOpening, setVisibleOpening] = React.useState(false)
  const [visibleClosure, setVisibleClosure] = React.useState(false)

  const onDismissOpening = React.useCallback(() => {
    setVisibleOpening(false)
  }, [setVisibleOpening])

  const onConfirmOpening = React.useCallback(
    ({ hours, minutes }) => {
      const time = `            ${addZeroes(hours, 2)}:${addZeroes(minutes, 2)}            `
      setVisibleOpening(false);
      setOpening(time);
    },
    [setVisibleOpening]
  );

  const onDismissClosure = React.useCallback(() => {
    setVisibleClosure(false)
  }, [setVisibleClosure])

  const onConfirmClosure = React.useCallback(
    ({ hours, minutes }) => {
      const time = `            ${addZeroes(hours, 2)}:${addZeroes(minutes, 2)}            `
      setVisibleClosure(false);
      setClosure(time);
    },
    [setVisibleClosure]
  );
  return (

    <View style={styles.container}>
      <View>
        <View style={{ alignItems: 'center', justifyContent: 'center' }}>
          <Text style={styles.whiteText}> Defina seu horário de trabalho aqui. </Text>
        </View>
        <View style={styles.timeContainer}>
          <View style={styles.buttonTimeContainer}>
            <Text style={styles.whiteText}> Início</Text>
            <PrimaryButton title={opening} onPress={() => setVisibleOpening(true)} />
            <TimePicker
              visible={visibleOpening}
              onDismiss={onDismissOpening}
              onConfirm={onConfirmOpening}
              hours={9}
              minutes={0}
            />
          </View>
          <Text style={styles.whiteText}>-</Text>
          <View style={styles.buttonTimeContainer}>
            <Text style={styles.whiteText}>Término</Text>
            <PrimaryButton title={closure} onPress={() => setVisibleClosure(true)} />
            <TimePicker
              visible={visibleClosure}
              onDismiss={onDismissClosure}
              onConfirm={onConfirmClosure}
              hours={18}
              minutes={0}
            />
          </View>
        </View>
        <View style={{ marginTop: 40 }}>
          <Text style={styles.whiteText}> Intervalos </Text>
          <View style={styles.listItem}>
            <List.Item
              title={() => <Text style={styles.whiteText}>Adicionar intervalo</Text>}
              onPress={() => { navigation.navigate('Interval', {}) }}
              left={() => plusIcon}
            />
          </View>
        </View>
      </View>
      <View style={styles.buttonContainer}>
        <PrimaryButton title={'OK'} onPress={() => { navigation.navigate('Opening', {}) }} />
      </View>
    </View >


  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: BackgroundColor,
    padding: 10,
    justifyContent: "space-between"
  },
  buttonContainer: {
    marginBottom: 10
  },
  whiteText: {
    color: WhiteColor,
    fontFamily: 'Manrope-Bold',
    fontSize: 14
  },
  timeContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    marginTop: 20,
    alignItems: 'center',
    borderBottomWidth: 1,
    borderColor: LightGray,
    padding: 20
  },
  buttonTimeContainer: {
    flexDirection: 'column',
    alignItems: 'center',

  },
  listItem: {
    borderBottomWidth: 1,
    borderColor: LightGray,
    marginTop: 5,
    padding: 10
  },

})