import React, { useEffect, useState } from "react";
import { ScrollView, StyleSheet, View } from "react-native";
import { InputPhoneText, InputText } from "../components/Inputs";
import { BackgroundColor, WhiteColor } from "../constants/colors";
import { PrimaryButton, ReturnButton } from "../components/Buttons";
import { UserRepository } from "../repositories/user_repository";
import { Text } from "react-native";
import { ProfileImage } from "../components/ProfileImage";
import { useAppContext } from "../contexts/app_context";
import { useMessageContext } from "../contexts/message_context";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { AppParamsList } from "../routes/AppParamList";

export interface ProfessionalProfilePageProps {
    userTeste: () => void;
}

export default function ProfessionalProfilePage({ navigation,
}: NativeStackScreenProps<AppParamsList, 'ProfessionalProfile'>) {
    const [name, setName] = useState('');
    const [phone, setPhone] = useState('');
    const [email, setEmail] = useState('');
    const [descricao, setDescricao] = useState('');

    const userRep = new UserRepository();
    const userContext = useAppContext();

    if (userContext.user === undefined) {
        navigation.navigate({ name: 'Login', params: {} })
    }

    useEffect(() => {
        setName(userContext.user?.nome ?? "")
        setPhone(userContext.user?.telefone ?? "");
        setEmail(userContext.user?.email ?? "");
        setDescricao(userContext.user?.descricao ?? "");
    }, [])

    const changeInfoAccount = React.useCallback(() => {
        let newUser = { ...userContext.user };
        if (newUser !== undefined) {
            newUser.nome = name;
            newUser.telefone = phone;
            newUser.email = email;
            newUser.descricao = descricao;
            userRep.update(newUser, (user) => {
                if (user === undefined)
                    useMessageContext().dispatchMessage({ type: "error", message: "Falha ao atualizar o Usuário!!!!!" });
            })
        }
    }, [name, phone, email, descricao])

    return (
        <View style={styles.body}>
            <ScrollView>
                <ReturnButton
                    onPress={() => { navigation.pop() }}
                />
                <Text style={styles.title}> Perfil Empresarial </Text>
                <ProfileImage
                    image={userContext.user?.imagem_perfil}
                />

                <ReturnButton
                    onPress={() => navigation.navigate('BookingRoutes', { id: "-NWh3lQu8uLUau-XbB8b" })}
                />

                <InputText
                    placeholder="Digite o nome"
                    label="Nome Fantasia"
                    value={userContext.user?.nome}
                    onChange={value => setName(value)}
                />

                <InputPhoneText
                    label="Celular"
                    placeholder="Entre com o número profissional"
                    value={userContext.user?.telefone}
                    onChange={value => setPhone(value)}
                />
                <InputText
                    placeholder="Entre com o e-mail empresarial"
                    label="E-mail empresarial"
                    value={userContext.user?.email}
                    readonly
                    onChange={value => setEmail(value)}

                />


                <InputText
                    placeholder="Entre com a descrição Geral"
                    label="Descrição Geral: "
                    value={userContext.user?.descricao}
                    onChange={value => setDescricao(value)}
                />

                <PrimaryButton
                    title="Salvar Informações"
                    onPress={() => changeInfoAccount()}
                />

            </ScrollView>
        </View>
    )
}

const styles = StyleSheet.create({
    body: {
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