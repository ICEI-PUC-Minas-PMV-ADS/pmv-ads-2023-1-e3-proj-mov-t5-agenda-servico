import React from 'react';
import EncryptedStorage from 'react-native-encrypted-storage';
import moment from 'moment';

import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { View, Text, StyleSheet, TouchableWithoutFeedback, Image, ActivityIndicator, ScrollView, Alert, PermissionsAndroid } from 'react-native';
import { AppParamsList } from '../../routes/AppParamList';
import { KEY_USERDATA } from '../../constants/app';
import { useAppContext } from '../../contexts/app_context';
import { BackgroundColor, WhiteColor } from '../../constants/colors';
import { PrimaryColor } from '../../constants/colors';
import { InputIconText } from '../../components/Inputs';
import { IcCategorySearch } from '../../constants/icons';
import { ScheduledServices } from '../../models/scheduled_services';
import { ScheduledServiceList } from './components/ScheduledServiceList';
import { ScheduledServicesRepository } from '../../repositories/scheduled_services';
import { QueryValidateTimeOfScheduleServices } from '../../repositories/queries/query_validate_time_of_schedule_services';
import { BottomNavigation } from '../../components/bottom_navigation';
import { useNavigation, useNavigationState, NavigationProp } from '@react-navigation/native';
import { ServiceRepository } from '../../repositories/service_repository';
import { Service } from '../../models/service';
import { HomeConsumer, HomeProvider } from './context/home_context';
import { useMessageContext } from '../../contexts/message_context';
import { UserRepository } from '../../repositories/user_repository';

/***
 * HomePageImpl
 */

function HomePageImpl({
  navigation,
}: NativeStackScreenProps<AppParamsList, 'Home'>) {
  const [loading, setLoading] = React.useState(true);
  const [scheduledServices, setScheduledServices] = React.useState<ScheduledServices[]>([]);
  const [services, setServices] = React.useState<Service[]>([]);

  const { user, setUser } = useAppContext();
  const messageContext = useMessageContext();

  /***
   * Effects
   */

  React.useLayoutEffect(() => {
    if (!user) {
      EncryptedStorage.getItem(KEY_USERDATA).then(userData => {
        if (userData) {
          setUser(JSON.parse(userData));
        } else {
          navigation?.replace('Login', {});
        }
      });
    }
  }, []);

  React.useEffect(() => {
    if (user) {
      const scheduledServicesRepo = new ScheduledServicesRepository();
      scheduledServicesRepo.filterScheduledServicesByUser(user, (filteredScheduledServices) => {
        new QueryValidateTimeOfScheduleServices(filteredScheduledServices)
          .query()
          .then((queryScheduledServices) => {
            const filteredServices: Service[] = [];
            const serviceRepo = new ServiceRepository();

            serviceRepo.getAll((services) => {
              services?.forEach((service) => {
                if (queryScheduledServices.find((scheduledService) => scheduledService.servico_fk === service.id)) {
                  filteredServices.push(service);
                }
              });

              setServices(filteredServices);
              setScheduledServices(queryScheduledServices);
              setLoading(false);
            });
          });
      });

      const userRepo = new UserRepository();
      userRepo.getUnnotifiedNotifications(user, (notifications) => {
        if (notifications && notifications?.length > 0) {
          userRepo.markAsNotifiedNotifications(user, notifications, (updatedNotifications) => {
            const showNotification = (currentNotification: number) => setTimeout(() => {
              messageContext.dispatchMessage({ type: 'notificatiton', message: updatedNotifications[currentNotification].message ?? "" });

              if (currentNotification > 0) {
                showNotification(currentNotification - 1);
              }
            }, 10000);

            if (notifications?.length > 0) {
              showNotification(notifications.length - 1);
            }
          });
        }
      });
    }
  }, [user]);

  return (
    <HomeProvider value={{ scheduledServices, services, setScheduledServices, setServices }}>
      {
        loading
          ? <View style={style.loadingContainer}><ActivityIndicator /></View>
          : <HomePageContent />
      }
    </HomeProvider>
  );
}


/***
 * HomePageContent
 */

function HomePageContent() {
  const [searchFilter, setSearchFilter] = React.useState<string | undefined>();
  const navigation = useNavigation<NavigationProp<AppParamsList>>();

  /***
   * Aux functions
   */

  const filterScheduledServices = (filter: string | undefined, scheduledServicesList: ScheduledServices[], servicesList: Service[]) => {
    if (filter) {
      return scheduledServicesList.filter((scheduledService) => {
        const relatedService = servicesList.find(findedService => findedService.id === scheduledService.servico_fk);
        const dateHour = moment(scheduledService.data).format("DD/MM/YYYY hh:mm");
        return (
          scheduledService.descricao?.toLowerCase().includes(filter)
          || scheduledService.status?.toLowerCase().includes(filter)
          || relatedService?.titulo?.toLowerCase().includes(filter)
          || dateHour?.toLowerCase().includes(filter)
        );
      });
    }
    return scheduledServicesList;
  };

  /***
   * Events
   */

  const onFabClick = () => {
    navigation.navigate("CategorySelector", {});
  };

  return (
    <View style={{ width: '100%', height: '100%' }}>

      {/* Content */}

      <View style={style.container}>
        <ScrollView style={style.scrollContainer}>
          <Text style={style.title}>Agendamentos</Text>

          {/* Searchbar */}

          <InputIconText
            margin={0}
            icon={IcCategorySearch}
            onChange={(value) => setSearchFilter(value?.trim().length > 0 ? value : undefined)}
            placeholder="Pesquise seu agendamento" />

          {/* Content */}

          <HomeConsumer>
            {
              ({ scheduledServices, services }) => {
                return (
                  <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                    {scheduledServices !== undefined && scheduledServices.length > 0
                      ? <ScheduledServiceList data={filterScheduledServices(searchFilter, scheduledServices, services)} />
                      : <View style={style.emptyContainer}><Image source={require('../../../assets/images/Empty.png')} /></View>
                    }
                  </View>
                );
              }
            }
          </HomeConsumer>
        </ScrollView>
      </View>

      {/* FAB */}

      <View style={style.fabContainer}>
        <TouchableWithoutFeedback onPress={() => { onFabClick() }}>
          <View style={style.fab}>
            <Text style={{ fontSize: 24, color: WhiteColor }}>+</Text>
          </View>
        </TouchableWithoutFeedback>
      </View>
    </View>
  );
}

/***
 * Style
 */

const style = StyleSheet.create({
  container: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    backgroundColor: BackgroundColor
  },
  scrollContainer: {
    position: 'relative',
    padding: 16,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: BackgroundColor
  },
  emptyContainer: {
    marginVertical: 200,
  },
  title: {
    color: WhiteColor,
    fontSize: 24,
    fontWeight: 'bold',
    fontFamily: 'Aleo-LightItalic',
    marginBottom: 16,
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
  fabContainer: {
    position: 'absolute',
    right: 30,
    bottom: 90,
  },
  fab: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: PrimaryColor,
    borderRadius: 25,
    width: 50,
    height: 50,
  }
});

/***
 * HomePage
 */

export function HomePage(props: any) {
  const routeName = useNavigationState(state => state?.routes?.[state?.index]?.name);
  return (
    <BottomNavigation routeName={routeName} navigation={props.navigation}>
      <HomePageImpl {...props} />
    </BottomNavigation>
  );
}