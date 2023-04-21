import React, { useState } from "react"
import { StyleSheet, Text, View, FlatList } from "react-native";
import { List } from 'react-native-paper';
import { BackgroundColor, WhiteColor, LightGray } from "../constants/colors";
import { PrimaryButton } from "../components/Buttons";
import Icon from 'react-native-vector-icons/FontAwesome';
import dataOpening from "../example/openingHours";
import { useNavigation } from "@react-navigation/native";

export function Opening() {
  const arrowIcon = <Icon name="chevron-right" size={15} color={LightGray} />;
  const navigation = useNavigation();

  const Item = ({ title, opening, closure, open }) => {
    const renderTime = () => {
      if (open === true) {
        return (
          <Text style={styles.whiteText}>{opening} - {closure}</Text>
        )
      }
      else {
        return (
          <Text style={styles.whiteText}>Fechado</Text>
        )

      }
    }

    return (
      <View style={styles.listItem}>
        <List.Item
          title={() => <View style={styles.titleContainer}>
            <View>
              <Text style={styles.whiteText}>{title}</Text>
            </View>

            <View>
              <Text>{renderTime()}</Text>
            </View>


          </View>
          }
          onPress={() => { navigation.navigate('Day', {}) }}
          right={() => arrowIcon}
          description={() => {

          }
          }
        />
      </View>
    )
  }

    ;

  return (
    <View style={styles.container}>
      <View>
        <View style={{ alignItems: 'center', justifyContent: 'center' }}>
          <Text style={styles.whiteText}> Quando os clientes podem reservar com você? </Text>
        </View>
        <View style={styles.listContainer}>

          <FlatList
            data={dataOpening}
            renderItem={({ item }) => <Item title={item.day} opening={item.opening} closure={item.closure} open={item.open} />}
            keyExtractor={item => item.id}
          />

        </View>
      </View>
      <View style={styles.buttonContainer}>
        <PrimaryButton title={'Continuar'} onPress={() => { navigation.navigate('Address', {}) }} />
      </View>
    </View>

  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: BackgroundColor,
    padding: 10,
    justifyContent: "space-between"

  },
  whiteText: {
    color: WhiteColor,
    fontFamily: 'Manrope-Bold',
    fontSize: 14
  },

  buttonContainer: {
    marginBottom: 10
  },
  listItem: {
    borderBottomWidth: 1,
    borderColor: LightGray,
    marginTop: 5,
    padding: 10
  },
  titleContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: "space-between",
    paddingRight: 70
  },
  listContainer: {
    marginTop: 15
  }

})

