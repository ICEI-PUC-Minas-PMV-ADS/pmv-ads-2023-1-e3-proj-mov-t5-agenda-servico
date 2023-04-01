import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Text, View } from "react-native";
import { IcCategorySearch } from "../constants/icons";
import { PrimaryColor } from "../constants/colors";

/***
 * Tab
 */

const Tab = createBottomTabNavigator();

/***
 * Props
 */

interface BottomNavigationProps {
  tab1Component?: any,
}

function Test() {
  return <View></View>;
}

/***
 * Component
 */

export function BottomNavigation(props: BottomNavigationProps) {
  return (
    <Tab.Navigator initialRouteName="Home">
      <Tab.Screen name="Home" component={props.tab1Component} options={{
        headerShown: false,
        tabBarLabel: "label", tabBarIcon: ({ color, size }) => (
          <IcCategorySearch color={PrimaryColor} />
        )
      }} />

      <Tab.Screen name="Home1" component={Test} options={{
        tabBarLabel: "label", tabBarIcon: ({ color, size }) => (
          <IcCategorySearch color={PrimaryColor} />
        )
      }} />

      <Tab.Screen name="Home2" component={Test} options={{
        tabBarLabel: "label", tabBarIcon: ({ color, size }) => (
          <IcCategorySearch color={color} />
        )
      }} />

      <Tab.Screen name="Home3" component={Test} options={{
        tabBarLabel: "label", tabBarIcon: ({ color, size }) => (
          <IcCategorySearch color={color} />
        )
      }} />
    </Tab.Navigator>
  );
}