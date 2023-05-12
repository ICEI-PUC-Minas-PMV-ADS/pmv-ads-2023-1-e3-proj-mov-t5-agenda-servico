import React from 'react';
import EncryptedStorage from 'react-native-encrypted-storage';

import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { View, Text, StyleSheet, TouchableWithoutFeedback, Image, ActivityIndicator, ScrollView } from 'react-native';
import { AppParamsList } from '../routes/ParamList';
import { KEY_USERDATA } from '../constants/app';
import { useAppContext } from '../contexts/app_context';
import { BackgroundColor, WhiteColor } from '../constants/colors';
import { PrimaryColor } from '../constants/colors';
import { InputIconText } from '../components/Inputs';
import { IcCategorySearch } from '../constants/icons';
import { ScheduledServices } from '../models/scheduled_services';
import { ScheduledServiceList } from '../components/ScheduledServiceList';
import { ScheduledServicesRepository } from '../repositories/scheduled_services';
import { QueryValidateTimeOfScheduleServices } from '../repositories/queries/query_validate_time_of_schedule_services';
import { QueryTest } from '../repositories/queries/query_test';

/***
 * HomePage
 */

export function HomePage({
  navigation,
}: NativeStackScreenProps<AppParamsList, 'Home'>) {
  const [selectedTab, setSelectedTab] = React.useState(0);
  const [loadingUserData, setLoadingUserData] = React.useState(true);
  const appContext = useAppContext();

  React.useLayoutEffect(() => {
    if (!appContext?.user) {
      EncryptedStorage.getItem(KEY_USERDATA).then(userData => {
        if (userData) {
          appContext?.setUser(JSON.parse(userData));
        } else {
          navigation?.replace('Login', {});
        }
        setLoadingUserData(false);
      });
    } else {
      setLoadingUserData(false);
    }
  }, []);

  return (
    loadingUserData
      ? <View style={style.loadingContainer}><ActivityIndicator /></View>
      : <HomePageContent selectedTab={selectedTab} setSelectedTab={(tab) => setSelectedTab(tab)} />
  );
}

/***
 * HomePageContentProps
 */

type HomePageContentProps = {
  selectedTab: number;
  setSelectedTab: (tab: number) => void;
};

/***
 * HomePageContent
 */

function HomePageContent({ selectedTab, setSelectedTab }: HomePageContentProps) {
  const [data, setData] = React.useState<ScheduledServices[]>([]);
  const [loading, setLoading] = React.useState(true);
  const appContext = useAppContext();

  React.useEffect(() => {
    if (appContext?.user) {
      const scheduledServicesRepo = new ScheduledServicesRepository();
      scheduledServicesRepo.filterScheduledServicesByUser(appContext.user, (scheduledServices) => {
        new QueryValidateTimeOfScheduleServices(scheduledServices)
          .query()
          .then((scheduledServices) => {
            setData(scheduledServices);
            setLoading(false);
          });
      });
    }
  }, [setData, setLoading, appContext.user]);

  return (
    <ScrollView style={style.container}>
      <Text style={style.title}>Agendamentos</Text>

      {/* TAB */}

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

      <InputIconText margin={0} icon={IcCategorySearch} placeholder="Pesquise seu agendamento" />

      {/* Content */}

      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        {loading
          ? <View style={style.emptyContainer}><View style={style.loadingContainer}><ActivityIndicator /></View></View>
          : (data.length > 0
            ? <ScheduledServiceList data={data} />
            : <View style={style.emptyContainer}><Image source={require('../../assets/images/Empty.png')} /></View>)
        }
      </View>
    </ScrollView>
  );
}

/***
 * Style
 */

const style = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: BackgroundColor,
    padding: 16,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: BackgroundColor,
  },
  emptyContainer: {
    marginVertical: 130,
  },
  title: {
    color: WhiteColor,
    fontSize: 24,
    fontWeight: 'bold',
    fontFamily: 'Aleo-LightItalic',
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
  }
});