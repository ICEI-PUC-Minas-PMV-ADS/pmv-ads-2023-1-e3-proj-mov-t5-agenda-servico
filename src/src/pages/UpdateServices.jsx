import React, { useState } from "react";
import { StyleSheet, Text, View, TouchableWithoutFeedback, KeyboardAvoidingView, ScrollView } from "react-native";
import { BackgroundColor, WhiteColor, LightGray, PrimaryColor } from "../constants/colors";
import { PrimaryButton } from "../components/Buttons";
import { useNavigation, useRoute } from "@react-navigation/native";
import { TextPicker } from "../components/TextPicker";
import { TimeTextPicker } from "../components/TimeTextPicker";
import { OtherInput } from "../components/OtherInput";
import { Checkbox, HelperText, ActivityIndicator } from 'react-native-paper';
import Icon from 'react-native-vector-icons/FontAwesome';
import { DeleteButton } from "../components/Buttons";
import { CategoryRepository } from "../repositories/category_repository";
import { useAppContext } from '../contexts/app_context';
import { Service, Tempo } from "../models/service";
import { ServiceRepository } from "../repositories/service_repository";
import { UserRepository } from "../repositories/user_repository";

const Header = ({ loading }) => {
  const navigation = useNavigation();

  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: !loading
    });
  }, [navigation, loading]);

  return null;
};

export function UpdateServices() {
  const userRepository = new UserRepository()
  const serviceRepository = new ServiceRepository()
  const appContext = useAppContext();
  const deleteIcon = <Icon name="trash" size={20} />;
  const navigation = useNavigation();
  const route = useRoute()
  const [loading, setLoading] = React.useState(true)

  const [name, setName] = useState('')
  const [errorName, SetErrorName] = useState(false)
  const [description, setDescription] = useState('')
  const [price, setPrice] = useState('')
  const [errorPrice, SetErrorPrice] = useState(false)
  const [residence, setResidence] = useState(false);
  const [time, setTime] = useState('')
  const [errorTime, setErrorTime] = useState(false);
  const [hours, setHours] = useState('')
  const [minutes, setMinutes] = useState('')
  const [where, setWhere] = useState('')
  const [home, setHome] = React.useState(true);


  const services = route.params.services
  const serviceIndex = route.params.serviceIndex
  const service = services[serviceIndex]
  const [type, setType] = useState('Selecione uma categoria');
  const [errorType, SetErrorType] = useState(false)
  const [types, setTypes] = useState([]);
  const [idType, setIdType] = useState('')

  React.useEffect(() => {
    userRepository.get(appContext?.user?.id, user => {
      setWhere(user.onde_trabalha)
    })
  }, []);

  React.useEffect(() => {
    if (where.estabelecimento == false && where.casa_cliente == true) {
      setHome(false)
      setResidence(true)
    }
    if (where.casa_cliente == true && where.estabelecimento == true) {
      setHome(true)
    }
    if (where.casa_cliente == false && where.estabelecimento == true) {
      setHome(false)
      setResidence(false)
    }
  }, [where]);

  if (serviceIndex != undefined) {
    React.useEffect(() => {
      if (service) {
        const duration = service.duracao
        setName(service.titulo)
        setPrice(service.valor)
        setDescription(service.descricao)
        setResidence(service.servico_externo)
        setHours(duration.horas)
        setMinutes(duration.minutos)
        setTime(`${hoursConvert(duration.horas)} ${minutesConvert(duration.minutos)}`)
        setIdType(service.categoria)
      }

      const repository = new CategoryRepository();
      repository.getAll((categorys) => {
        setTypes(categorys)
        setType(categorys.find(type => type.id == service.categoria).titulo)
        setLoading(false)
      })
    }, []);


  }
  else {
    React.useEffect(() => {
      const repository = new CategoryRepository();
      repository.getAll((categorys) => {
        setTypes(categorys)
        setType(categorys[0].titulo)
        setIdType(categorys[0].id)
        setLoading(false)
      })
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
  }

  const handleNameChange = (text) => {
    if (text == "") {
      setName(text)
      SetErrorName(true);
    }
    else {
      setName(text);
      SetErrorName(false);
    }


  };

  const handlePriceChange = (text) => {
    // remove tudo que não for número
    const onlyNumbers = text.replace(/[^\d]/g, "");

    // transforma a string de números em um valor monetário formatado em reais
    const formattedValue = (Number(onlyNumbers) / 100).toLocaleString("pt-BR", {
      style: "currency",
      currency: "BRL",
    });

    // atualiza o estado do valor formatado
    if (Number(onlyNumbers) === 0) {
      setPrice("")
      SetErrorPrice(true);
    } else {
      // atualiza o estado do valor formatado
      setPrice(formattedValue);
      SetErrorPrice(false);
    }


  };

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

  const novaDuracao = new Tempo();
  novaDuracao.horas = hours;
  novaDuracao.minutos = minutes;

  const novoServico = new Service()
  novoServico.titulo = name;
  novoServico.duracao = novaDuracao;
  novoServico.valor = price;
  novoServico.descricao = description;
  novoServico.servico_externo = residence;
  novoServico.categoria = idType;
  novoServico.prestador_servico_fk = appContext.user?.id

  const onUpdate = () => {
    setLoading(true)
    novoServico.id = service.id
    serviceRepository.update(novoServico, () => {
      setLoading(false)
      navigation.navigate('Services', {})
    })
  };

  const createService = () => {
    setLoading(true)
    serviceRepository.create(novoServico, () => {
      setLoading(false)
      navigation.navigate('Services', {})
    })
  }

  const onDelete = () => {
    setLoading(true)
    novoServico.id = service.id
    serviceRepository.delete(novoServico, () => {
      setLoading(false)
      navigation.navigate('Services', {})
    })
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
      <Header loading={loading} />
      {
        loading &&
        <View style={styles.loadingContainer}>
          <Text style={styles.whiteText}>Aguarde um instante</Text>
          <ActivityIndicator style={{ marginTop: 20 }} animating={loading} color={PrimaryColor} />
        </View>
      }
      {
        loading == false &&
        <View style={styles.container}>
          <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            keyboardVerticalOffset={85}>
            <ScrollView>
              <View style={{ marginTop: 15 }}>

                <View>
                  <TextPicker
                    inputLabel='Tipo de serviço'
                    options={types}
                    selectedValue={type}
                    onChange={(itemValue, itemPosition) => {
                      setType(itemValue)
                      setIdType(types[itemPosition].id)
                      SetErrorType(false)
                    }
                    }
                    type='categorys'
                    inputError={errorType}
                  />
                  <HelperText type="error" visible={errorType}>
                    {
                      errorType == true &&
                      <Text>Por favor, selecione uma categoria para o serviço</Text>
                    }
                  </HelperText>
                </View>
                <View>
                  <OtherInput
                    label="Nome do serviço"
                    value={name}
                    onChangeText={handleNameChange}
                    maxLength={50}
                    error={errorName}
                  />
                  <HelperText type="error" visible={errorName}>
                    {
                      errorName == true &&
                      <Text>Por favor, digite um nome para o serviço</Text>
                    }
                  </HelperText>
                </View>

                <View>
                  <OtherInput
                    label="Descrição (opcional)"
                    value={description}
                    onChangeText={text => setDescription(text)}
                    maxLength={150}
                  />
                  <HelperText></HelperText>
                </View>
                <View style={{ flexDirection: 'row' }}>
                  <View style={{ flex: 1, marginRight: 5 }}>
                    <TimeTextPicker
                      inputLabel='Duração'
                      time={time}
                      setTime={setTime}
                      onTimeChange={(newTime) => {
                        setHours(newTime.hours)
                        setMinutes(newTime.minutes)
                        setErrorTime(false)
                      }}
                      inputError={errorTime}
                      initialHours={hours}
                      initialMinutes={minutes}
                    />
                    <HelperText type="error" visible={errorTime}>
                      {
                        errorTime == true &&
                        <Text>Por favor, selecione uma duração para o serviço</Text>
                      }
                    </HelperText>
                  </View>
                  <View style={{ flex: 1, marginLeft: 5 }}>
                    <OtherInput
                      label="Preço"
                      value={price}
                      onChangeText={handlePriceChange}
                      keyboardType='numeric'
                      error={errorPrice}
                    />

                    <HelperText type="error" visible={errorPrice}>
                      {
                        errorPrice == true &&
                        <Text>Por favor, digite um valor diferente de R$0,00</Text>
                      }
                    </HelperText>

                  </View>
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
            </ScrollView>
          </KeyboardAvoidingView>

          <View style={styles.buttonContainer}>
            <>{buttonDelete()}</>
            <View style={{ flex: 2 }}>
              <PrimaryButton title={'Salvar'} onPress={() => {
                if (type == undefined || errorType == true) {
                  return SetErrorType(true)
                }
                else if (name == undefined || errorName == true) {
                  return SetErrorName(true)
                }
                else if (time == undefined || errorTime == true) {
                  return setErrorTime(true)
                }
                else if (price == undefined || errorPrice == true) {
                  return SetErrorPrice(true)
                }
                else if (serviceIndex != undefined) { onUpdate() }
                else { createService() }
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
    paddingBottom: 8,

  },

})