import React, { useEffect, useState } from "react";
import { ScrollView, StyleSheet, View } from "react-native";
import { InputPhoneText, InputText, ServiceTypeSelector } from "../components/Inputs";
import { BackgroundColor, WhiteColor } from "../constants/colors";
import { PrimaryButton, ReturnButton } from "../components/Buttons";
import { UserRepository } from "../repositories/user_repository";
import { Text } from "react-native";
import { useAppContext } from "../contexts/app_context";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { AppParamsList } from "../routes/ParamList";
import { ServiceRepository } from "../repositories/service_repository";
import { Service } from "../models/service";
import ServiceDateSelector from "../components/ServiceDateSelector";


export default function BookingPage({ route, navigation
}: NativeStackScreenProps<AppParamsList, 'BookingPage'>) {

    const [hourDate, setHourDate] = useState("");
    const [selectedServiceId, setSelectedServiceId] = useState("");
    const [price, setPrice] = useState();
    const [address, setAddress] = useState();
    const [observations, setObservations] = useState("");
    const [serviceLists, setServiceLists] = useState<Service[]>([]);

    const userRep = new UserRepository();
    const userContext = useAppContext();
    const serviceRep = new ServiceRepository();
    const { id } = route.params;



    const handleFeeChange = (text: string) => {
        const onlyNumbers = text.replace(/[^\d]/g, "");

        const formattedValue = (Number(onlyNumbers)).toLocaleString("pt-BR", {
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
        filterServiceBySupplier();

    }, [])

    return (
        <View style={styles.body}>
            <ScrollView>
                <ReturnButton
                    onPress={() => { navigation.pop() }}
                />
                <Text style={styles.title}> Agendar Serviço </Text>

                <InputText
                    placeholder="Digite o nome"
                    label="Nome do Profissional"
                    value={userContext.user?.nome}
                    readonly
                />

                <ServiceTypeSelector
                    label="Tipo de Serviço"
                    types={serviceLists}
                    onChange={(key) => {
                        setSelectedServiceId(key)
                    }}
                />

                <ServiceDateSelector
                    label="Horários Disponiveis"
                    professionalId = {id}
                    onChange={ (key) => {
                        setHourDate(key)
                    }}
                />

                <InputText
                    placeholder="Preço"
                    label="Valor do Serviço"
                    value={handleFeeChange(serviceLists.find(service => service.id === selectedServiceId)?.valor?.toString() ?? "0000")}
                    readonly
                />


                <InputText
                    placeholder="Entre com alguma observação"
                    label="Observações: "
                    value={userContext.user?.descricao}
                    onChange={value => setObservations(value)}
                />

                <PrimaryButton
                    title="Salvar Informações"
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

//-NTKrt6E9_NTRPXE3ui6 Professional-ID (manicure)
//-NTKrt6E9_NTRPXE3ui6 Professional-ID (Cortar cabelo)
//Nome: Pedro teste.  