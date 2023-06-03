import { StyleSheet, View, Text, Button } from "react-native";
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
import {  User } from "../models/user";
import DatePicker from 'react-native-date-picker';
import { InputText } from "./Inputs";
import { ScheduledServicesRepository } from "../repositories/scheduled_services";
import moment from "moment";

interface ServiceDateSelectorProps {
    label?: String,
    professionalId?: string,
    onChangeDate: (val: Date) => void,
    onChangeHour: (val: string) => void,
}

export default function ServiceDateSelector({ label, professionalId, onChangeDate, onChangeHour }: ServiceDateSelectorProps) {
    const [date, setDate] = useState(new Date());
    const [open, setOpen] = useState(false);
    const [hourList, setHourList] = useState<number[]>([])
    const [user, setUser] = useState<User>();

    const userRep = new UserRepository();
    const scheduleRep = new ScheduledServicesRepository();

    useEffect(() => {
        if (professionalId) {
            userRep.get(professionalId, (e) => {
                setUser(e)
            })
        }
    }, [])

    // Filtra os horários dísponiveis do dia
    function getFreeHoursList(eUser: User, day: string) {
        let listaDisponiveisDeHoras: number[] = [];
        eUser.lista_de_horarios?.forEach(weekDay => {
            if (weekDay.aberto === true && weekDay.dia === day) {
                for (let day_hours = weekDay.inicio!.horas!; day_hours < weekDay.fim!.horas!; day_hours++) {
                    if (weekDay.intervalos!.filter(hour => day_hours >= hour.inicio!.horas! && day_hours < hour.fim!.horas!).length > 0) {
                        continue
                    }
                    listaDisponiveisDeHoras.push(day_hours)
                }
            }
        })
        return listaDisponiveisDeHoras;
    }

    function filterAvaliableHours(eUser: User, edata: Date, eHoursList: number[]) {
        let transformedData = moment(edata).format("YYYY/MM/DD")
        let listWithWheHoursAlreadyFiltered: number[] = [];

        scheduleRep.filterScheduledServicesByUser(eUser, schedules => {
            let filteredScheduleServices = schedules.filter(service => {
                let data = moment(service.data).format("YYYY/MM/DD");
                return moment(transformedData).isSame(data)
            })
            eHoursList.forEach(avaliableHours => {
                if (filteredScheduleServices.find(e => e.data?.getHours() === avaliableHours) === undefined) {
                    listWithWheHoursAlreadyFiltered.push(avaliableHours)
                }
            })
        })
        return listWithWheHoursAlreadyFiltered
    }

    function weekDayConverter(day: number) {
        switch (day) {
            case 0:
                return "Domingo"
            case 1:
                return "Segunda-Feira"
            case 2:
                return "Terça-Feira"
            case 3:
                return "Quarta-Feira"
            case 4:
                return "Quinta-Feira"
            case 5:
                return "Sexta-Feira"
            case 6:
                return "Sábado"
            default:
                return "nenhum"
        }
    }

    return (
        <View style={styles.container}>
            {label !== undefined ? (
                <Text style={styles.textLabel}>{label}</Text>
            ) : (
                <></>
            )}

            <View>
                <Button title="Data do Evento" onPress={() => setOpen(true)} />
                <DatePicker
                    modal
                    open={open}
                    date={date}
                    mode={"date"}
                    minimumDate={new Date()}
                    locale="pt-BR"
                    onConfirm={(date) => {
                        setOpen(false)
                        setDate(date)
                        onChangeDate(date)
                        if (user) {
                            let listOfAvaliableHours = getFreeHoursList(user, weekDayConverter(date.getDay()))
                            let finalListOfHours = filterAvaliableHours(user, date, listOfAvaliableHours)
                            setHourList(finalListOfHours)
                        }
                    }}
                    onCancel={() => {
                        setOpen(false)
                    }}
                />
            </View>


            <View style={styles.textInputContainer}>
                <InputText
                    placeholder="Data"
                    label="Data do Evento "
                    value={date.toLocaleDateString("pt-BR")}
                    readonly
                />
                <InputText
                    placeholder="Data"
                    label="Dia da Semana "
                    value={weekDayConverter(date.getDay())}
                    readonly
                />
            </View>


            <View style={styles.textInputContainer}>
                <SelectList
                    data={hourList}
                    setSelected={(val: string) => {
                        onChangeHour(val)
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