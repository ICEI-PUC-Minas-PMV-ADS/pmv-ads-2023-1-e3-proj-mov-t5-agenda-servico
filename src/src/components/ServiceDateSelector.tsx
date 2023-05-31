import { StyleSheet, View, Text } from "react-native";
import { useEffect, useState } from "react";
import {
    TextInputBackgroundColor,
    TextInputColor,
    TextInputHintColor,
    TextInputIconColor,
    WhiteColor
} from "../constants/colors";
import { SelectList } from "react-native-dropdown-select-list";
import { UserRepository } from "../repositories/user_repository";
import { AvaliableSchedule, Tempo, User } from "../models/user";

interface ServiceDateSelectorProps {
    label?: String,
    professionalId?: string,
    onChange: (key: string) => void,
}

export default function ServiceDateSelector({ label, professionalId, onChange }: ServiceDateSelectorProps) {
    const [selected, setSelected] = useState("");
    const [user, setUser] = useState<User>();
    const userRep = new UserRepository();

    useEffect(() => {
        if (professionalId) {
            userRep.get(professionalId, (e) => {
                setUser(e)
            })
        }
    }, [])

    function getFreeTimeList(eUser: User) {
        eUser.lista_de_horarios?.forEach(weekDay => {
            if (weekDay.aberto === true) {
                let avaliableHourList: AvaliableSchedule[] = [];
                for (let day_hours = weekDay.inicio!.horas!; day_hours < weekDay.fim!.horas!; day_hours++) {
                    if (weekDay.intervalos!.filter(hour => day_hours >= hour.inicio!.horas! && day_hours < hour.fim!.horas!).length > 0) {
                        continue
                    }
                    avaliableHourList.push({ horas: day_hours, minutos: 0, status: "disponivel" })
                }
                weekDay.horarios_agendados = avaliableHourList
            }
        });
        console.log(JSON.stringify(eUser.lista_de_horarios))
    }

    useEffect(() => {
        if (user)
            getFreeTimeList(user);
    }, [user])

    return (
        <View style={styles.container}>
            {label !== undefined ? (
                <Text style={styles.textLabel}>{label}</Text>
            ) : (
                <></>
            )}
            <View style={styles.textInputContainer}>
                <SelectList
                    data={["Teste", "TesteAAA"]}
                    setSelected={(val: string) => {
                        onChange(val)
                        setSelected(val)
                    }}
                    save='value'
                />
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        margin: 12,
    },
    textLabel: {
        color: TextInputColor,
        fontFamily: 'Manrope-SemiBold',
        marginStart: 4,
        marginBottom: 4,
    },
    textInputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: TextInputBackgroundColor,
        borderRadius: 8,
        paddingHorizontal: 8,
    },
    textInputDDD: {
        width: 40,
        color: WhiteColor,
        textAlign: 'center',
    },
    textInput: {
        flex: 1,
        color: TextInputColor,
        fontFamily: 'Aleo-Bold',
        borderWidth: 0,
    },
    textInputIcon: {
        color: TextInputIconColor,
        marginHorizontal: 8,
    },
    inputPhoneDivider: {
        width: 1,
        height: '70%',
        marginHorizontal: 8,
        backgroundColor: TextInputHintColor,
    },
});