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
    }, [isFocused]);

    React.useEffect(() => {
      if (interval) {
        setStart(interval.start)
        setEnd(interval.end)
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
    }, [isFocused]);

    React.useEffect(() => {
      if (day) {
        setStart('09:00')
        setEnd('18:00')
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

  const [start, setStart] = React.useState(``)
  const [end, setEnd] = React.useState(``)
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
        <>{buttonDelete()}</>
        <View style={{ flex: 2 }}>
          <PrimaryButton title={'Salvar'} onPress={() => {
            if (intervalIndex)
              onUpdate()
            else
              createInterval()
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