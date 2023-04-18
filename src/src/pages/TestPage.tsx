import React from 'react';
import { ScrollView, View } from 'react-native';
import { InputText } from '../components/Inputs';
import { BackgroundColor } from '../constants/colors';

export function TestPage() {
  return (
    <View style={{ flex: 1, backgroundColor: BackgroundColor }}>
      <InputText placeholder="Digite o nome" label="Digite o Nome e Sobrenome" value="O valor do usuário logado" />
    </View>);
}
