import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {View, Text, TouchableWithoutFeedback} from 'react-native';
import {AppParamsList} from '../ParamList';

/***
 * HomePage
 */

export function HomePage({
  navigation,
}: NativeStackScreenProps<AppParamsList, 'Home'>) {
  return (
    <View>
      <TouchableWithoutFeedback
        onPress={() => {
          navigation.navigate({name: 'Login', params: {}});
        }}>
        <Text>Click me!</Text>
      </TouchableWithoutFeedback>
    </View>
  );
}
