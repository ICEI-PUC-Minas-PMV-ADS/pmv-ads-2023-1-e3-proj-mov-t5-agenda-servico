import React from "react";

import AppRoute from "./AppRoute";
import RegisterRoute from "./RegisterRoute";

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from "@react-navigation/native-stack";

const Stack = createNativeStackNavigator();

export function Route() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName='AppRoute'>
        <Stack.Screen name="AppRoute" component={AppRoute} options={{ headerShown: false }} />
        <Stack.Screen name="RegisterRoute" component={RegisterRoute} options={{ headerShown: false }} />
        <Stack.Screen name="LoginRoute" component={LoginRoute} options={{ headerShown: false }} />

      </Stack.Navigator>
    </NavigationContainer>
  )
}

