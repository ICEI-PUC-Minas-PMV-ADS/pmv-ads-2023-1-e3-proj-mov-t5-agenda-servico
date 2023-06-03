import React from "react";
import { ScheduleServiceReducerAction, ScheduleServiceReducerState } from "./schedule_service_reducer";

type ScheduleServiceContextState = {
  state?: ScheduleServiceReducerState;
  dispatch?: React.Dispatch<ScheduleServiceReducerAction>;
};

export const ScheduleServiceContext = React.createContext<ScheduleServiceContextState>({});

export const ScheduleServiceProvider = ScheduleServiceContext.Provider;