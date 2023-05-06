import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { BackgroundColor, WhiteColor, LightGray } from "../constants/colors";
import { PrimaryButton } from "../components/Buttons";
import { useNavigation, useRoute,  useIsFocused } from "@react-navigation/native";
import { TimePicker } from '../components/TimePicker'


export function Interval() {
  

  const navigation = useNavigation();
  const route = useRoute();

  const [day, setDay] = React.useState(route.params.day);

  const interval = route.params.interval



  navigation.setOptions({
    headerTitle: `Intervalo • ${day.day}`,
  });

  function addZeroes(num, len) {
    var numberWithZeroes = String(num);
    var counter = numberWithZeroes.length;
    while (counter < len) {
      numberWithZeroes = "0" + numberWithZeroes;
      counter++;
    }
    return numberWithZeroes;
  }

  const [start, setStart] = React.useState(`${interval.start}`)
  const [end, setEnd] = React.useState(`${interval.end}`)
  const [visibleOpening, setVisibleOpening] = React.useState(false)
  const [visibleClosure, setVisibleClosure] = React.useState(false)

  const onDismissOpening = React.useCallback(() => {
    setVisibleOpening(false)
  }, [setVisibleOpening])

  const onConfirmOpening = React.useCallback(
    ({ hours, minutes }) => {
      const time = `${addZeroes(hours, 2)}:${addZeroes(minutes, 2)}`
      setVisibleOpening(false);
      setStart(time);
    },
    [setVisibleOpening]
  );

  const onDismissClosure = React.useCallback(() => {
    setVisibleClosure(false)
  }, [setVisibleClosure])

  const onConfirmClosure = React.useCallback(
    ({ hours, minutes }) => {
      const time = `${addZeroes(hours, 2)}:${addZeroes(minutes, 2)}`
      setVisibleClosure(false);
      setEnd(time);
    },
    [setVisibleClosure]
  );

  const newInterval = {
    id: interval.id,
    start: start,
    end: end
  }

  const onUpdate = (id) => {
    const newData = {
      ...day,
      breaks: day.breaks.map((item) => {
        if (item.id === id) {
          return newInterval;
        } else {
          return item;
        }
      }),
    };
    console.log(newData);
  };

  return (

    <View style={styles.container}>

      <View style={{ alignItems: 'center', justifyContent: 'center' }}>
        <Text style={styles.whiteText}> Defina seu intervalo aqui. </Text>
      </View>
      <View style={styles.timeContainer}>
        <View style={styles.buttonTimeContainer}>
          <Text style={styles.whiteText}>Início</Text>
          <PrimaryButton title={start} onPress={() => setVisibleOpening(true)} />
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
          <PrimaryButton title={end} onPress={() => setVisibleClosure(true)} />
          <TimePicker
            visible={visibleClosure}
            onDismiss={onDismissClosure}
            onConfirm={onConfirmClosure}
            hours={18}
            minutes={0}
          />
        </View>
      </View>

      <View style={styles.buttonContainer}>
        <PrimaryButton title={'OK'} onPress={() => {
          onUpdate(interval.id)
          navigation.navigate('Day', { ...route.params })
        }} />
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