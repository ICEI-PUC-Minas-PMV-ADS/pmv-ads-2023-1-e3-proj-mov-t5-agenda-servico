import React from 'react';
import EncryptedStorage from 'react-native-encrypted-storage';

import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { View, Text, StyleSheet, TouchableWithoutFeedback, Image } from 'react-native';
import { AppParamsList } from '../ParamList';
import { KEY_USERDATA } from '../constants/app';
import { useAppContext } from '../contexts/app_context';
import { BackgroundColor, WhiteColor } from '../constants/colors';
import { PrimaryColor } from '../constants/colors';
import { InputIconText } from '../components/Inputs';
import { IcCategorySearch } from '../constants/icons';

/***
 * HomePage
 */

export function HomePage({
  navigation,
}: NativeStackScreenProps<AppParamsList, 'Home'>) {
  const [selectedTab, setSelectedTab] = React.useState(0);
  const [loadState, setLoadState] = React.useState(false);
  const appContext = useAppContext();

  React.useLayoutEffect(() => {
    if (!appContext?.user) {
      EncryptedStorage.getItem(KEY_USERDATA).then(userData => {
        if (userData) {
          appContext?.setUser(JSON.parse(userData));
        } else {
          navigation?.replace('Login', {});
        }
        setLoadState(true);
      });
    } else {
      setLoadState(true);
    }
  }, []);

  return (!loadState ? <></> : <HomePageContent selectedTab={selectedTab} setSelectedTab={(tab) => setSelectedTab(tab)} />);
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
  return (
    <View style={style.container}>
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
        <Image source={require('../../assets/images/Empty.png')} />
      </View>
    </View>
  );
}

/***
 * Style
 */

const style = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: BackgroundColor,
  },
  container: {
    flex: 1,
    backgroundColor: BackgroundColor,
    padding: 16,
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