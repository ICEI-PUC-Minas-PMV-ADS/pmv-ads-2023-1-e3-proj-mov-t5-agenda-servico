import React from "react"
import { StyleSheet, Text, View, FlatList } from "react-native";
import { List } from 'react-native-paper';
import { BackgroundColor, WhiteColor, LightGray } from "../constants/colors";
import { PrimaryButton } from "../components/Buttons";
import Icon from 'react-native-vector-icons/FontAwesome';
import services from "../example/services";
import { useNavigation } from "@react-navigation/native";

export function Services() {
  const arrowIcon = <Icon name="chevron-right" size={15} color={LightGray} style={{ marginLeft: 20 }} />;
  const plusIcon = <Icon name="plus" size={20} color={WhiteColor} />
  const navigation = useNavigation();

  const Item = ({ title, duration, price }) => {

    return (
      <View style={styles.listItem}>
        <List.Item
          title={() => <View style={styles.titleContainer}>
            <View>
              <Text style={styles.whiteText}>{title}</Text>
              <Text style={styles.description}>{duration.hours}h {duration.minutes}min</Text>
            </View>

            <View style={styles.priceContainer}>
              <Text style={styles.whiteText}>R${price}</Text>
              {arrowIcon}
            </View>


          </View>
          }
          onPress={() => { navigation.navigate('ServiceDetails', {}) }}


        />
      </View>
    )
  }

    ;

  return (
    <View style={styles.container}>
      <View>
        <View style={{ alignItems: 'center', justifyContent: 'center' }}>
          <Text style={styles.whiteText}> Adicione pelo menos um serviço agora. Posteriormente, você pode adicionar mais, editar detalhes e agrupar serviços em categorias. </Text>
        </View>
        <View style={styles.listContainer}>
          <FlatList
            data={services}
            renderItem={({ item }) => <Item title={item.name} duration={item.duration} price={item.price} />}
            keyExtractor={item => item.id}
          />
          <View style={styles.listItem}>
            <List.Item
              title={() => <Text style={styles.whiteText}>Adicionar serviço</Text>}
              onPress={() => { navigation.navigate('ServiceDetails', {}) }}
              left={() => plusIcon}
            />
          </View>
        </View>
      </View>
      <View style={styles.buttonContainer}>
        <PrimaryButton title={'Continuar'} onPress={() => { navigation.navigate('Home', {}) }} />
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
    padding: 10,
  },
  titleContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: "space-between",
    alignItems: 'center'
  },
  listContainer: {
    marginTop: 15
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