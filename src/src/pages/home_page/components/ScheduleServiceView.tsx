import React from "react";

import { Alert, StyleSheet, Text, TouchableWithoutFeedback, View } from "react-native";
import { WhiteColor, TextInputHintColor, SecondaryColor, SecondaryTextInputHintColor } from "../../../constants/colors";
import { IcIndexScheduleServiceViewEdit, IcIndexScheduleServiceViewCancel, IcIndexScheduleServiceViewMessage, IcIndexTwoSquares } from "../../../constants/icons";
import { ScheduledServices } from "../../../models/scheduled_services";
import { Service } from "../../../models/service";
import { ServiceRepository } from "../../../repositories/service_repository";
import { useHomeContext } from "../context/home_context";
import { ScheduledServicesRepository } from "../../../repositories/scheduled_services";
import { NavigationProp, useNavigation } from '@react-navigation/native';
import { AppParamsList } from "../../../routes/AppParamList";

/***
 * ScheduledServiceViewProps
 */

type ScheduledServiceViewProps = {
  model: ScheduledServices
};

/***
 * ScheduledServiceView
 */

export function ScheduledServiceView({ model }: ScheduledServiceViewProps) {
  const [service, setService] = React.useState<Service | undefined>();
  const homeContext = useHomeContext();
  const navigation = useNavigation<NavigationProp<AppParamsList>>();

  React.useLayoutEffect(() => {
    if (model.servico_fk) {
      const serviceRepo = new ServiceRepository();
      serviceRepo.get(model.servico_fk, (service) => {
        setService(service)
      });
    }
  }, [model]);

  const isPending = model.status === "pendente";
  const isDone = model.status === "concluido";
  const isCanceled = model.status === "cancelado";
  const isOutOfTime = model.status === "fora do prazo";

  const textValueStyle = isPending === true
    ? { color: WhiteColor }
    : { color: TextInputHintColor };

  const twoDigitNumber = (n: number | undefined) => n?.toLocaleString('en-US', {
    minimumIntegerDigits: 2,
    useGrouping: false
  });

  /***
   * Events
   */

  const onEditScheduledService = () => { };

  const onCancelScheduledService = () => {
    Alert.alert(
      'App',
      'Você deseja realmente cancelar este serviço agendado?',
      [
        {
          text: "Sim",
          onPress: () => {
            model.status = 'cancelado';
            new ScheduledServicesRepository().update(model, () => {
              const updatedScheduledServices = [...homeContext.scheduledServices];
              const modelIndex = updatedScheduledServices.findIndex(sv => sv.id === model.id)
              updatedScheduledServices[modelIndex] = model;
              homeContext.setScheduledServices?.(updatedScheduledServices);
            });
          }
        },
        { text: "Não" }
      ]
    );
  };

  const onMessageScheduledService = () => {
    if (model.servico_fk) {
      const servicesRepo = new ServiceRepository();
      servicesRepo.get(model.servico_fk, (service) => {
        if (service?.prestador_servico_fk) {
          navigation.navigate('ChatPage', {
            scheduledServiceId: model.id!,
            clientId: model.cliente_fk!,
            supplierId: service.prestador_servico_fk!,
          });
        }
      });
    }
  };

  return (
    <View style={style.container}>
      <View>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>

          {/* Titulo */}

          <View>
            <Text style={style.label}>Titulo</Text>
            <Text style={{ color: WhiteColor }}>{service?.titulo}</Text>
          </View>

          {/* Actions */}

          <View style={style.actionBar}>
            {(isPending === true || isOutOfTime === true) &&
              (
                <>
                  <View style={{ marginHorizontal: 4 }}>
                    <TouchableWithoutFeedback onPress={() => onEditScheduledService()}>
                      <IcIndexScheduleServiceViewEdit />
                    </TouchableWithoutFeedback>
                  </View>

                  <View style={{ marginHorizontal: 4 }}>
                    <TouchableWithoutFeedback onPress={() => onCancelScheduledService()}>
                      <IcIndexScheduleServiceViewCancel />
                    </TouchableWithoutFeedback>
                  </View>
                </>
              )
            }

            <View style={{ marginHorizontal: 4 }}>
              <TouchableWithoutFeedback onPress={() => onMessageScheduledService()}>
                <IcIndexScheduleServiceViewMessage />
              </TouchableWithoutFeedback>
            </View>
          </View>
        </View>

        {/* Descrição */}

        <View style={{ marginVertical: 8 }}>
          <View>
            <Text style={style.label}>Descrição</Text>
            <Text style={textValueStyle}>{model.descricao}</Text>
          </View>
        </View>

        {/* Horario e data */}

        <View style={{ marginTop: 8, flexDirection: 'row', justifyContent: 'space-between' }}>
          <View style={{ flexDirection: 'row' }}>
            <IcIndexTwoSquares />
            <Text style={{
              marginHorizontal: 8,
              color: (
                isOutOfTime || isCanceled
                  ? 'red'
                  : (
                    isDone === true
                      ? 'green'
                      : TextInputHintColor
                  )
              )
            }}>
              {(
                isCanceled === false
                  ? (
                    isDone === false
                      ? `Horario: ${model.data?.getHours()}:${twoDigitNumber(model.data?.getMinutes())}h`
                      : 'Concluido'
                  )
                  : 'Cancelado'
              )}
            </Text>
          </View>

          <View>
            <Text style={{ color: isOutOfTime ? 'red' : TextInputHintColor }}>
              {isCanceled === false && `${twoDigitNumber(model.data?.getDate())}/${twoDigitNumber(model.data?.getMonth())}/${model.data?.getFullYear()}`}
            </Text>
          </View>
        </View>
      </View>
    </View>
  );
}

/***
 * Style
 */

const style = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: SecondaryColor,
    padding: 16,
    marginTop: 16,
    borderRadius: 6,
  },
  actionBar: {
    flexDirection: 'row'
  },
  markedLabel: {
    color: SecondaryTextInputHintColor
  },
  label: {
    color: TextInputHintColor
  },
  value: {
    color: WhiteColor
  }
});