import React from "react";

import { StyleSheet, Text, View } from "react-native";
import { ScheduledServices } from "../models/scheduled_services";
import { SecondaryColor, SecondaryTextInputHintColor, TextInputHintColor, WhiteColor } from "../constants/colors";
import { Service } from "../models/service";
import { ServiceRepository } from "../repositories/service_repository";
import { IcIndexTwoSquares } from "../constants/icons";

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

  return (
    <View style={style.container}>
      <View>

        {/* Titulo e icones */}

        <View>
          <View>
            <Text style={style.label}>Titulo</Text>
            <Text style={textValueStyle}>{service?.titulo}</Text>
          </View>

          <View></View>
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
            <Text style={[style.label, { marginHorizontal: 8 }]}>
              Horario: {`${model.data?.getHours()}:${twoDigitNumber(model.data?.getMinutes())}`}h
            </Text>
          </View>

          <View>
            <Text style={style.label}>
              {`${twoDigitNumber(model.data?.getDate())}/${twoDigitNumber(model.data?.getMonth())}/${model.data?.getFullYear()}`}
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