import React, { useEffect, useState } from "react";
import { ScrollView, StyleSheet, View } from "react-native";
import { InputPhoneText, InputText } from "../components/Inputs";
import { BackgroundColor, WhiteColor } from "../constants/colors";
import { PrimaryButton, ReturnButton } from "../components/Buttons";
import { UserRepository } from "../repositories/user_repository";
import { Text } from "react-native";
import { ProfileImage } from "../components/ProfileImage";
import { useAppContext } from "../contexts/app_context";
import { useErrorContext } from "../contexts/error_context";
import { NativeStackScreenProps } from "@react-navigation/native-stack/lib/typescript/src/types";
import { AppParamsList } from "../routes/ParamList";

export interface ClientProfilePageProps {
    userTeste: () => void;
}

export default function ClientProfilePage({ navigation }: NativeStackScreenProps<AppParamsList, 'ClientProfile'>) {
    const [name, setName] = useState('');
    const [phone, setPhone] = useState('');
    const [email, setEmail] = useState('');

    const userRep = new UserRepository();
    const userContext = useAppContext();

    if (userContext.user === undefined) {
        navigation.navigate({ name: 'Login', params: {} })
    }

    useEffect(() => {
        setName(userContext.user?.nome ?? "")
        setPhone(userContext.user?.telefone ?? "");
        setEmail(userContext.user?.email ?? "");;
    }, [userContext.user]);

    const changeInfoAccount = React.useCallback(() => {
        let newUser = { ...userContext.user };
        if (newUser !== undefined) {
            newUser.nome = name;
            newUser.telefone = phone;
            newUser.email = email;
            userRep.update(newUser, (user) => {
                if (user === undefined)
                    useErrorContext().dispatchError("Falha ao atualizar o Usuário!!!!!")
            })
        }
    }, [name, phone, email])



    return (
        <View style={styles.body}>
            <ScrollView>
                <ReturnButton
                    onPress={() => { navigation.pop() }}
                />
                <Text style={styles.title}> Perfil </Text>
                <ProfileImage
                    image={userContext.user?.imagem_perfil}
                />

                <InputText
                    placeholder="Digite o nome"
                    label="Digite o Nome e Sobrenome"
                    value={userContext.user?.nome}
                    onChange={value => setName(value)}

                />

                <InputPhoneText
                    label="Celular"
                    placeholder="Entre com o número"
                    value={userContext.user?.telefone}
                    onChange={value => setPhone(value)}
                />
                <InputText
                    placeholder="Entre com o e-mail exemplo@gmail.com"
                    label="E-mail"
                    value={userContext.user?.email}
                    readonly
                    onChange={value => setEmail(value)}
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
        flex: 1,
        backgroundColor: BackgroundColor,
    },
    title: {
        paddingTop: 6,
        paddingBottom: 30,
        color: WhiteColor,
        fontSize: 28,
        fontFamily: 'Manrope-SemiBold',
    }
})