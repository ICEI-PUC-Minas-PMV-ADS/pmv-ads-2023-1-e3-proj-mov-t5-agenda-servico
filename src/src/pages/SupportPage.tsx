import React, { useState } from 'react';
import {
  BackgroundColor,
  SecondaryColor,
} from '../constants/colors';
import {
  View,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  Text,
  Alert,
  TextInput,
} from 'react-native';
import { IcBackArrow } from '../constants/icons';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { AppParamsList } from '../routes/ParamList';

export function SupportPage({
  navigation,
}: NativeStackScreenProps<AppParamsList, 'Support'>) {
  const [motivo, setMotivo] = useState('');
  const [descricao, setDescricao] = useState('');
  return (
    <View style={{ flex: 1, backgroundColor: 'blue' }}>
      <View style={{ flex: 1 }}>
        <ScrollView
          style={styles.scrollContainer}
          contentInsetAdjustmentBehavior="automatic">
          <View style={styles.container}>
            <View style={{ marginTop: 20 }}>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'flex-start',
                }}>
                <TouchableOpacity
                  onPress={() => {
                    navigation.pop();
                  }}
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    marginBottom: 5,
                  }}>
                  <View style={{ marginLeft: 12 }}>
                    <IcBackArrow />
                  </View>
                  <View style={{ marginLeft: 10 }}>
                    <Text style={{ color: '#FDFDFD', fontSize: 18 }}>Voltar</Text>
                  </View>
                </TouchableOpacity>
              </View>
            </View>

            <View style={{ flex: 1, alignItems: 'center' }}>
              <Text
                style={{
                  color: '#FDFDFD',
                  fontSize: 25,
                  marginTop: 25,
                }}>
                Solicitação
              </Text>
            </View>

            <View style={styles.container}>
              <View style={styles.container}>
                <Text style={styles.label}>Motivo</Text>
                <TextInput
                  style={styles.input}
                  onChangeText={text => setMotivo(text)}
                  value={motivo}
                  placeholder="Digite o motivo"
                />

                <Text style={styles.label}>Descrição</Text>
                <TextInput
                  style={[styles.input, styles.textarea]}
                  onChangeText={text => setDescricao(text)}
                  value={descricao}
                  placeholder="Digite a descrição"
                  multiline={true}
                  numberOfLines={12}
                />
              </View>
            </View>

            <View style={{ justifyContent: 'center', width: '100%' }}>
              <View style={{ alignItems: 'center' }}>
                <TouchableOpacity
                  style={styles.button}
                  onPress={() => {
                    navigation.pop();
                    Alert.alert('Solicitação enviada', 'Aguarde até 72h!', [
                      { text: 'Ok' },
                    ]);
                  }}>
                  <Text style={{ color: '#FDFDFD' }}>Enviar</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </ScrollView>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  scrollContainer: {
    flex: 1,
    backgroundColor: BackgroundColor,
  },
  button: {
    alignItems: 'center',
    padding: 15,
    fontSize: 16,
    fontFamily: 'Manrope-SemiBold',
    backgroundColor: SecondaryColor,
    borderRadius: 15,
  },
  label: {
    fontSize: 17,
    marginBottom: 5,
    color: '#FDFDFD',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    marginBottom: 20,
    backgroundColor: '#232938',
  },
  textarea: {
    height: 180,
    textAlignVertical: 'top',
  },
});
