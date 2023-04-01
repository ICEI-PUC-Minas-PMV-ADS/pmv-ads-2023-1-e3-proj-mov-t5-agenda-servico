import React from 'react';
import {ScrollView, StyleSheet, View} from 'react-native';
import {PrimaryButton, GoogleButton, FacebookButton} from '../components/Buttons';
import {InputText, InputIconText, InputPhoneText} from '../components/Inputs';
import { BackgroundColor } from '../constants/colors';
import { IcEyeSvg, IcCategorySearch } from '../constants/icons';
import { BottomNavigation } from '../components/BottomNavigation';


export function PortifolioPage() {
  return <View style={{ flex: 1 }}><BottomNavigation tab1Component={PortifolioPage1} /></View>
}

export function PortifolioPage1() {
  return (
    <View style={{flex: 1}}>
      <ScrollView style={styles.scrollContainer} contentInsetAdjustmentBehavior="automatic">
        <View style={styles.container}>
          <PrimaryButton title="Entrar" onPress={() => {}} />

          <View style={{flexDirection: 'row'}}>
            <GoogleButton onPress={() => {}} />
            <FacebookButton onPress={() => {}} />
          </View>

          <InputText label="Label" placeholder="test" />

          <InputIconText label="Label" placeholder="Pesquise seu agendamento" icon={IcCategorySearch} />

          <InputIconText label="Label" placeholder="test" icon={IcEyeSvg} iconLocation='end' />

          <InputPhoneText label='Label' placeholder='Telefone'/>

          <InputPhoneText label='Label' placeholder='Telefone'/>

          <InputPhoneText label='Label' placeholder='Telefone'/>

          <InputPhoneText label='Label' placeholder='Telefone'/>        
        </View>
      </ScrollView>      
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,    
  },
  scrollContainer: {
    flex: 1,
    backgroundColor: BackgroundColor,
  }
});
