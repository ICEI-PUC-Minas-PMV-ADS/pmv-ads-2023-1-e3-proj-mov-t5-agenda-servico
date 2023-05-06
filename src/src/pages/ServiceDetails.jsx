import React, { useState } from "react";
import { StyleSheet, Text, View, TouchableWithoutFeedback } from "react-native";
import { BackgroundColor, WhiteColor, LightGray } from "../constants/colors";
import { PrimaryButton } from "../components/Buttons";
import { useNavigation } from "@react-navigation/native";
import { TimeTextPicker } from "../components/TimeTextPicker";
import { OtherInput } from "../components/OtherInput";
import { Checkbox, Button } from 'react-native-paper';
import Icon from 'react-native-vector-icons/FontAwesome';
import { DeleteButton } from "../components/Buttons";

export function ServiceDetails() {
  const deleteIcon = <Icon name="trash" size={20} />;
  const navigation = useNavigation();
  const [name, setName] = useState('')
  const [price, setPrice] = useState('')
  const [startAt, setStartAt] = React.useState(false);
  const [residence, setResidence] = React.useState(false);

  return (

    <View style={styles.container}>
      <View>
        <View style={{ alignItems: 'center', justifyContent: 'center' }}>
          <Text style={styles.whiteText}> Adicione as informações básicas para este serviço agora. Você poderá adicionar uma descrição e ajustar as cofigurações avançadas para este serviço posteriormente. </Text>
        </View>
        <View>
          <View style={{ marginTop: 20 }}>
            <OtherInput
              label="Nome do serviço"
              value={name}
              onChangeText={text => setName(text)}
            />
          </View>
          <View style={{ marginTop: 20 }}>
            <TimeTextPicker
              inputLabel='Duração'
              onTimeChange={(newTime) => {
                console.log('Novo valor de horas:', newTime.hours)
                console.log('Novo valor de minutos:', newTime.minutes)
              }}
            />
          </View>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <View style={{ flex: 1, marginTop: 20 }}>
              <OtherInput
                label="Preço"
                value={price}
                onChangeText={text => setPrice(text)}
                keyboardType='numeric'
              />
            </View>
            <View style={{ flex: 1, marginTop: 20 }}>
              <TouchableWithoutFeedback onPress={() => {
                setStartAt(!startAt);
              }}>
                <View style={styles.checkbox}>
                  <Checkbox
                    color={WhiteColor}
                    status={startAt ? 'checked' : 'unchecked'}
                  />
                  <Text style={styles.whiteText}>Começa em</Text>
                </View>
              </TouchableWithoutFeedback>
            </View>
          </View>
          <View>
            <TouchableWithoutFeedback onPress={() => {
              setResidence(!residence);
            }}>
              <View style={styles.checkItemContainer}>
                <View style={styles.checkbox}>
                  <Checkbox
                    color={WhiteColor}
                    status={residence ? 'checked' : 'unchecked'}
                  />
                  <Text style={styles.whiteText}>   Atendimento em Domicílio</Text>
                </View>
              </View>
            </TouchableWithoutFeedback>
          </View>
        </View>
      </View>

      <View style={styles.buttonContainer}>
        <View style={{ flex: 1 }}>
          <DeleteButton title={deleteIcon} onPress={() => { navigation.navigate('Services', {}) }} />
        </View>
        <View style={{ flex: 2 }}>
          <PrimaryButton title={'Salvar'} onPress={() => { navigation.navigate('Services', {}) }} />
        </View>
      </View>
    </View >


  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: BackgroundColor,
    padding: 10,
    justifyContent: "space-between"
  },
  buttonContainer: {
    marginBottom: 10,
    flexDirection: 'row'
  },
  whiteText: {
    color: WhiteColor,
    fontFamily: 'Manrope-Bold',
    fontSize: 14
  },
  timeContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    marginTop: 20,
    alignItems: 'center',
    padding: 20
  },
  buttonTimeContainer: {
    flexDirection: 'column',
    alignItems: 'center',

  },
  listItem: {
    borderBottomWidth: 1,
    borderColor: LightGray,
    marginTop: 5,
    padding: 10
  },
  checkbox: {
    flexDirection: "row",
    alignItems: 'center',
  },
  checkItemContainer: {
    flexDirection: "column",
    borderBottomWidth: 1,
    borderBottomColor: LightGray,
    marginTop: 20,
    paddingBottom: 8,
    paddingTop: 8
  },

})