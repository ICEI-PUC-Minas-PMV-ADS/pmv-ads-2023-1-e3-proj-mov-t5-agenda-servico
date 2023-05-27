import React from "react"
import { StyleSheet, Text, View, FlatList, TouchableOpacity } from "react-native";
import { HelperText, List } from 'react-native-paper';
import { BackgroundColor, WhiteColor, LightGray, PrimaryColor, BackgroundInput } from "../constants/colors";
import { PrimaryButton } from "../components/Buttons";
import Icon from 'react-native-vector-icons/FontAwesome';
import baseServices from "../example/services";
import { useNavigation, useIsFocused } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage"
import { TestRegister } from "./Register";
import { ActivityIndicator } from 'react-native-paper';

const convertedBaseSevices = JSON.stringify(baseServices)

export function Services() {
  const arrowIcon = <Icon name="chevron-right" size={15} color={LightGray} style={{ marginLeft: 20 }} />;
  const plusIcon = <Icon name="plus" size={20} color={WhiteColor} />
  const navigation = useNavigation();
  const isFocused = useIsFocused();
  const [services, setServices] = React.useState('')
  const [loading, setLoading] = React.useState(true)
  const [error, setError] = React.useState(false)

  const getData = () => {
    AsyncStorage.getItem('services').then(value => {
      if (value !== null) {
        setServices(JSON.parse(value))
        setLoading(false)
      }

      else {
        AsyncStorage.setItem('services', convertedBaseSevices).then(
          AsyncStorage.getItem('services').then(
            value => {
              setServices(JSON.parse(value))
              setLoading(false)
            }
          )

        )
      }
    })
  }

  React.useEffect(() => {
    getData()
  }, [isFocused])


  const Item = ({ title, duration, price }) => {
    if (loading == false) {
      return (
        <View style={styles.listItem}>
          <List.Item
            title={() => <View style={styles.titleContainer}>
              <View>
                <Text style={styles.whiteText}>{title}</Text>
                <Text style={styles.description}>{duration.hours}h {duration.minutes}min</Text>
              </View>

              <View style={styles.priceContainer}>
                <Text style={styles.whiteText}>{price}</Text>
                {arrowIcon}
              </View>


            </View>
            }
          />
        </View>
      )
    }
  }

  const navigateToDetails = (index) => {
    navigation.navigate('ServiceDetails', { serviceIndex: index });
  }



  return (

    <View style={styles.loadingContainer}>
      {
        loading &&
        <ActivityIndicator animating={loading} color={PrimaryColor} />
      }
      {
        loading == false &&
        <View style={styles.container}>
          <View>
            <View style={{ alignItems: 'center', justifyContent: 'center' }}>
              <Text style={styles.whiteText}> Adicione pelo menos um serviço agora. Posteriormente, você pode adicionar mais, editar detalhes e agrupar serviços em categorias. </Text>
            </View>
            <View style={{ marginTop: 15 }}>
              <View style={styles.listAdd}>
                <List.Item
                  title={() => <Text style={styles.whiteText}>Adicionar serviço</Text>}
                  onPress={() => {
                    setError(false)
                    navigation.navigate('ServiceDetails', {})
                  }}
                  left={() => plusIcon}
                />
              </View>
              <View style={styles.listContainer}>
                {loading == false &&
                  <FlatList
                    data={services}
                    renderItem={({ item, index }) =>
                      <TouchableOpacity onPress={() => navigateToDetails(index)}>
                        <Item title={item.name} duration={item.duration} price={item.price} />
                      </TouchableOpacity>
                    }

                  />}

              </View>
            </View>
          </View>
          <View style={styles.buttonContainer}>
            <View style={{ alignItems: 'center' }}>
              <HelperText type="error" visible={error}>
                {
                  error == true &&
                  <Text>Por favor, adicione pelo menos um serviço</Text>
                }
              </HelperText>
            </View>
            <PrimaryButton title={'Continuar'} onPress={() => {
              if (services.length == 0) {
                setError(true)
              }
              else {
                navigation.navigate('Register', {})
              }

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

  buttonContainer: {

  },
  listItem: {
    borderBottomWidth: 1,
    borderColor: LightGray,
    padding: 10,

  },
  listAdd: {
    borderBottomWidth: 1,
    borderColor: WhiteColor,
    padding: 10,
  },
  titleContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: "space-between",
    alignItems: 'center'
  },
  listContainer: {
    maxHeight: 370
  },
  description: {
    color: LightGray,
    fontFamily: 'Manrope-Bold',
    fontSize: 12,
  },
  priceContainer: {
    flexDirection: 'row',

  }

})