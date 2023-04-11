import React from "react";
import { StyleSheet, Text, View, FlatList } from "react-native";
import { List } from 'react-native-paper';
import Categories from "../example/bd";
import { BackgroundColor, WhiteColor } from "../constants/colors";
import { useNavigation } from "@react-navigation/native";
import Icon from 'react-native-vector-icons/FontAwesome';

const arrowIcon = <Icon name="chevron-right" size={15} color={WhiteColor} />;

export function Category() {
  const navigation = useNavigation();
  const Item = ({ title }) => (
    <View style={styles.listItem}>
      <List.Item
        title={() => <Text style={styles.whiteText}>{title}</Text>}
        onPress={() => { navigation.navigate('WhereWork', {}) }}
        right={() => arrowIcon}
      />
    </View>

  );
  return (
    <View style={styles.container}>

      <FlatList
        data={Categories}
        renderItem={({ item }) => <Item title={item.name} />}
        keyExtractor={item => item.id}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: BackgroundColor,
    paddingLeft: 20,
    paddingRight: 20,
    paddingTop: 5,
    justifyContent: "space-between"
  },
  whiteText: {
    color: WhiteColor,
    fontFamily: 'Manrope-Bold',
    fontSize: 16
  },
  listItem: {
    borderBottomWidth: 1,
    borderColor: WhiteColor,
    marginTop: 5,
    padding: 10
  }

});