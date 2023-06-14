import React from "react";

import { ActivityIndicator, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { Category } from "../models/category";
import { CategoryRepository } from "../repositories/category_repository";
import { BackgroundColor } from "../constants/colors";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { AppParamsList } from "../routes/AppParamList";
import { IcFrontArrow } from "../constants/icons";

/***
 * CategorySelectorPage
 */

export function CategorySelectorPage(props: NativeStackScreenProps<AppParamsList, 'CategorySelector'>) {
  const [loading, setLoading] = React.useState<boolean>(true);
  const [categories, setCategories] = React.useState<Category[]>([]);
  const categoryRepo = new CategoryRepository();

  /***
   * Events
   */

  const onClickCategory = (categoryId: string) => {
    props.navigation.navigate("SupplierSelector", { categoryId: categoryId });
  };

  React.useEffect(() => {
    categoryRepo.getAll((serverCategories) => {
      if (serverCategories) {
        setCategories(serverCategories);
      }
      setLoading(false);
    });
  }, []);

  return (
    <View style={styles.container}>
      {
        loading
          ? <View style={styles.loadingContainer}><ActivityIndicator /></View>
          : (
            <ScrollView style={styles.categoryContainer}>
              {categories.map((category, index) => {
                return (
                  <View key={category.id} style={{ marginBottom: index === categories.length - 1 ? 16 : 0 }}>
                    <TouchableOpacity style={styles.category} onPress={() => onClickCategory(category.id!)}>
                      <Text style={{ color: '#FFFFFF' }}>{category.titulo}</Text>
                      <IcFrontArrow />
                    </TouchableOpacity>
                  </View>
                );
              })}
            </ScrollView>
          )
      }
    </View>
  );
}

/***
 * Styles
 */

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: BackgroundColor,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: BackgroundColor,
  },
  categoryContainer: {
    padding: 16,
  },
  category: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderRadius: 5,
    backgroundColor: '#232938',
    padding: 20,
    marginBottom: 20,
    alignItems: 'center',
    fontSize: 16,
    fontFamily: 'Manrope-SemiBold',
  },
});