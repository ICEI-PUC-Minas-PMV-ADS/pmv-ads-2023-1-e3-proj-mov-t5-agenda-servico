import React, { useState } from "react";
import { StyleSheet, Text, View, TouchableWithoutFeedback } from "react-native";
import { BackgroundColor, WhiteColor, LightGray, BackgroundInput } from "../constants/colors";
import { PrimaryButton } from "../components/Buttons";
import { useNavigation, useRoute, useIsFocused } from "@react-navigation/native";
import { TimeTextPicker } from "../components/TimeTextPicker";
import { OtherInput } from "../components/OtherInput";
import { Checkbox } from 'react-native-paper';
import Icon from 'react-native-vector-icons/FontAwesome';
import { DeleteButton } from "../components/Buttons";
import AsyncStorage from "@react-native-async-storage/async-storage"

export function ServiceDetails() {
  const deleteIcon = <Icon name="trash" size={20} />;
  const navigation = useNavigation();
  const route = useRoute()
  const isFocused = useIsFocused()
  const [name, setName] = useState('')
  const [price, setPrice] = useState('')
  const [startAt, setStartAt] = useState(false);
  const [residence, setResidence] = useState(false);
  const [time, setTime] = useState('')
  const [hours, setHours] = useState('')
  const [minutes, setMinutes] = useState('')
  const [id, setId] = useState('')

  const [services, setServices] = useState('')
  const serviceIndex = route.params.serviceIndex
  const [service, setService] = useState('')

  if (serviceIndex != undefined) {
    React.useEffect(() => {
      const loadServices = async () => {
        const value = await AsyncStorage.getItem('services');
        const convertedValue = JSON.parse(value)
        setServices(convertedValue)
        setService(convertedValue[serviceIndex])

      };

      loadServices();
    }, []);

    React.useEffect(() => {
      if (service) {
        setName(service.name)
        setPrice(service.price)
        setStartAt(service.startin)
        setResidence(service.homeservice)
        setHours(service.duration.hours)
        setMinutes(service.duration.minutes)
        setId(service.id)
        setTime(`${hoursConvert(service.duration.hours)} ${minutesConvert(service.duration.minutes)}`)
      }
    }, [service]);
  }
  else {
    React.useEffect(() => {
      const loadServices = async () => {
        const value = await AsyncStorage.getItem('services');
        const convertedValue = JSON.parse(value)
        setServices(convertedValue)
      };

      loadServices();
    }, []);


    React.useEffect(() => {
      if (services) {

        setName()
        setPrice()
        setStartAt()
        setResidence()
        setTime()

        const maiorId = services.reduce((maior, objeto) => {
          const id = parseInt(objeto.id);
          if (id > parseInt(maior.id)) {
            return objeto;
          }
          return maior;
        });

        const novoId = (parseInt(maiorId.id) + 1).toString();

        setId(novoId)

      }
    }, [services]);

  }


  const hoursConvert = (hours) => {
    if (hours == 0) {
      return ('')
    }
    else {
      return (`${hours}h`)
    }
  }

  const minutesConvert = (minutes) => {
    if (minutes == 0) {
      return ('')
    }
    else {
      return (`${minutes}min`)
    }
  }



  const newService = {
    id: id,
    name: name,
    duration: {
      hours: hours,
      minutes: minutes
    },
    price: price,
    startin: startAt,
    homeservice: residence,
  }

  const onUpdate = () => {
    const copy = [...services]
    copy[serviceIndex] = newService
    const newData = JSON.stringify(copy)
    AsyncStorage.setItem('services', newData).then(
      navigation.navigate('Services', {})
    )
  };

  const createService = () => {
    const copy = [...services]
    copy.push(newService)
    const newData = JSON.stringify(copy)
    AsyncStorage.setItem('services', newData).then(
      navigation.navigate('Services', {})
    )
  }

  const onDelete = () => {
    const copy = [...services]
    copy.splice(serviceIndex, 1)
    const newData = JSON.stringify(copy)
    AsyncStorage.setItem('services', newData).then(
      navigation.navigate('Services', {})
    )
  };


  function buttonDelete() {
    if (serviceIndex != undefined)
      return (
        <View style={{ flex: 1 }}>
          <DeleteButton title={deleteIcon} onPress={() => { onDelete() }} />
        </View>
      )
  }

  return (

    <View style={styles.container}>
      <View>
        <View style={{ alignItems: 'center', justifyContent: 'center' }}>
          <Text style={styles.whiteText}> Adicione as informações básicas para este serviço agora. Você poderá adicionar uma descrição e ajustar as cofigurações avançadas para este serviço posteriormente. </Text>
        </View>
        <View>
          <View style={{ marginTop: 20 }}>
            <OtherInput
              label="Nome do serviço"
              value={name}
              onChangeText={text => setName(text)}
            />
          </View>
          <View style={{ marginTop: 20 }}>
            <TimeTextPicker
              inputLabel='Duração'
              time={time}
              setTime={setTime}
              onTimeChange={(newTime) => {
                setHours(newTime.hours)
                setMinutes(newTime.minutes)
              }}
            />
          </View>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <View style={{ flex: 1, marginTop: 20 }}>
              <OtherInput
                label="Preço"
                value={price}
                onChangeText={text => setPrice(text)}
                keyboardType='numeric'
              />
            </View>
            <View style={{ flex: 1, marginTop: 20 }}>
              <TouchableWithoutFeedback onPress={() => {
                setStartAt(!startAt);
              }}>
                <View style={styles.checkbox}>
                  <Checkbox
                    color={WhiteColor}
                    status={startAt ? 'checked' : 'unchecked'}
                  />
                  <Text style={styles.whiteText}>Começa em</Text>
                </View>
              </TouchableWithoutFeedback>
            </View>
          </View>
          <View>
            <TouchableWithoutFeedback onPress={() => {
              setResidence(!residence);
            }}>
              <View style={styles.checkItemContainer}>
                <View style={styles.checkbox}>
                  <Checkbox
                    color={WhiteColor}
                    status={residence ? 'checked' : 'unchecked'}
                  />
                  <Text style={styles.whiteText}>   Atendimento em Domicílio</Text>
                </View>
              </View>
            </TouchableWithoutFeedback>
          </View>
        </View>
      </View>

      <View style={styles.buttonContainer}>
        <>{buttonDelete()}</>
        <View style={{ flex: 2 }}>
          <PrimaryButton title={'Salvar'} onPress={() => {
            if (serviceIndex != undefined)
              onUpdate()
            else
              createService()
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
  checkbox: {
    flexDirection: "row",
    alignItems: 'center',
  },
  checkItemContainer: {
    flexDirection: "column",
    borderBottomWidth: 1,
    borderBottomColor: LightGray,
    marginTop: 20,
    paddingBottom: 8,
    paddingTop: 8
  },

})