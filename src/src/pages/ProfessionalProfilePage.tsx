import React, { useState } from "react";
import { ScrollView, StyleSheet, View } from "react-native";
import { InputPhoneText, InputText } from "../components/Inputs";
import { BackgroundColor, WhiteColor } from "../constants/colors";
import { PrimaryButton, ReturnButton } from "../components/Buttons";
import { UserRepository } from "../repositories/user_repository";
import { Text } from "react-native";
import { ProfileImage } from "../components/ProfileImage";
import { useAppContext } from "../contexts/app_context";
import { useErrorContext } from "../contexts/error_context";

export interface ProfessionalProfilePageProps {
    userTeste: () => void;
}

export default function ProfessionalProfilePage() {
    const [name, setName] = useState('');
    const [phone, setPhone] = useState('');
    const [email, setEmail] = useState('');
    const [descricao, setDescrição] = useState('');

    const userRep = new UserRepository();
    const userContext = useAppContext();

    React.useEffect(() => {
        userRep.get("-NTOtU12PdVi56X8lTxw", (user) => {
            if (user !== undefined) {
                userContext.setUser(user)
            }
        })
    }, [])

    const changeInfoAccount = React.useCallback(() => {
        var newUser = { ...userContext.user };
        if (newUser !== undefined) {
            newUser.nome = name;
            newUser.telefone = phone;
            newUser.email = email;
            newUser.descricao = descricao;
            userRep.update(newUser, (user) => {
                if (user === undefined)
                    useErrorContext().dispatchError("Falha ao atualizar o Usuário!!!!!")
            })
        }
    }, [name, phone, email, descricao])



    return (
        <View style={styles.body}>
            <ScrollView>
                <ReturnButton
                    onPress={() => { }}
                />
                <Text style={styles.title}> Perfil Empresarial </Text>
                <ProfileImage
                    image={userContext.user?.imagem_perfil}
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
                    onChange={value => setEmail(value)}
                />

             
                <InputText
                    placeholder="Entre com a descrição Geral"
                    label="Descrição Geral: "
                    value={userContext.user?.descricao}
                    onChange={value => setDescrição(value)}
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