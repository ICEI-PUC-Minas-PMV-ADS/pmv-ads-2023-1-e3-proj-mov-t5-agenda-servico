import { View } from 'react-native';
import { BottomNavigationItem } from './bottom_navigation_item';
import { StyleSheet } from 'react-native';
import { IcMenuCategory, IcMenuConfig, IcMenuProfile, IcMenuScheduling, IcNotification } from '../../constants/icons';
import { useAppContext } from '../../contexts/app_context';

/***
 * BottomNavigationProps
 */

type BottomNavigationProps = {
  routeName: string;
  children: JSX.Element | JSX.Element[] | undefined;
  navigation: any;
};

/***
 * BottomNavigation
 */

export function BottomNavigation(props: BottomNavigationProps) {
  const appContext = useAppContext();
  return (
    <>
      {props.children}

      <View style={styles.container}>
        <View style={styles.bottomNavigationContainer}>
          <View style={styles.bottomNavigation}>
            <BottomNavigationItem
              route={'CategorySelector'}
              icon={IcMenuCategory}
              label={'Categorias'}
              navigation={props.navigation}
            />

            <BottomNavigationItem
              //appContext?.user?.tipo === 'cliente' ? 'ClientProfile' : 'ProfessionalProfile'
              route={'Profile'}
              icon={IcMenuProfile}
              label={'Perfil'}
              navigation={props.navigation}
            />

            <BottomNavigationItem
              route={'NotificationPage'}/*Notificações*/
              icon={IcNotification}
              label={'Notificações '}
              navigation={props.navigation}
            />

            <BottomNavigationItem
              route={'Config'}/*Configuration*/
              icon={IcMenuConfig}
              label={'Configurações'}
              navigation={props.navigation}
            />
          </View>
        </View>
      </View>
    </>
  );
}

/***
 * Style
 */

const styles = StyleSheet.create({
  container: {
    position: 'relative',
  },
  bottomNavigationContainer: {
    backgroundColor: '#232938',
    position: 'absolute',
    padding: 16,
    left: 0,
    right: 0,
    bottom: 0,
  },
  bottomNavigation: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
});