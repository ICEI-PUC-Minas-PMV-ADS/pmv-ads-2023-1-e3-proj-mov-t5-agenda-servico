import React from "react"
import { StyleSheet, Text, View, FlatList, TouchableOpacity } from "react-native";
import { List, ActivityIndicator } from 'react-native-paper';
import { BackgroundColor, WhiteColor, LightGray, PrimaryColor } from "../constants/colors";
import { PrimaryButton } from "../components/Buttons";
import Icon from 'react-native-vector-icons/FontAwesome';
import { useNavigation, useIsFocused } from "@react-navigation/native";
import { useAppContext } from '../contexts/app_context';
import { UserRepository } from "../repositories/user_repository";

const Header = ({ loading }) => {
  const navigation = useNavigation();

  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: !loading
    });
  }, [navigation, loading]);

  return null;
};

export function Opening() {
  const appContext = useAppContext();
  const userRepository = new UserRepository()
  const arrowIcon = <Icon name="chevron-right" size={15} color={LightGray} />;
  const navigation = useNavigation();
  const isFocused = useIsFocused();
  const [loading, setLoading] = React.useState(true)

  //criação ou recuperação dos dados 
  const [dataOpening, setDataOpening] = React.useState('')

  const getData = () => {
    userRepository.get(appContext.user?.id, user => {
      setDataOpening(user.lista_de_horarios)
      setLoading(false)
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
    <View style={{ flex: 1 }}>
      <Header loading={loading} />
      {
        loading &&
        <View style={styles.loadingContainer}>
          <Text style={styles.whiteText}>Aguarde um instante</Text>
          <ActivityIndicator style={{ marginTop: 20 }} animating={loading} color={PrimaryColor} />
        </View>
      }
      {
        loading == false &&
        <View style={styles.container}>
          <View>
            <FlatList
              data={dataOpening}

              renderItem={({ item, index }) =>
                <TouchableOpacity onPress={() => navigateToDay(item, index)}>
                  <Item title={item.dia} openingHours={item.inicio.horas} openingMinutes={item.inicio.minutos} closureHours={item.fim.horas} closureMinutes={item.fim.minutos} open={item.aberto} />
                </TouchableOpacity>
              }
            />
          </View>
          <View style={styles.buttonContainer}>
            <PrimaryButton title={'Salvar'} onPress={() => {
              navigation.navigate('Profile', {})
            }} />
          </View>
        </View>
      }
    </View>
  )
}

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    backgroundColor: BackgroundColor,
    justifyContent: 'center',
    alignItems: 'center'
  },
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


})

