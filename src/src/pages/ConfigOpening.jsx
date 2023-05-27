import React from "react"
import { StyleSheet, Text, View, FlatList, TouchableOpacity } from "react-native";
import { List } from 'react-native-paper';
import { BackgroundColor, WhiteColor, LightGray } from "../constants/colors";
import { PrimaryButton } from "../components/Buttons";
import Icon from 'react-native-vector-icons/FontAwesome';
import { useNavigation, useIsFocused } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage"
import openingHours from "../example/openingHours";

export function Opening() {
  const arrowIcon = <Icon name="chevron-right" size={15} color={LightGray} />;
  const navigation = useNavigation();
  const isFocused = useIsFocused();
  const HoursOpening = JSON.stringify(openingHours)
  //criação ou recuperação dos dados 
  const [dataOpening, setDataOpening] = React.useState('')



  const getData = () => {
    AsyncStorage.getItem('opening').then(value => {
      if (value !== null) {
        setDataOpening(JSON.parse(value))
      }
      else {
        AsyncStorage.setItem('opening', HoursOpening).then(
          AsyncStorage.getItem('opening').then(
            value => setDataOpening(JSON.parse(value))
          )

        )
      }
    })
  }

  React.useEffect(() => {
    getData()
  }, [isFocused])


  function addZeroes(num, len) {
    var numberWithZeroes = String(num);
    var counter = numberWithZeroes.length;
    while (counter < len) {
      numberWithZeroes = "0" + numberWithZeroes;
      counter++;
    }
    return numberWithZeroes;
  }


  const Item = ({ title, openingHours, openingMinutes, closureHours, closureMinutes, open }) => {
    const renderTime = () => {
      if (open === true) {
        return (
          <Text style={styles.whiteText}>{addZeroes(openingHours, 2)}:{addZeroes(openingMinutes, 2)}  -  {addZeroes(closureHours, 2)}:{addZeroes(closureMinutes, 2)} </Text>
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
          right={() => arrowIcon}
        />
      </View>
    )
  }

  const navigateToDay = (item, index) => {
    navigation.navigate('Day', { dayIndex: index });
  }



  return (
    <View style={styles.container}>
      <View>
        <View style={{ alignItems: 'center', justifyContent: 'center' }}>
          <Text style={styles.whiteText}> Quando os clientes podem reservar com você? </Text>
        </View>
        <View style={styles.listContainer}>

          <FlatList
            data={dataOpening}

            renderItem={({ item, index }) =>
              <TouchableOpacity onPress={() => navigateToDay(item, index)}>
                <Item title={item.day} openingHours={item.opening.hours} openingMinutes={item.opening.minutes} closureHours={item.closure.hours} closureMinutes={item.closure.minutes} open={item.open} />
              </TouchableOpacity>
            }


          />

        </View>
      </View>
      <View style={styles.buttonContainer}>
        <PrimaryButton title={'Continuar'} onPress={() => {
          navigation.navigate('Services', {})
        }} />
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

