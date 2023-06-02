import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { BackgroundColor, LightGray, PrimaryColor, WhiteColor } from "../constants/colors";
import { List } from 'react-native-paper';
import Icon from 'react-native-vector-icons/FontAwesome';
import { IcBackArrow } from '../constants/icons';
import { useNavigation } from "@react-navigation/native";
import { useAppContext } from '../contexts/app_context';

export function Profile() {
  const appContext = useAppContext();
  const navigation = useNavigation()
  const arrowIcon = <Icon name="chevron-right" size={15} color={LightGray} />;

  return (
    <View style={styles.container}>
      <View style={{ marginTop: 20, marginBottom: 15 }}>
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
      <View style={{ flexDirection: 'column', alignItems: 'flex-start', marginLeft: 25, marginBottom: 30 }}>
        <Text style={styles.textTitle}>Meu</Text>
        <Text style={styles.textTitleWhite}>Perfil</Text>
      </View>
      <View>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate(appContext?.user?.tipo === 'cliente' ? 'ClientProfile' : 'ProfessionalProfile');
          }}>
          <View style={{ flexDirection: 'row', alignItems: 'flex-start', marginLeft: 25, marginRight: 25, marginBottom: 10, justifyContent: 'space-between' }}>
            <Text style={styles.textGray}>MEUS DADOS</Text>
            <Text style={styles.textBlue}>EDITAR</Text>
          </View>
          <View style={{ flexDirection: 'column', alignItems: 'flex-start', marginLeft: 25, marginRight: 25 }}>
            <Text style={styles.textWhitePlus}>{
              appContext?.user?.tipo === 'cliente' ? appContext.user?.nome : appContext.user?.nome_fantasia
            }</Text>
            <Text style={styles.textGray}>{appContext.user?.telefone}</Text>
          </View>
        </TouchableOpacity>
      </View>
      {
        appContext?.user?.tipo === 'prestador' &&
        <View style={{ marginTop: 25 }}>
          <View style={styles.listItem}>
            <List.Item
              title={() => <Text style={styles.textWhite}>SERVIÇOS</Text>}
              onPress={() => {
                navigation.navigate('Services')
              }}
              right={() => arrowIcon}
            />
          </View>
          <View style={styles.listItem}>
            <List.Item
              title={() => <Text style={styles.textWhite}>HORÁRIO DE FUNCIONAMENTO</Text>}
              onPress={() => {
                navigation.navigate('Opening')
              }}
              right={() => arrowIcon}
            />
          </View>
          <View style={styles.listItem}>
            <List.Item
              title={() => <Text style={styles.textWhite}>ENDEREÇO</Text>}
              onPress={() => {
                navigation.navigate('Where')
              }}
              right={() => arrowIcon}
            />
          </View>
        </View>
      }
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: BackgroundColor,
    //justifyContent: "space-between"
  },

  textTitle: {
    color: PrimaryColor,
    fontFamily: 'Manrope-Bold',
    fontSize: 18,
  },

  textTitleWhite: {
    color: WhiteColor,
    textAlign: 'center',
    fontFamily: 'Manrope-Bold',
    fontSize: 45,
  },

  textGray: {
    color: LightGray,
    fontFamily: 'Manrope-Bold',
    fontSize: 14,
    marginBottom: 5
  },
  textWhite: {
    color: WhiteColor,
    fontFamily: 'Manrope-Bold',
    fontSize: 14,
    marginBottom: 5
  },
  textBlue: {
    color: PrimaryColor,
    textAlign: 'center',
    fontFamily: 'Manrope-Bold',
    fontSize: 14,
  },
  textWhitePlus: {
    color: WhiteColor,
    textAlign: 'center',
    fontFamily: 'Manrope-Bold',
    fontSize: 20,
    marginBottom: 5
  },

  listItem: {
    borderBottomWidth: 1,
    borderColor: LightGray,
    marginTop: 5,
    marginLeft: 25,
    marginRight: 25,
    paddingBottom: 10,
    paddingTop: 10
  }

})