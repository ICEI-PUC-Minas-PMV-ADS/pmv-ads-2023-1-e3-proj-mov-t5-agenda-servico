import React from "react";

import { View } from "react-native";
import { ScheduleServiceProvider } from "./schedule_service_context";
import { ScheduleServiceReducer } from "./schedule_service_reducer";
import { InputText } from "../../components/Inputs";

export function ScheduleServiceStartPage() {
  const [state, dispatch] = React.useReducer(ScheduleServiceReducer, {});
  return (
    <ScheduleServiceProvider value={{ state, dispatch }}>
      <View>
        <InputText onChange={(value) => dispatch({ type: 'action_type', payload: value })} />
      </View>
    </ScheduleServiceProvider>
  );
}