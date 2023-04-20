import React from 'react';
import { View } from 'react-native';
import { InputIconText, InputPhoneText, InputText } from '../components/Inputs';
import { BackgroundColor } from '../constants/colors';
import { FacebookButton, GoogleButton, PrimaryButton } from '../components/Buttons';
import { IcCategorySearch, IcEyeSvg } from '../constants/icons';

export function TestPage() {
  return (
    <View style={{ flex: 1, backgroundColor: BackgroundColor }}>
      <InputText placeholder="Digite o nome" label="Digite o Nome e Sobrenome" value="O valor do usuário logado" />
      <PrimaryButton title="Entrar" onPress={() => { }} />

      <View style={{ flexDirection: 'row' }}>
        <GoogleButton onPress={() => { }} />
        <FacebookButton onPress={() => { }} />
      </View>

      <InputText label="Label" placeholder="test" />

      <InputIconText
        label="Label"
        placeholder="Pesquise seu agendamento"
        icon={IcCategorySearch}
      />

      <InputIconText
        label="Label"
        placeholder="test"
        icon={IcEyeSvg}
        iconLocation="end"
      />

      <InputPhoneText label="Label" placeholder="Telefone" />

      <InputPhoneText label="Label" placeholder="Telefone" />

      <InputPhoneText label="Label" placeholder="Telefone" />

      <InputPhoneText label="Label" placeholder="Telefone" />
    </View>);
}
