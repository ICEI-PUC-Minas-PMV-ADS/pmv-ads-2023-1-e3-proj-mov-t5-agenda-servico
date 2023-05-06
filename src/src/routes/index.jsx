import React from "react";
import { NavigationContainer } from '@react-navigation/native';
import LoginRoute from "./LoginRoute";
import RegisterRoute from "./RegisterRoute";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

const Stack = createNativeStackNavigator();

export function Route() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="RegisterRoute" component={RegisterRoute} options={{ headerShown: false }} />
        <Stack.Screen name="LoginRoute" component={LoginRoute} options={{ headerShown: false }} />
      </Stack.Navigator>
    </NavigationContainer>
  )
}

