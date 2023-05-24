import React from "react";

import RegisterRoute from "./RegisterRoute";

import AppRoute from "./AppRoute";

import { createNativeStackNavigator } from "@react-navigation/native-stack";

/***
 * Stack
 */

const Stack = createNativeStackNavigator();

/***
 * Route
 */

export function Route() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName='AppRoute'>
        <Stack.Screen name="AppRoute" component={AppRoute} options={{ headerShown: false }} />
        <Stack.Screen name="RegisterRoute" component={RegisterRoute} options={{ headerShown: false }} />

      </Stack.Navigator>
    </NavigationContainer>
  )
}

