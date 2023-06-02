import React from "react";
import { View } from "react-native";
import { ScheduleServiceContext } from './schedule_service_context'

export function ScheduleServiceCepPage() {
  const { state, dispatch } = React.useContext(ScheduleServiceContext);
  return (
    <View></View>
  );
}