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
import { AvaliableSchedule, Horario, Tempo, User } from "../models/user";

interface ServiceDateSelectorProps {
    label?: String,
    professionalId?: string,
    onChangeDay: (val: string) => void,
    onChangeHour: (val: string) => void,
}

export default function ServiceDateSelector({ label, professionalId, onChangeDay, onChangeHour }: ServiceDateSelectorProps) {
    const [selectedDay, setSelectedDay] = useState("");
    const [selectedHour, setSelectedHour] = useState("");
    const [hourList, setHourList] = useState<string[]>([])
    const [user, setUser] = useState<User>();
    const [weekDays, setWeekDays] = useState<string[]>([]);
    const userRep = new UserRepository();
    
    useEffect(() => {
        if (professionalId) {
            userRep.get(professionalId, (e) => {
                setUser(e)
            })
        }
    }, [])

    function getFreeTimeList(eUser: User) {
        return eUser.lista_de_horarios?.map(weekDay => {
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
            return weekDay
        });
    }

    function workDaysList() {
        let daysList
        if (user) {
            daysList = getFreeTimeList(user)
                ?.filter(weekDay => weekDay.aberto === true && weekDay.dia !== undefined)
                .map((weekDay) => weekDay.dia!);
        }
        if (daysList !== undefined) {
            setWeekDays(daysList)
        }
    }

    function avaliableHourList(selectedDay: string) {
        let hourList;
        if (user) {
            hourList = getFreeTimeList(user)
                ?.find(weekDay => weekDay.dia === selectedDay && weekDay.dia !== undefined)
                ?.horarios_agendados?.filter(hours => hours.status === "disponivel")
                ?.map(schedule => schedule.horas!.toString());
        }
        if (hourList !== undefined)
            setHourList(hourList);
    }

    useEffect(() => {
        if (user) {
            getFreeTimeList(user)
            workDaysList()
        }
    }, [user])

    useEffect(() => {
        avaliableHourList(selectedDay)
    }, [selectedDay])

    return (
        <View style={styles.container}>
            {label !== undefined ? (
                <Text style={styles.textLabel}>{label}</Text>
            ) : (
                <></>
            )}
            <View style={styles.textInputContainer}>
                <SelectList
                    data={weekDays}
                    setSelected={(val: string) => {
                        onChangeDay(val)
                        setSelectedDay(val)
                    }}
                    save='value'
                />
            </View>
            <View style={styles.textInputContainer}>
                <SelectList
                    data={hourList}
                    setSelected={(val: string) => {
                        onChangeHour(val)
                        setSelectedHour(val)
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