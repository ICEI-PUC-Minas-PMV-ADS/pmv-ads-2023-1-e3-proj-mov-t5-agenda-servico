import React from "react"
import { StyleSheet, Text, View, FlatList, TouchableOpacity } from "react-native";
import { HelperText, List } from 'react-native-paper';
import { BackgroundColor, WhiteColor, LightGray, PrimaryColor } from "../constants/colors";
import { PrimaryButton } from "../components/Buttons";
import Icon from 'react-native-vector-icons/FontAwesome';
import { useNavigation, useIsFocused } from "@react-navigation/native";
import { ActivityIndicator } from 'react-native-paper';
import { useAppContext } from '../contexts/app_context';
import { ServiceRepository } from "../repositories/service_repository";

const Header = ({ loading }) => {
  const navigation = useNavigation();

  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: !loading
    });
  }, [navigation, loading]);

  return null;
};

export function Services() {
  const appContext = useAppContext();
  const arrowIcon = <Icon name="chevron-right" size={15} color={LightGray} style={{ marginLeft: 20 }} />;
  const plusIcon = <Icon name="plus" size={20} color={WhiteColor} />
  const navigation = useNavigation();
  const isFocused = useIsFocused();
  const [services, setServices] = React.useState('')
  const [loading, setLoading] = React.useState(true)
  const [error, setError] = React.useState(false)

  const getData = () => {
    const serviceRepository = new ServiceRepository()
    serviceRepository.getAll((
      allServices => {
        const services = allServices.filter(service => service.prestador_servico_fk == appContext.user?.id)
        setServices(services)
        setLoading(false)
      }
    ))
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
                <Text style={styles.description}>{duration.horas}h {duration.minutos}min</Text>
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
    navigation.navigate('UpdateServices', { services: services, serviceIndex: index });
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
            <View style={{ alignItems: 'center', justifyContent: 'center' }}>
              <Text style={styles.whiteText}> Adicione novos serviços ou edite os que já existem. </Text>
            </View>
            <View style={{ marginTop: 15 }}>
              <View style={styles.listAdd}>
                <List.Item
                  title={() => <Text style={styles.whiteText}>Adicionar serviço</Text>}
                  onPress={() => {
                    setError(false)
                    navigation.navigate('UpdateServices', { services: services })
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
                        <Item title={item.titulo} duration={item.duracao} price={item.valor} />
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
            <PrimaryButton title={'Salvar'} onPress={() => {
              if (services.length == 0) {
                setError(true)
              }
              else {
                navigation.navigate('Profile', {})
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