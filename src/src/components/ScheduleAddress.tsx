
import React, { useEffect, useState } from "react";
import { ScrollView, StyleSheet, View } from "react-native";
import { InputText } from "../components/Inputs";
import { BackgroundColor, WhiteColor } from "../constants/colors";
import { PrimaryButton, ReturnButton } from "../components/Buttons";
import { Text } from "react-native";
import { useAppContext } from "../contexts/app_context";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { AppParamsList } from "../routes/ParamList";
import { ServiceRepository } from "../repositories/service_repository";
import { LocaleRepository } from "../repositories/locale_repository";
import { UserRepository } from "../repositories/user_repository";


export default function BookingPage({ route, navigation
}: NativeStackScreenProps<AppParamsList, 'BookingPage'>) {
    const [cep, setCep] = useState("")
    const [uf, setUf] = useState("")
    const [numero, setNumero] = useState("")
    const [logradouro, setLogradouro] = useState("")
    const [cidade, setCidade] = useState("")
    const [bairro, setBairro] = useState("")
    const [complemento, setComplemento] = useState("")

    const addressRep = new LocaleRepository();
    const userRep = new UserRepository();
    const userContext = useAppContext();
    const serviceRep = new ServiceRepository();
    const { id } = route.params;

    function fillOutAddressForm() {
        let addressId: string
        userRep.get(id, (user) =>  user?.endereco_fk)
    }

    if (userContext.user === undefined) {
        navigation.navigate({ name: 'Login', params: {} })
    }

    useEffect(() => {

    }, [])

    return (
        <View style={styles.body}>
            <ScrollView>
                <ReturnButton
                    onPress={() => { navigation.pop() }}
                />
                <Text style={styles.title}> Cadastrar Endereço </Text>

                <InputText
                    placeholder="CEP "
                    label="CEP: "
                    value={userContext.user?.descricao}
                    onChange={value => setCep(value)}
                />

                <InputText
                    placeholder="UF "
                    label="UF: "
                    value={userContext.user?.descricao}
                    onChange={value => setUf(value)}
                />

                <InputText
                    placeholder="Cidade"
                    label="Cidade:"
                    value={userContext.user?.descricao}
                    onChange={value => setCidade(value)}
                />

                <InputText
                    placeholder="Logradouro"
                    label="Logradouro: "
                    value={userContext.user?.descricao}
                    onChange={value => setLogradouro(value)}
                />

                <InputText
                    placeholder="Bairro "
                    label="Bairro: "
                    value={userContext.user?.descricao}
                    onChange={value => setBairro(value)}
                />

                <InputText
                    placeholder="Número "
                    label="Número: "
                    value={userContext.user?.descricao}
                    onChange={value => setNumero(value)}
                />

                <InputText
                    placeholder="Complemento "
                    label="Complemento: "
                    value={userContext.user?.descricao}
                    onChange={value => setComplemento(value)}
                />

                <PrimaryButton
                    title="Salvar Informações"
                    onPress={() => { }}
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

