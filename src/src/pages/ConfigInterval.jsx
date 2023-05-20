import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { BackgroundColor, WhiteColor, LightGray } from "../constants/colors";
import { PrimaryButton, DeleteButton } from "../components/Buttons";
import { useNavigation, useRoute, useIsFocused } from "@react-navigation/native";
import { TimePicker } from '../components/TimePicker'
import AsyncStorage from "@react-native-async-storage/async-storage"
import Icon from 'react-native-vector-icons/FontAwesome';


export function Interval() {


  const navigation = useNavigation();
  const route = useRoute();
  const isFocused = useIsFocused()
  const dayIndex = route.params.dayIndex
  const intervalIndex = route.params.intervalIndex
  const [dataOpening, setDataOpening] = React.useState('')
  const [day, setDay] = React.useState('');
  const [nameDay, setNameDay] = React.useState('Day');
  const [interval, setInterval] = React.useState('');
  const deleteIcon = <Icon name="trash" size={20} />;
  const [start, setStart] = React.useState(``)
  const [startHours, setStartHours] = React.useState(``)
  const [startMinutes, setStartMinutes] = React.useState(``)
  const [end, setEnd] = React.useState(``)
  const [endHours, setEndHours] = React.useState(``)
  const [endMinutes, setEndMinutes] = React.useState(``)
  const [visibleOpening, setVisibleOpening] = React.useState(false)
  const [visibleClosure, setVisibleClosure] = React.useState(false)

  if (intervalIndex) {
    React.useEffect(() => {
      const carregarItem = async () => {
        const value = await AsyncStorage.getItem('opening');
        const convertedValue = JSON.parse(value)
        setDay(convertedValue[dayIndex]);
        setDataOpening(convertedValue)
        setInterval(convertedValue[dayIndex].breaks[intervalIndex])
      };

      carregarItem();
    }, []);

    React.useEffect(() => {
      if (interval) {
        setStart(`${addZeroes(interval.start.hours, 2)}:${addZeroes(interval.start.minutes, 2)}`)
        setEnd(`${addZeroes(interval.end.hours, 2)}:${addZeroes(interval.end.minutes, 2)}`)
        setStartHours(interval.start.hours)
        setStartMinutes(interval.start.minutes)
        setEndHours(interval.end.hours)
        setEndMinutes(interval.end.minutes)
        setNameDay(day.day)
      }
    }, [interval]);
  }

  else {
    React.useEffect(() => {
      const carregarItem = async () => {
        const value = await AsyncStorage.getItem('opening');
        const convertedValue = JSON.parse(value)
        setDay(convertedValue[dayIndex]);
        setDataOpening(convertedValue)
      };

      carregarItem();
    }, []);

    React.useEffect(() => {
      if (day) {
        setStart('12:00')
        setEnd('13:00')
        setStartHours(12)
        setStartMinutes(0)
        setEndHours(13)
        setEndMinutes(0)
        setNameDay(day.day)
      }
    }, [day]);

  }



  navigation.setOptions({
    headerTitle: `Intervalo • ${nameDay}`,
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



  const onDismissOpening = React.useCallback(() => {
    setVisibleOpening(false)
  }, [setVisibleOpening])

  const onConfirmOpening = React.useCallback(
    ({ hours, minutes }) => {
      const time = `${addZeroes(hours, 2)}:${addZeroes(minutes, 2)}`
      setVisibleOpening(false);
      setStart(time);
      setStartHours(hours)
      setStartMinutes(minutes)
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
      setEndHours(hours)
      setEndMinutes(minutes)
    },
    [setVisibleClosure]
  );

  const newInterval = {
    start: {
      hours: startHours,
      minutes: startMinutes
    },
    end: {
      hours: endHours,
      minutes: endMinutes
    }
  }

  const onUpdate = () => {
    const copy = [...dataOpening]
    copy[dayIndex].breaks[intervalIndex] = newInterval
    const newData = JSON.stringify(copy)
    AsyncStorage.setItem('opening', newData).then(
      navigation.navigate('Day', { dayIndex: dayIndex })
    )
  };

  const createInterval = () => {
    const copy = [...dataOpening]
    copy[dayIndex].breaks.push(newInterval)
    const newData = JSON.stringify(copy)
    AsyncStorage.setItem('opening', newData).then(
      navigation.navigate('Day', { dayIndex: dayIndex })
    )
  }

  function buttonDelete() {
    if (intervalIndex != undefined)
      return (
        <View style={{ flex: 1 }}>
          <DeleteButton title={deleteIcon} onPress={() => { onDelete() }} />
        </View>
      )
  }

  const onDelete = () => {
    const copy = [...dataOpening]
    copy[dayIndex].breaks.splice(intervalIndex, 1)
    const newData = JSON.stringify(copy)
    AsyncStorage.setItem('opening', newData).then(
      navigation.navigate('Day', { dayIndex: dayIndex })
    )
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
            hours={startHours}
            minutes={startMinutes}
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
            hours={endHours}
            minutes={endMinutes}
          />
        </View>
      </View>

      <View style={styles.buttonContainer}>
        <>{buttonDelete()}</>
        <View style={{ flex: 2 }}>
          <PrimaryButton title={'Salvar'} onPress={() => {
            if (intervalIndex != undefined) {
              onUpdate()
            }
            else {
              createInterval()
            }

          }} />
        </View>
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
    marginBottom: 10,
    flexDirection: 'row'
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