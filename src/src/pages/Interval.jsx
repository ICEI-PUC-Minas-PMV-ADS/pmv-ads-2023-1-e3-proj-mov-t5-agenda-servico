import React from "react";
import { StyleSheet, Text, View, TouchableOpacity, Image } from "react-native";
import { BackgroundColor, WhiteColor, LightGray } from "../constants/colors";
import { PrimaryButton, DeleteButton } from "../components/Buttons";
import { useNavigation, useRoute, useIsFocused } from "@react-navigation/native";
import { TimePicker } from '../components/TimePicker'
import Icon from 'react-native-vector-icons/FontAwesome';
import { useAppContext } from '../contexts/app_context';
import { UserRepository } from "../repositories/user_repository";

const DayHeader = ({ day, nav }) => {
  const navigation = useNavigation();

  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: `Intervalo • ${day}`,
      headerLeft: () => (
        <TouchableOpacity onPress={nav}>
          <Image source={require('../../assets/images/seta-pequena-esquerda.png')} style={{ width: 25, height: 25, marginRight: 25 }} />
        </TouchableOpacity>
      ),
    });
  }, [navigation, day]);

  return null;
};

export function Intervalo() {
  const appContext = useAppContext();
  const userRepository = new UserRepository()
  const [user, setUser] = React.useState('');
  const navigation = useNavigation();
  const route = useRoute();
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


  if (intervalIndex != undefined) {
    React.useEffect(() => {
      const carregarItem = async () => {
        userRepository.get(appContext.user?.id, user => {
          const data = JSON.parse(user.lista_de_horarios)
          setDataOpening(data)
          setDay(data[dayIndex])
          setInterval(data[dayIndex].intervalos[intervalIndex])
          setUser(user)
        })
      };
      carregarItem();
    }, []);

    React.useEffect(() => {
      if (interval) {
        setStart(`${addZeroes(interval.inicio.horas, 2)}:${addZeroes(interval.inicio.minutos, 2)}`)
        setEnd(`${addZeroes(interval.fim.horas, 2)}:${addZeroes(interval.fim.minutos, 2)}`)
        setStartHours(interval.inicio.horas)
        setStartMinutes(interval.inicio.minutos)
        setEndHours(interval.fim.horas)
        setEndMinutes(interval.fim.minutos)
        setNameDay(day.dia)
      }
    }, [interval]);
  }

  else {
    React.useEffect(() => {
      const carregarItem = async () => {
        userRepository.get(appContext.user?.id, user => {
          const data = JSON.parse(user.lista_de_horarios)
          setDataOpening(data)
          setDay(data[dayIndex])
          setUser(user)
        })
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
        setNameDay(day.dia)
      }
    }, [day]);

  }


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
    inicio: {
      horas: startHours,
      minutos: startMinutes
    },
    fim: {
      horas: endHours,
      minutos: endMinutes
    }
  }
  const goToDay = () => {
    navigation.navigate('Day', { dayIndex: dayIndex })
  };


  const onUpdate = () => {
    const newUser = {...user}
    const copy = [...dataOpening]
    copy[dayIndex].intervalos[intervalIndex] = newInterval
    newUser.lista_de_horarios = copy

    userRepository.update(newUser, () => {
      goToDay()
    })
  };

  const createInterval = () => {
    const newUser = {...user}
    const copy = [...dataOpening]
    copy[dayIndex].intervalos.push(newInterval)
    newUser.lista_de_horarios = copy

    userRepository.update(newUser, () => {
      goToDay()
    })
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
    const newUser = {...user}
    const copy = [...dataOpening]
    copy[dayIndex].intervalos.splice(intervalIndex, 1)
    newUser.lista_de_horarios = copy

    userRepository.update(newUser, () => {
      goToDay()
    })

  };

  return (

    <View style={styles.container}>
      <DayHeader day={nameDay} nav={goToDay} />
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