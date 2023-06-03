import React from 'react';
import EncryptedStorage from 'react-native-encrypted-storage';

import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { View, Text, StyleSheet, TouchableWithoutFeedback, Image, ActivityIndicator, ScrollView } from 'react-native';
import { AppParamsList } from '../../routes/ParamList';
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
import { useNavigationState } from '@react-navigation/native';
import { ServiceRepository } from '../../repositories/service_repository';
import { Service } from '../../models/service';
import { HomeConsumer, HomeProvider } from './context/home_context';
import moment from 'moment';

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
    /*
    const clientId = '-NWo3uZXwIncy6A3o7Uj';
    const addressId = '-NWo3oheJB5CCpH4jM08';
    const serviceId1 = '-NWo3uavYBBnjuUeqcAI';
    const serviceId2 = '-NWo3uaweMYrAvAxckdC';

    const scheduledServiceRepo = new ScheduledServicesRepository();
    const scheduledService1 = new ScheduledServices();
    scheduledService1.cliente_fk = clientId;
    scheduledService1.servico_fk = serviceId1;
    scheduledService1.local_fk = addressId;
    scheduledService1.descricao = "Atras da igreja";
    scheduledService1.numero_endereco = 20;
    scheduledService1.status = "pendente";
    scheduledService1.data = new Date(2023, 5, 7, 12, 0);
    scheduledServiceRepo.create(scheduledService1, () => {
      console.log('Created!');

      const scheduledService2 = new ScheduledServices();
      scheduledService2.cliente_fk = clientId;
      scheduledService2.servico_fk = serviceId2;
      scheduledService2.local_fk = addressId;
      scheduledService2.descricao = "Embaixo da ponte";
      scheduledService2.numero_endereco = 20;
      scheduledService2.status = "pendente";
      scheduledService2.data = new Date(2023, 5, 7, 12, 0);
      scheduledServiceRepo.create(scheduledService2, () => {
        console.log('Created!');

        const scheduledService3 = new ScheduledServices();
        scheduledService3.cliente_fk = clientId;
        scheduledService3.servico_fk = serviceId1;
        scheduledService3.local_fk = addressId;
        scheduledService3.numero_endereco = 20;
        scheduledService3.status = "concluido";
        scheduledService3.data = new Date(2023, 5, 7, 12, 0);
        scheduledServiceRepo.create(scheduledService3, () => {
          console.log('Created!');

          const scheduledService4 = new ScheduledServices();
          scheduledService4.cliente_fk = clientId;
          scheduledService4.servico_fk = serviceId1;
          scheduledService4.local_fk = addressId;
          scheduledService4.numero_endereco = 20;
          scheduledService4.status = "fora do prazo";
          scheduledService4.data = new Date(2023, 5, 7, 12, 0);
          scheduledServiceRepo.create(scheduledService4, () => {
            console.log('Created!');

            const scheduledService5 = new ScheduledServices();
            scheduledService5.cliente_fk = clientId;
            scheduledService5.servico_fk = serviceId1;
            scheduledService5.local_fk = addressId;
            scheduledService5.numero_endereco = 20;
            scheduledService5.status = "cancelado";
            scheduledService5.data = new Date(2023, 5, 7, 12, 0);
            scheduledServiceRepo.create(scheduledService5, () => {
              console.log('Created!');
            });
          });
        });
      });
    });
    */
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
    backgroundColor: BackgroundColor,
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