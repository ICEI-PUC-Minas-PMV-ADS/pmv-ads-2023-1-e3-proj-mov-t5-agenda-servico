import React, { useState } from "react";
import { StyleSheet, Text, View, TouchableWithoutFeedback } from "react-native";
import { BackgroundColor, WhiteColor, LightGray, PrimaryColor } from "../constants/colors";
import { PrimaryButton } from "../components/Buttons";
import { useNavigation, useRoute } from "@react-navigation/native";
import { TextPicker } from "../components/TextPicker";
import { TimeTextPicker } from "../components/TimeTextPicker";
import { OtherInput } from "../components/OtherInput";
import { Checkbox, HelperText, ActivityIndicator } from 'react-native-paper';
import Icon from 'react-native-vector-icons/FontAwesome';
import { DeleteButton } from "../components/Buttons";
import AsyncStorage from "@react-native-async-storage/async-storage"
import { CategoryRepository } from "../repositories/category_repository";

export function ServiceDetails() {
  const deleteIcon = <Icon name="trash" size={20} />;
  const navigation = useNavigation();
  const route = useRoute()
  const [loading, setLoading] = React.useState(true)

  const [name, setName] = useState('')
  const [description, setDescription] = useState('')
  const [price, setPrice] = useState('')
  const [residence, setResidence] = useState(false);
  const [time, setTime] = useState('')
  const [hours, setHours] = useState('')
  const [minutes, setMinutes] = useState('')
  const [where, setWhere] = useState('')
  const [home, setHome] = React.useState(true);

  const [services, setServices] = useState('')
  const serviceIndex = route.params.serviceIndex
  const [service, setService] = useState('')
  const [type, setType] = useState('Selecione uma categoria');
  const [types, setTypes] = useState([]);
  const [idType, setIdType] = useState('')



  if (serviceIndex != undefined) {
    React.useEffect(() => {
      const loadServices = async () => {
        const value = await AsyncStorage.getItem('services');
        const convertedValue = JSON.parse(value)
        setServices(convertedValue)
        setService(convertedValue[serviceIndex])
      };

      const loadType = async () => {
        const value = await AsyncStorage.getItem('wherework');
        const convertedValue = JSON.parse(value)
        setWhere(convertedValue)
      };

      loadServices();
      loadType();
    }, []);

    React.useEffect(() => {
      if (service) {
        setName(service.name)
        setPrice(service.price)
        setDescription(service.description)
        setResidence(service.homeservice)
        setHours(service.duration.hours)
        setMinutes(service.duration.minutes)
        setTime(`${hoursConvert(service.duration.hours)} ${minutesConvert(service.duration.minutes)}`)
        setIdType(service.category)



        const repository = new CategoryRepository();
        repository.getAll((categorys) => {
          setTypes(categorys)
          setType(categorys.find(type => type.id == service.category).titulo)
          setLoading(false)
        })

      }
    }, [service]);

    React.useEffect(() => {
      if (where.homeservice == true) {
        setHome(true)
      }
      else {
        setHome(false)
        setResidence(false)
      }
    }, [where]);
  }
  else {
    React.useEffect(() => {
      const loadServices = async () => {
        const value = await AsyncStorage.getItem('services');
        const convertedValue = JSON.parse(value)
        setServices(convertedValue)
      };

      const loadType = async () => {
        const value = await AsyncStorage.getItem('wherework');
        const convertedValue = JSON.parse(value)
        setWhere(convertedValue)


      };
      const loadCategorys = () => {
        const repository = new CategoryRepository();
        repository.getAll((categorys) => {
          setTypes(categorys)
          setType(categorys[0].titulo)
          setLoading(false)
        })
      }

      loadCategorys();
      loadServices();
      loadType()
    }, []);


    React.useEffect(() => {
      if (services) {
        setName()
        setPrice()
        setResidence()
        setTime()
        setDescription()


      }
    }, [services]);

    React.useEffect(() => {
      if (where.homeservice == true) {
        setHome(true)
      }
      else {
        setHome(false)
        setResidence(false)
      }
    }, [where]);




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
    name: name,
    duration: {
      hours: hours,
      minutes: minutes
    },
    price: price,
    description: description,
    homeservice: residence,
    category: idType
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

    <View style={{ flex: 1 }}>
      {
        loading &&
        <View style={styles.loadingContainer}>
          <ActivityIndicator animating={loading} color={PrimaryColor} />
        </View>
      }
      {
        loading == false &&
        <View style={styles.container}>
          <View>
            <View style={{ alignItems: 'center', justifyContent: 'center' }}>
              <Text style={styles.whiteText}> Adicione as informações básicas para este serviço agora. Você poderá adicionar uma descrição e ajustar as cofigurações avançadas para este serviço posteriormente. </Text>
            </View>
            <View style={{ marginTop: 15 }}>
              <View>
                <TextPicker
                  inputLabel='Tipo de serviço'
                  options={types}
                  selectedValue={type}
                  onChange={(itemValue, itemPosition) => {
                    setType(itemValue)
                    setIdType(types[itemPosition].id)
                  }
                  }
                  type='categorys'
                />
                <HelperText></HelperText>
              </View>
              <View>
                <OtherInput
                  label="Nome do serviço"
                  value={name}
                  onChangeText={text => setName(text)}
                />
                <HelperText></HelperText>
              </View>
              <View>
                <OtherInput
                  label="Descrição"
                  value={description}
                  onChangeText={text => setDescription(text)}
                />
                <HelperText></HelperText>
              </View>
              <View>
                <TimeTextPicker
                  inputLabel='Duração'
                  time={time}
                  setTime={setTime}
                  onTimeChange={(newTime) => {
                    setHours(newTime.hours)
                    setMinutes(newTime.minutes)
                  }}
                />
                <HelperText></HelperText>
              </View>
              <View>
                <OtherInput
                  label="Preço"
                  value={price}
                  onChangeText={text => setPrice(text)}
                  keyboardType='numeric'
                />
                <HelperText></HelperText>
              </View>

              {home &&
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
              }

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
      }
    </View>
  )
}

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    backgroundColor: BackgroundColor,
    justifyContent: 'center',
    alignItems: 'center'
  },
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