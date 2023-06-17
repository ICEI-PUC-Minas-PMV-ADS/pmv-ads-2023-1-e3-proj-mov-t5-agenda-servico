import React from "react";
import { StyleSheet, View, Text, Image } from "react-native";
import { BackgroundColor, PrimaryColor, WhiteColor } from "../constants/colors";
import { ActivityIndicator } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { User, Horario, Tempo, Intervalo, Taxa, Onde } from "../models/user";
import { Address } from "../models/address";
import { UserRepository } from "../repositories/user_repository";
import { Service } from "../models/service";
import { AddressRepository } from "../repositories/address_repository";
import { ServiceRepository } from "../repositories/service_repository";
import EncryptedStorage from 'react-native-encrypted-storage';
import { KEY_USERDATA } from '../constants/app';
import { hash } from "../utils/crypto";


export function Register() {

  const navigation = useNavigation()
  const prestadorKeys = ["about", "adress", "displacementfee", "email", "opening", "password", "services", "wherework"]
  const clienteKeys = ["about", "email", "password"]
  const [type, setType] = React.useState()

  AsyncStorage.getItem('type').then(
    type => {
      setType(type)
    }
  )

  React.useEffect(() => {
    if (type) {
      if (type == 'prestador') {
        AsyncStorage.multiGet(prestadorKeys).then(
          (data) => {
            const about = JSON.parse(data[0][1])
            const address = JSON.parse(data[1][1])
            const displacementFee = JSON.parse(data[2][1])
            const email = data[3][1]
            const opening = JSON.parse(data[4][1])
            const password = data[5][1]
            const services = JSON.parse(data[6][1])
            const wherework = JSON.parse(data[7][1])

            const userRepository = new UserRepository()
            const addressRepository = new AddressRepository()
            const serviceRepository = new ServiceRepository()

            const newTaxa = new Taxa()
            newTaxa.distancia = displacementFee.distance
            newTaxa.tipo_taxa = displacementFee.fee.type
            newTaxa.valor_taxa = displacementFee.fee.value

            const newOnde = new Onde()
            newOnde.casa_cliente = wherework.homeservice
            newOnde.estabelecimento = wherework.establishment

            const newUser = new User()
            const listaHorarios = []
            newUser.nome = about.name
            newUser.hash = hash(password)
            newUser.telefone = about.phone
            newUser.email = email
            newUser.tipo = type
            newUser.nome_fantasia = about.company
            newUser.lista_de_horarios = listaHorarios
            newUser.taxa_de_deslocamento = newTaxa
            newUser.onde_trabalha = newOnde
            newUser.tipo_login = 'app'
            newUser.endereco_visivel = address.visible != undefined ? address.visible : false;
            newUser.lat = address.lat;
            newUser.lng = address.lng;
            // Mudar para nova Implementação<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<
            newUser.lista_de_horarios.forEach(weekDay => {
              if (weekDay.aberto === true) {
                let avaliableHourList = [];
                for (let day_hours = weekDay.inicio.horas; day_hours < weekDay.fim.horas; day_hours++) {
                  if (weekDay.intervalos.filter(hour => day_hours >= hour.inicio.horas && day_hours < hour.fim.horas).length > 0) {
                    continue
                  }
                  avaliableHourList.push({ horas: day_hours, minutos: 0, status: "disponivel" })
                }
                weekDay.horarios_agendados = avaliableHourList
              }
            });



            opening.forEach(dia => {
              const newHorario = new Horario()

              const inicio = new Tempo()
              inicio.horas = dia.opening.hours
              inicio.minutos = dia.opening.minutes

              const fim = new Tempo()
              fim.horas = dia.closure.hours
              fim.minutos = dia.closure.minutes

              const intervalos = []

              dia.breaks.forEach(interval => {

                const intervalo = new Intervalo()

                const inicio = new Tempo()
                inicio.horas = interval.start.hours
                inicio.minutos = interval.start.minutes

                const fim = new Tempo()
                fim.horas = interval.end.hours
                fim.minutos = interval.end.minutes

                intervalo.inicio = inicio
                intervalo.fim = fim

                intervalos.push(intervalo)
              })



              newHorario.dia = dia.day
              newHorario.aberto = dia.open
              newHorario.inicio = inicio
              newHorario.fim = fim
              newHorario.intervalos = intervalos

              listaHorarios.push(newHorario)

            })


            const newAddress = new Address()
            newAddress.cep = address.cep
            newAddress.logradouro = address.street
            newAddress.numero = address.number
            newAddress.bairro = address.neighborhood
            newAddress.cidade = address.city
            newAddress.uf = address.state
            newAddress.complemento = address.complement


            addressRepository.create(newAddress, (address) => {
              newUser.endereco_fk = address.id
              userRepository.create(newUser, (user) => {
                services.forEach(item => {
                  const service = new Service()

                  const duration = new Tempo()
                  duration.horas = item.duration.hours
                  duration.minutos = item.duration.minutes

                  service.prestador_servico_fk = user.id
                  service.titulo = item.name
                  service.descricao = item.description
                  service.valor = item.price
                  service.duracao = duration
                  service.servico_externo = item.homeservice
                  service.categoria = item.category

                  serviceRepository.create(service, (service) => {
                    AsyncStorage.multiRemove(prestadorKeys)
                    EncryptedStorage.setItem(
                      KEY_USERDATA,
                      JSON.stringify(user),
                    ).then(() => {
                      navigation.navigate('Home', {});
                    });
                  })
                })

              })
            })

          }


        )
      }
      else if (type == "cliente") {
        AsyncStorage.multiGet(clienteKeys).then(
          (data) => {
            const about = JSON.parse(data[0][1])
            const email = data[1][1]
            const password = data[2][1]

            const userRepository = new UserRepository()

            const newUser = new User()
            newUser.nome = about.name
            newUser.hash = hash(password)
            newUser.telefone = about.phone
            newUser.email = email
            newUser.tipo = type
            newUser.tipo_login = 'app'


            userRepository.create(newUser, (user) => {
              AsyncStorage.multiRemove(clienteKeys)
              EncryptedStorage.setItem(
                KEY_USERDATA,
                JSON.stringify(user),
              ).then(() => {
                navigation.navigate('Home', {});
              });
            })

          })


      }
    }
  }, [type]);



  return (
    <View style={styles.container}>
      <View style={styles.textContainer}>
        <Text style={styles.textTitle}><Text style={styles.textTitleBlue}>Muito obrigado</Text> por escolher a agenda serviço. <Text style={styles.textTitleBlue}>Aguarde</Text> enquanto finalizamos seu cadastro.</Text>
      </View>

      <View style={{ alignItems: 'center' }}>
        <Image source={require('../../assets/images/saveRegister.gif')}
          style={{ width: 200, height: 200 }}
        />
      </View>


      <View style={{ marginBottom: 50 }}>
        <ActivityIndicator animating={true} color={PrimaryColor} size='large' />
      </View>
    </View>
  )




}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: BackgroundColor,
    justifyContent: "space-between"
  },

  textTitle: {
    color: WhiteColor,
    textAlign: 'center',
    fontFamily: 'Manrope-Bold',
    fontSize: 26,
  },

  textTitleBlue: {
    color: PrimaryColor,
    textAlign: 'center',
    fontFamily: 'Manrope-Bold',
    fontSize: 26,
  },

  textContainer: {
    marginTop: 50
  }

})