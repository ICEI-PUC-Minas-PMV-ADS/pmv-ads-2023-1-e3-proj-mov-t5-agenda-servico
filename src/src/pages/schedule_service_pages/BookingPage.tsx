import React, { useEffect, useState } from "react";
import { ScrollView, StyleSheet, View } from "react-native";
import { InputText, ServiceTypeSelector } from "../../components/Inputs";
import { BackgroundColor, WhiteColor } from "../../constants/colors";
import { PrimaryButton, ReturnButton } from "../../components/Buttons";
import { Text } from "react-native";
import { useAppContext } from "../../contexts/app_context";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { AppParamsList } from "../../routes/ParamList";
import { ServiceRepository } from "../../repositories/service_repository";
import { Service } from "../../models/service";
import ServiceDateSelector from "../../components/ServiceDateSelector";
import { useScheduleServiceContext } from "./schedule_service_context";
import { ScheduledServices } from "../../models/scheduled_services";


export default function BookingPage({ route, navigation
}: NativeStackScreenProps<AppParamsList, 'BookingPage'>) {
    const [hour, setHour] = useState("");
    const [date, setDate] = useState<Date>(new Date());
    const [selectedServiceId, setSelectedServiceId] = useState("");
    const [price, setPrice] = useState("");
    const [observations, setObservations] = useState("");
    const [serviceLists, setServiceLists] = useState<Service[]>([]);
    const { dispatch } = useScheduleServiceContext();

    const userContext = useAppContext();
    const serviceRep = new ServiceRepository();
    const { id } = route.params;

    const handleFeeChange = (text: string) => {
        const onlyNumbers = text.replace(/[^\d]/g, "");
        const formattedValue = (Number(onlyNumbers) / 100).toLocaleString("pt-BR", {
            style: "currency",
            currency: "BRL",
        });

        if (Number(onlyNumbers) === 0) {
            return ("R$ 0,00")

        }
        return formattedValue;
    };

    if (userContext.user === undefined) {
        navigation.navigate({ name: 'Login', params: {} })
    }

    function createScheduleService() {
        let schedule = new ScheduledServices();
        schedule.data = date;
        schedule.descricao = observations;
        schedule.preco = price
        schedule.hora = Number.parseInt(hour);
        schedule.status = "pendente";
        schedule.cliente_fk = userContext.user?.id;
        schedule.servico_fk = selectedServiceId;
        return schedule;
    }

    function filterServiceBySupplier() {
        serviceRep.getAll(returnServiceList => {
            if (returnServiceList !== undefined) {
                setServiceLists(returnServiceList.filter((service) => {
                    return service.prestador_servico_fk === id;
                }))
            }
        })
    }

    useEffect(() => {
        let e = serviceLists.find(service => service.id === selectedServiceId)?.valor
        if (e !== undefined) {
            setPrice(e)
        }
    }, [selectedServiceId])

    useEffect(() => {
        filterServiceBySupplier();
    }, [])

    return (
        <View style={styles.body}>
            <ScrollView>
                <ReturnButton
                    onPress={() => { navigation.pop() }}
                />
                <Text style={styles.title}> Agendar Serviço </Text>

                <ServiceTypeSelector
                    label="Tipo de Serviço"
                    types={serviceLists}
                    onChange={(key) => {
                        setSelectedServiceId(key)
                    }}
                />

                <ServiceDateSelector
                    label="Horários Disponiveis do Dia:"
                    professionalId={id}
                    onChangeDate={(key) => {
                        const normalizedDateWithoutTime = new Date(key.getFullYear(), key.getMonth(), key.getDate());
                        setDate(normalizedDateWithoutTime);
                    }}
                    onChangeHour={(key) => {
                        setHour(key)
                    }}
                />

                <InputText
                    placeholder="Preço"
                    label="Valor do Serviço"
                    value={handleFeeChange(price)}
                    readonly
                />

                <InputText
                    placeholder="Entre com alguma observação"
                    label="Observações: "
                    value={userContext.user?.descricao}
                    onChange={value => setObservations(value)}
                />

                <PrimaryButton
                    title="Próximo"
                    onPress={() => {
                        navigation.navigate("ScheduleServiceCepPage", { id })
                        dispatch?.({ type: "set_first_page", payload: { scheduledService: createScheduleService(), supplierId: id } })
                    }}
                />

            </ScrollView>
        </View>
    )
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

