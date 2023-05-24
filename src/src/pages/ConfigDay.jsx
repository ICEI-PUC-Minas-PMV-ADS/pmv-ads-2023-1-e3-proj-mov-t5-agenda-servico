import React from "react";
import { StyleSheet, Text, View, FlatList, TouchableOpacity } from "react-native";
import { BackgroundColor, WhiteColor, LightGray, PrimaryColor } from "../constants/colors";
import { PrimaryButton } from "../components/Buttons";
import { useNavigation, useRoute, useIsFocused } from "@react-navigation/native";
import Icon from 'react-native-vector-icons/FontAwesome';
import { List, Switch } from 'react-native-paper';
import { TimePicker } from '../components/TimePicker'
import AsyncStorage from "@react-native-async-storage/async-storage"



export function Day() {
  //declarando variaveis necessarias
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
      const value = await AsyncStorage.getItem('opening');
      const convertedValue = JSON.parse(value)
      setItem(convertedValue[dayIndex]);
      setDataOpening(convertedValue)
    };

    carregarItem();
  }, [isFocused]);

  React.useEffect(() => {
    if (item) {
      setIsSwitchOn(item.open)
      setOpening(`${addZeroes(item.opening.hours, 2)}:${addZeroes(item.opening.minutes, 2)}`)
      setClosure(`${addZeroes(item.closure.hours, 2)}:${addZeroes(item.closure.minutes, 2)}`)
      setOpeningHours(item.opening.hours);
      setOpeningMinutes(item.opening.minutes);
      setClosureHours(item.closure.hours);
      setClosureMinutes(item.closure.minutes);
      setDay(item.day)
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
  });



  const [isSwitchOn, setIsSwitchOn] = React.useState();

  const nameSwitch = React.useMemo(() => {
    if (isSwitchOn == true) {
      return 'Aberto'
    }
    else return 'Fechado'
  }, [isSwitchOn]);

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
    day: item.day,
    open: isSwitchOn,
    opening: {
      hours: openingHours,
      minutes: openingMinutes
    },
    closure: {
      hours: closureHours,
      minutes: closureMinutes
    },
    breaks: item.breaks
  }

  const onUpdate = () => {

    const copy = [...dataOpening]
    copy[dayIndex] = newItemData
    const newData = JSON.stringify(copy)
    AsyncStorage.setItem('opening', newData).then(
      navigation.navigate('Opening', {})
    )


  };



  const navigateToInterval = (index) => {
    navigation.navigate('Interval', { ...route.params, intervalIndex: index });
  }

  return (


    <View style={styles.container}>
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
                    onPress={() => { navigation.navigate('Interval', { ...route.params }) }}
                    left={() => plusIcon}
                  />
                </View>
                <FlatList
                  data={item.breaks}
                  renderItem={({ item, index }) =>
                    <TouchableOpacity onPress={() => navigateToInterval(index)}>
                      <Item startHours={item.start.hours} startMinutes={item.start.minutes} endHours={item.end.hours} endMinutes={item.end.minutes} />
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
          onUpdate(item.id)
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