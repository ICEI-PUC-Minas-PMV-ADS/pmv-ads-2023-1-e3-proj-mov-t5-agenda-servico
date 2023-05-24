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


export function TestRegister(navigation) {

  const keys = ["about", "adress", "displacementfee", "email", "opening", "password", "services", "wherework", "type"]
  AsyncStorage.multiGet(keys).then(
    (data) => {
      const about = JSON.parse(data[0][1])
      const address = JSON.parse(data[1][1])
      const displacementFee = JSON.parse(data[2][1])
      const email = data[3][1]
      const opening = JSON.parse(data[4][1])
      const password = data[5][1]
      const services = JSON.parse(data[6][1])
      const wherework = JSON.parse(data[7][1])
      const type = data[8][1]

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
        newHorario.aberto = dia.opening
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
      newAddress.uf = address.state
      newAddress.complemento = address.complement







      /*
            const deleteA = new Address()
            deleteA.id = '-NW4oCF4CGynR5kGCNxl'
            addressRepository.delete(deleteA, (cb) => {
              console.log(cb)
            })
      
            const deleteUser = new User()
            deleteUser.id = '-NW4oCHh09LgrEhossFG'
            userRepository.delete(deleteUser, (cb) => {
              console.log(cb)
            })
            
                  const deleteService1 = new Service()
                  const deleteService2 = new Service()
                  const deleteService3 = new Service()
            
                  deleteService1.id = '-NVzZW_RQxnlPpezXt_8'
                  deleteService2.id = '-NVzZW_SBCToGas2NFpe'
                  deleteService3.id = '-NVzZW_TJHRUI-UEU3Ik'
            
                  serviceRepository.delete(deleteService1, (cb) => {
                    console.log(cb)
                  })
                  serviceRepository.delete(deleteService2, (cb) => {
                    console.log(cb)
                  })
                  serviceRepository.delete(deleteService3, (cb) => {
                    console.log(cb)
                  })
            
      */
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
              console.log(service)
              AsyncStorage.multiRemove(keys)
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

