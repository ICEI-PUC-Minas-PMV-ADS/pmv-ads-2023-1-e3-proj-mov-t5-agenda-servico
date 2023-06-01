import React from "react";
import { StyleSheet, Text, View, FlatList, TouchableOpacity, Image } from "react-native";
import { BackgroundColor, WhiteColor, LightGray, PrimaryColor } from "../constants/colors";
import { PrimaryButton } from "../components/Buttons";
import { useNavigation, useRoute, useIsFocused } from "@react-navigation/native";
import Icon from 'react-native-vector-icons/FontAwesome';
import { List, Switch } from 'react-native-paper';
import { TimePicker } from '../components/TimePicker'
import { useAppContext } from '../contexts/app_context';
import { UserRepository } from "../repositories/user_repository";

const DayHeader = ({ isSwitchOn, onToggleSwitch, day }) => {
  const navigation = useNavigation();
  const nameSwitch = isSwitchOn ? 'Aberto' : 'Fechado';

  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: day,
      headerRight: () => (
        <View style={{ marginRight: 5, flexDirection: 'column', alignItems: 'center' }}>
          <Switch value={isSwitchOn} onValueChange={onToggleSwitch} color={PrimaryColor} />
          <Text style={{
            color: LightGray,
            fontFamily: 'Manrope-Bold',
            fontSize: 12
          }}>{nameSwitch}</Text>
        </View>
      ),
      headerLeft: () => (
        <TouchableOpacity onPress={() => navigation.navigate('Opening', {})}>
          <Image source={require('../../assets/images/seta-pequena-esquerda.png')} style={{ width: 25, height: 25, marginRight: 25 }} />
        </TouchableOpacity>
      ),
    });
  }, [navigation, isSwitchOn, onToggleSwitch, day]);

  return null;
};

export function Day() {
  //declarando variaveis necessarias

  const appContext = useAppContext();
  const [user, setUser] = React.useState()
  const userRepository = new UserRepository()
  const route = useRoute();
  const navigation = useNavigation();
  const isFocused = useIsFocused();
  const arrowIcon = <Icon name="chevron-right" size={15} color={WhiteColor} />;
  const plusIcon = <Icon name="plus" size={15} color={WhiteColor} />

  //resgatando dados
  const [dataOpening, setDataOpening] = React.useState('')
  const dayIndex = route.params.dayIndex
  const [item, setItem] = React.useState('')
  const [day, setDay] = React.useState('Day')

  React.useEffect(() => {
    const carregarItem = async () => {
      userRepository.get(appContext?.user?.id, user => {
        const data = JSON.parse(user.lista_de_horarios)
        setDataOpening(data)
        setItem(data[dayIndex])
        setUser(user)
        userRepository.getAll((users) => {
          //const data = JSON.parse(users)
          console.log(users)
          //data.filter(service => service.prestador_servico_fk == appContext.user?.id)
        })
      })
    };

    carregarItem();
  }, [isFocused]);

  React.useEffect(() => {
    if (item) {
      setIsSwitchOn(item.aberto)
      setOpening(`${addZeroes(item.inicio.horas, 2)}:${addZeroes(item.inicio.minutos, 2)}`)
      setClosure(`${addZeroes(item.fim.horas, 2)}:${addZeroes(item.fim.minutos, 2)}`)
      setOpeningHours(item.inicio.horas);
      setOpeningMinutes(item.inicio.minutos);
      setClosureHours(item.fim.horas);
      setClosureMinutes(item.fim.minutos);
      setDay(item.dia)
    }
  }, [item]);

  const Item = ({ startHours, startMinutes, endHours, endMinutes }) => {
    return (
      <View style={styles.listItem}>
        <List.Item
          title={() => <Text style={styles.whiteText}>{addZeroes(startHours, 2)}:{addZeroes(startMinutes, 2)}  -  {addZeroes(endHours, 2)}:{addZeroes(endMinutes, 2)}</Text>}
          right={() => arrowIcon}
        />
      </View>
    )
  }


  const [isSwitchOn, setIsSwitchOn] = React.useState();

  const onToggleSwitch = () => { setIsSwitchOn(!isSwitchOn); }

  function addZeroes(num, len) {
    var numberWithZeroes = String(num);
    var counter = numberWithZeroes.length;
    while (counter < len) {
      numberWithZeroes = "0" + numberWithZeroes;
      counter++;
    }
    return numberWithZeroes;
  }

  const [opening, setOpening] = React.useState()
  const [closure, setClosure] = React.useState()
  const [closureHours, setClosureHours] = React.useState()
  const [closureMinutes, setClosureMinutes] = React.useState()
  const [openingHours, setOpeningHours] = React.useState()
  const [openingMinutes, setOpeningMinutes] = React.useState()
  const [visibleOpening, setVisibleOpening] = React.useState(false)
  const [visibleClosure, setVisibleClosure] = React.useState(false)

  const onDismissOpening = React.useCallback(() => {
    setVisibleOpening(false)
  }, [setVisibleOpening])

  const onConfirmOpening = React.useCallback(
    ({ hours, minutes }) => {
      const time = `${addZeroes(hours, 2)}:${addZeroes(minutes, 2)}`
      setVisibleOpening(false);
      setOpening(time);
      setOpeningHours(hours);
      setOpeningMinutes(minutes);
      console.log(hours)
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
      setClosure(time);
      setClosureHours(hours);
      setClosureMinutes(minutes);
    },
    [setVisibleClosure]
  );

  const newItemData = {
    dia: item.dia,
    aberto: isSwitchOn,
    inicio: {
      horas: openingHours,
      minutos: openingMinutes
    },
    fim: {
      horas: closureHours,
      minutos: closureMinutes
    },
    intervalos: item.intervalos
  }


  const onUpdate = () => {
    const newUser = { ...user }
    const copy = [...dataOpening]
    copy[dayIndex] = newItemData
    newUser.lista_de_horarios = copy

    console.log(user)
    //userRepository.update(newUser, () => {
    //navigation.navigate('Opening', {})
    //})

  };

  const updateInterval = (index) => {
    const newUser = { ...user }
    const copy = [...dataOpening]
    copy[dayIndex] = newItemData
    newUser.lista_de_horarios = copy

    userRepository.update(newUser, () => {
      navigateToInterval(index)
    })

  };

  const newInterval = () => {
    const newUser = { ...user }
    const copy = [...dataOpening]
    copy[dayIndex] = newItemData
    newUser.lista_de_horarios = copy

    userRepository.update(newUser, () => {
      navigateToInterval()
    })

  };

  const navigateToInterval = (index) => {
    navigation.navigate('Intervalo', { ...route.params, intervalIndex: index });
  }

  return (


    <View style={styles.container}>
      <DayHeader isSwitchOn={isSwitchOn} onToggleSwitch={onToggleSwitch} day={day} />
      <View>
        {
          isSwitchOn &&
          <View>
            <View style={{ alignItems: 'center', justifyContent: 'center', marginTop: 10 }}>
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
                  hours={openingHours}
                  minutes={openingMinutes}
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
                  hours={closureHours}
                  minutes={closureMinutes}
                />
              </View>
            </View>
            <View style={{ marginTop: 40 }}>
              <Text style={styles.whiteText}> Intervalos </Text>
              <View>
                <View style={styles.listItem}>
                  <List.Item
                    title={() => <Text style={styles.whiteText}>Adicionar intervalo</Text>}
                    onPress={() => {
                      newInterval()
                    }}
                    left={() => plusIcon}
                  />
                </View>
                <FlatList
                  data={item.intervalos}
                  renderItem={({ item, index }) =>
                    <TouchableOpacity onPress={() => {
                      updateInterval(index)
                    }}>
                      <Item startHours={item.inicio.horas} startMinutes={item.inicio.minutos} endHours={item.fim.horas} endMinutes={item.fim.minutos} />
                    </TouchableOpacity>
                  }

                />
              </View>
            </View>
          </View>
        }
      </View>
      <View style={styles.buttonContainer}>
        <PrimaryButton title={'Salvar'} onPress={() => {
          onUpdate()
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