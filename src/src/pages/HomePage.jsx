import {View, Text, TouchableWithoutFeedback} from 'react-native';

/***
 * HomePage
 */

export function HomePage({navigation}) {
  return (
    <View>
      <TouchableWithoutFeedback onPress={() => {
        navigation.navigate({ name: 'Login', params: {} });
      }}>
        <Text>Click me!</Text>
      </TouchableWithoutFeedback>
    </View>
  );
}
