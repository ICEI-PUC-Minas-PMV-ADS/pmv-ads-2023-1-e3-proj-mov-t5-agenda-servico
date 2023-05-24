import { Text, TouchableWithoutFeedback, View } from 'react-native';
import { StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useCallback } from 'react';

/***
 * Props
 */

interface BottomNavigationItemProps {
  route: string;
  icon: React.FunctionComponent<React.SVGAttributes<SVGElement>>;
  label: string;
  navigation: any;
}

/***
 * BottomNavigationItem
 */

export function BottomNavigationItem({
  route,
  icon,
  label,
  navigation,
}: BottomNavigationItemProps) {
  const ICON_TAG = icon;

  const onClick = useCallback(() => {
    if (route != 'Home') {
      navigation.navigate(route);
    }
  }, [route, navigation]);

  return (
    <TouchableWithoutFeedback onPress={() => onClick()}>
      <View style={styles.container}>
        <ICON_TAG color={'#aaa'} />
        <Text style={[styles.label, { color: '#aaa' }]}>{label}</Text>
      </View>
    </TouchableWithoutFeedback>
  );
}

/***
 * Styles
 */

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  label: {
    fontSize: 9,
  }
});