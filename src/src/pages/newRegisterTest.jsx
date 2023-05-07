import AsyncStorage from "@react-native-async-storage/async-storage";
import React from "react";
import { Text, View, StyleSheet } from "react-native";
import { BackgroundColor } from "../constants/colors";



export function TestRegister() {
  const [data, setData] = React.useState()

  getMultiple = async () => {

    let values
    try {
      values = await AsyncStorage.multiGet(["about", "adress", "category", "displacementfee", "email", "opening", "password", "services", "wherework"])
    } catch (e) {
      // read error
    }
    setData(values)

    // example console.log output:
    // [ ['@MyApp_user', 'myUserValue'], ['@MyApp_key', 'myKeyValue'] ]
  }

  getMultiple()
  return (
    <View>
      <Text>
        {data}
      </Text>
    </View>
  )
}

