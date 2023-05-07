import React, { useState } from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { BackgroundColor, WhiteColor } from "../constants/colors";
import { PrimaryButton } from "../components/Buttons";
import { OtherInput } from '../components/OtherInput'
import { TextPicker } from '../components/TextPicker';
import { useNavigation, useRoute } from "@react-navigation/native";
import { HelperText } from 'react-native-paper';
import AsyncStorage from "@react-native-async-storage/async-storage"



export function DisplacementFee() {
  const navigation = useNavigation();
  const route = useRoute();

  const [displacementFee, setDisplacementFee] = useState('')
  const [fee, setFee] = useState('R$ 0,00')
  const [distance, setDistance] = useState('5 km')
  const [type, setType] = useState('Gratuito');

  const [error, setError] = useState(false);


  const types = [
    { label: 'Gratuito', value: 'Gratuito' },
    { label: 'Fixo', value: 'Fixo' },
    { label: 'Começa em', value: 'Começa em', },
  ];
  const distances = [
    { label: '5 km', value: '5 km' },
    { label: '10 km', value: '10 km' },
    { label: '15 km', value: '15 km', },
    { label: '20 km', value: '20 km', },
    { label: '25 km', value: '25 km', },
    { label: '30 km', value: '30 km', },
    { label: '35 km', value: '35 km', },
    { label: '40 km', value: '40 km', },
    { label: '45 km', value: '45 km', },
    { label: '50 km', value: '50 km', },
  ];

  React.useEffect(() => {
    AsyncStorage.getItem('displacementfee').then(value => {
      if (value !== null) {
        setDisplacementFee(JSON.parse(value))
      }
    })
  }, []);

  React.useEffect(() => {
    if (displacementFee) {
      setDistance(displacementFee.distance)
      setFee(displacementFee.fee.value)
      setType(displacementFee.fee.type)
    }
  }, [displacementFee]);


  const handleFeeChange = (text) => {
    // remove tudo que não for número
    const onlyNumbers = text.replace(/[^\d]/g, "");

    // transforma a string de números em um valor monetário formatado em reais
    const formattedValue = (Number(onlyNumbers) / 100).toLocaleString("pt-BR", {
      style: "currency",
      currency: "BRL",
    });

    // atualiza o estado do valor formatado
    if (Number(onlyNumbers) === 0) {
      setFee("")
      setError(true);
    } else {
      // atualiza o estado do valor formatado
      setFee(formattedValue);
      setError(false);
    }


  };

  const editableFee = React.useMemo(() => {
    if (type == 'Gratuito') {
      setFee('R$ 0,00')
      return false
    }
    else return true
  }, [type]);

  const disableFee = React.useMemo(() => {
    if (type == 'Gratuito') {
      return true
    }
    else return false
  }, [type]);

  const newFee = {
    distance: distance,
    fee: {
      type: type,
      value: fee
    },
  }

  const saveFee = () => {
    const newData = JSON.stringify(newFee)
    AsyncStorage.setItem('displacementfee', newData).then(
      navigation.navigate('Opening', {})
    )
  }

  return (
    <View style={styles.container}>
      <View>
        <View style={{ alignItems: 'center', justifyContent: 'center', marginBottom: 15 }}>
          <Text style={styles.whiteText}> Adicione sua taxa mínima de deslocamento. </Text>
        </View>

        <View>
          <TextPicker
            inputLabel='Tipo de preço'
            options={types}
            selectedValue={type}
            onChange={(itemValue, itemIndex) => {
              setType(itemValue)
              setError(false)
            }
            }
          />
          <HelperText></HelperText>
        </View>
        <View>
          <OtherInput
            label="Taxa"
            value={(fee)}
            onChangeText={handleFeeChange}
            keyboardType='numeric'
            editable={editableFee}
            desativado={disableFee}
            error={error}
          />
          <HelperText type="error" visible={error}>
            Por favor, digite um valor diferente de R$0,00 ou altere o tipo
          </HelperText>
        </View>



        <TextPicker
          inputLabel='Distância Máxima de Deslocamento'
          options={distances}
          selectedValue={distance}
          onChange={(itemValue, itemIndex) =>
            setDistance(itemValue)}
        />
        <HelperText></HelperText>
      </View>
      <View style={styles.buttonContainer}>
        <PrimaryButton title={'Continuar'} onPress={() => {
          if (type == 'Começa em' && fee == 'R$ 0,00' || type == 'Fixo' && fee == 'R$ 0,00' || type == 'Começa em' && fee == '' || type == 'Fixo' && fee == '') {
            setError(true)
          }
          else saveFee()

        }} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: BackgroundColor,
    padding: 10,
    justifyContent: "space-between"
  },
  inputContainer: {
    flex: 1
  },
  valueContainer: {
    flexDirection: 'row'
  },
  whiteText: {
    color: WhiteColor,
    fontFamily: 'Manrope-Bold',
    fontSize: 14
  },

});


