import React, { useEffect, useState } from "react";
import { Alert, StyleSheet, Text, View } from "react-native";
import { ScheduleServiceContext } from "./schedule_service_context";
import { AppParamsList } from "../../routes/AppParamList";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { PrimaryButton } from "../../components/Buttons";
import { BackgroundColor, WhiteColor } from "../../constants/colors";
import { ScheduledServicesRepository } from "../../repositories/scheduled_services";
import { AddressRepository } from "../../repositories/address_repository";
import { ScheduledServices } from "../../models/scheduled_services";
import { UserRepository } from "../../repositories/user_repository";

export function ScheduleServiceConfirmPage({ navigation
}: NativeStackScreenProps<AppParamsList, 'ScheduleServiceConfirmPage'>) {
  const { state } = React.useContext(ScheduleServiceContext);

  const scheduleRep = new ScheduledServicesRepository();
  const addressRep = new AddressRepository();

  function sendSuccessNotifications(userId: string, supplierId: string, onComplete: () => void) {
    const title = 'Agendamento';
    const message = 'Um serviço foi agendado!';
    const userRepo = new UserRepository();
    userRepo.get(userId, (user) => {
      if (user) {
        userRepo.sendNotification(user, title, message, () => {
          userRepo.get(supplierId, (supplier) => {
            if (supplier) {
              userRepo.sendNotification(supplier, title, message, () => {
                onComplete();
              });
            }
          });
        });
      }
    });
  }

  function saveScheduleOnDb() {
    if (state?.addressPage?.address.id !== undefined) {
      if (state?.firstPage?.schedule !== undefined) {
        const schedule: ScheduledServices = { ...state?.firstPage?.schedule, local_fk: state.addressPage.address.id }
        scheduleRep.create(schedule, service => {
          if (service !== undefined) {
            sendSuccessNotifications(schedule.cliente_fk!, state.supplierId!, () => {
              navigation.replace("Home", {});
            });
          }
          else {
            Alert.alert(
              'Falha ao Agendar Serviço',
              '',
              [{ text: 'Ok', onPress: () => navigation.replace("Home", {}) }],
            );
          }
        })
      }
    } else {
      addressRep.create(state!.addressPage!.address, newAddress => {
        if (newAddress !== undefined) {
          if (state?.firstPage?.schedule !== undefined) {
            const schedule: ScheduledServices = { ...state?.firstPage?.schedule, local_fk: newAddress.id }
            scheduleRep.create(schedule, service => {
              if (service !== undefined) {
                sendSuccessNotifications(schedule.cliente_fk!, state.supplierId!, () => {
                  navigation.replace("Home", {});
                });
              }
              else {
                Alert.alert(
                  'Falha ao Agendar Serviço',
                  '',
                  [{ text: 'Ok', onPress: () => navigation.replace("Home", {}) }],
                );
              }
            })
          }
        } else {
          Alert.alert(
            'Falha ao Agendar Serviço',
            '',
            [{ text: 'Ok', onPress: () => navigation.replace("Home", {}) }],
          );
        }
      })
    }

  }

  return (
    <View style={styles.body} >
      <Text style={styles.title}>Deseja confirmar o agendamento do Evento? </Text>
      <PrimaryButton
        title="Agendar"
        onPress={() => {
          saveScheduleOnDb()
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  body: {
    flex: 1,
    backgroundColor: BackgroundColor,
  },
  title: {
    paddingTop: 6,
    paddingBottom: 20,
    color: WhiteColor,
    fontSize: 28,
    fontFamily: 'Manrope-SemiBold',
  }
})
