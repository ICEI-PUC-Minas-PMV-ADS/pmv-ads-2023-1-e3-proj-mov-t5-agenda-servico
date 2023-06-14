import React from "react";
import EncryptedStorage from "react-native-encrypted-storage";

import { ActivityIndicator, ScrollView, StyleSheet, Text, TouchableWithoutFeedback, View } from "react-native";
import { AppParamsList } from "../routes/AppParamList";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { BackgroundColor, PrimaryColor, TextInputHintColor, WhiteColor } from "../constants/colors";
import { Tempo, User } from "../models/user";
import { NavigationProp, RouteProp, useNavigation, useRoute } from "@react-navigation/native";
import { PairUserServices, QueryServicesByCategoryAndGroupByUser } from "../repositories/queries/query_services_by_category_and_group_by_user";
import { IcCategorySearch, IcIndexHeartOff, IcIndexHeartOn, IcIndexTwoSquares } from "../constants/icons";
import { useAppContext } from "../contexts/app_context";
import { UserRepository } from "../repositories/user_repository";
import { KEY_USERDATA } from "../constants/app";
import BookingPage from './schedule_service_pages/BookingPage';
import { InputIconText } from "../components/Inputs";
import moment from "moment";
import { Service } from "../models/service";

/**
 * SupplierSelectorPage
 */

export function SupplierSelectorPage(props: NativeStackScreenProps<AppParamsList, 'SupplierSelector'>) {
  const [selectedTab, setSelectedTab] = React.useState(0);
  const [userWithServices, setUserWithServices] = React.useState<PairUserServices[]>([]);
  const [loading, setLoading] = React.useState<boolean>(true);
  const [contentLoading, setContentLoading] = React.useState<boolean>(true);
  const [favoriteSuppliers, setFavoriteSuppliers] = React.useState<string[]>([]);
  const [searchFilter, setSearchFilter] = React.useState<string | undefined>();
  const navigation = useNavigation<NavigationProp<AppParamsList>>();
  const routes = useRoute<RouteProp<AppParamsList, 'SupplierSelector'>>();
  const appContext = useAppContext();

  React.useEffect(() => {
    if (appContext.user?.id) {
      new UserRepository().getFavoriteSuppliers(appContext.user!, (userFavoritySuppliers) => {
        setFavoriteSuppliers(userFavoritySuppliers);
      })
    }
  }, [appContext.user?.id]);

  React.useEffect(() => {
    setContentLoading(true);

    new QueryServicesByCategoryAndGroupByUser(routes.params.categoryId)
      .query((mapUserServices) => {
        const ocurrences: PairUserServices[] = [];
        for (let [_, pairUserServices] of mapUserServices.entries()) {
          if (pairUserServices) {
            ocurrences.push(pairUserServices);
          }
        }
        setUserWithServices(ocurrences);
        setContentLoading(false);
        setLoading(false);
      });
  }, [selectedTab, routes.params.categoryId]);

  const onToggleFavorite = React.useCallback((supplierId: string) => {
    if (appContext.user) {
      new UserRepository().toggleFavoriteSupplier(appContext.user, supplierId, (userFavoritySuppliers) => {
        appContext.user!.favorite_suppliers = userFavoritySuppliers;
        EncryptedStorage.setItem(
          KEY_USERDATA,
          JSON.stringify(appContext.user),
        );
        setFavoriteSuppliers(userFavoritySuppliers);
      });
    }
  }, [appContext.user, appContext.setUser]);

  const twoDigitNumber = (n: number | undefined) => n?.toLocaleString('en-US', {
    minimumIntegerDigits: 2,
    useGrouping: false
  });

  const formatHour = (tempo: Tempo) => {
    return `${tempo?.horas!}:${twoDigitNumber(tempo?.minutos!)}h`;
  };

  const formatWorkingTime = (supplier: User) => {
    const validDay = supplier.lista_de_horarios?.find((day) => day.aberto === true);
    return `${formatHour(validDay?.inicio!)} - ${formatHour(validDay?.fim!)}`;
  };

  const onSelectSupplier = (id: string) => {
    navigation.navigate('BookingRoutes', { id: id });
  }

  /***
   * Aux functions
   */

  const filterScheduledServices = (filter: string | undefined, suppliersWithServices: PairUserServices[]) => {
    if (filter) {
      const lowerCaseFilter = filter.toLowerCase();

      return suppliersWithServices.filter((supplierWithServices) => {
        const formatedWorkingTime = formatWorkingTime(supplierWithServices.supplier);

        const includesInServicesTitulo = (services: Service[]) => services.find((s) => s.titulo?.toLowerCase().includes(lowerCaseFilter)) !== undefined;
        const includesInServicesValor = (services: Service[]) => services.find((s) => s.valor?.toLowerCase().includes(lowerCaseFilter)) !== undefined;

        return (
          supplierWithServices.supplier?.nome_fantasia?.toLowerCase().includes(lowerCaseFilter)
          || supplierWithServices.supplier?.nome?.toLowerCase().includes(lowerCaseFilter)
          || includesInServicesTitulo(supplierWithServices.services)
          || includesInServicesValor(supplierWithServices.services)
          || formatedWorkingTime.toLowerCase().includes(lowerCaseFilter)
        );
      });
    }
    return suppliersWithServices;
  };

  return (
    <View style={style.container}>
      {
        loading
          ? <View style={style.loadingContainer}><ActivityIndicator /></View>
          : (
            <ScrollView style={style.scrollContainer}>
              {/* Header */}

              <View style={style.tabContainer}>
                <TouchableWithoutFeedback onPress={() => setSelectedTab(0)}>
                  <View style={[style.tabItem, selectedTab == 0 && style.tabSelectedItem]}>
                    <Text style={style.tabItemLabel}>Todos</Text>
                  </View>
                </TouchableWithoutFeedback>

                <TouchableWithoutFeedback onPress={() => setSelectedTab(1)}>
                  <View style={[style.tabItem, selectedTab == 1 && style.tabSelectedItem]}>
                    <Text style={style.tabItemLabel}>Favoritos</Text>
                  </View>
                </TouchableWithoutFeedback>
              </View>

              {/* Searchbar */}

              <View style={{ marginBottom: 16 }}>
                <InputIconText
                  margin={0}
                  icon={IcCategorySearch}
                  onChange={(value) => setSearchFilter(value?.trim().length > 0 ? value : undefined)}
                  placeholder="Pesquise seu agendamento" />
              </View>

              {/* Content */}

              <View>
                {
                  contentLoading
                    ? <View style={{ marginTop: 200 }}><ActivityIndicator /></View>
                    : (
                      filterScheduledServices(searchFilter, userWithServices
                        .filter(({ supplier }) => {
                          if (selectedTab === 1) {
                            return favoriteSuppliers.includes(supplier.id!);
                          }
                          return true;
                        }))
                        .map(({ supplier, services }) => (
                          <TouchableWithoutFeedback key={supplier.id!} onPress={() => onSelectSupplier(supplier.id!)}>
                            <View style={style.userContainer}>
                              <Text style={style.label}>Prestador</Text>
                              <Text style={style.value}>{supplier.nome_fantasia ?? supplier.nome ?? ""}</Text>

                              <Text style={[style.label, { marginTop: 20 }]}>Descrição</Text>
                              {
                                services.map((service) => (
                                  <Text key={service.id!} style={style.value}>
                                    {service.titulo} ({service.valor})
                                  </Text>
                                ))
                              }

                              <View style={{ flexDirection: 'row', marginTop: 20 }}>
                                <View style={{ marginEnd: 8 }}><IcIndexTwoSquares /></View>
                                <View>
                                  <Text style={style.label}>
                                    {`Horario: ${formatWorkingTime(supplier)}`}
                                  </Text>
                                </View>
                              </View>

                              <View style={style.heartContainer}>
                                <TouchableWithoutFeedback onPress={() => onToggleFavorite(supplier.id!)}>
                                  {
                                    favoriteSuppliers.includes(supplier.id!)
                                      ? <IcIndexHeartOn />
                                      : <IcIndexHeartOff />
                                  }
                                </TouchableWithoutFeedback>
                              </View>
                            </View>
                          </TouchableWithoutFeedback>
                        ))
                    )
                }
              </View>
            </ScrollView>
          )
      }
    </View>
  );
}

/**
 * Styles
 */

const style = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: BackgroundColor,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: BackgroundColor
  },
  scrollContainer: {
    margin: 16,
  },
  tabContainer: {
    flexDirection: 'row',
  },
  tabItem: {
    flex: 1,
    padding: 12,
    marginVertical: 16,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 25,
  },
  tabSelectedItem: {
    backgroundColor: PrimaryColor,
  },
  tabItemLabel: {
    color: 'white',
  },
  userContainer: {
    flexDirection: 'column',
    justifyContent: 'space-between',
    borderRadius: 5,
    backgroundColor: '#232938',
    padding: 20,
    marginBottom: 20,
    alignItems: 'flex-start',
    fontSize: 16,
    fontFamily: 'Manrope-SemiBold',
  },
  label: {
    color: TextInputHintColor,
  },
  value: {
    color: WhiteColor,
  },
  heartContainer: {
    position: 'absolute',
    top: 16,
    right: 16
  }
});
