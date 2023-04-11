import React from "react";
import { NavigationContainer } from '@react-navigation/native';
import LoginRoute from "./LoginRoute";

export function Route() {
  return (
    <NavigationContainer>
      <LoginRoute />
    </NavigationContainer>
  )
}