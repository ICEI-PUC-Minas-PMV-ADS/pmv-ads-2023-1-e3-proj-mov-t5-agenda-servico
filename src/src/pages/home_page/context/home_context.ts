import React from "react";
import { Service } from "../../../models/service";
import { ScheduledServices } from "../../../models/scheduled_services";

/**
 * HomeContextState
 */

type HomeContextState = {
  services: Service[];
  scheduledServices: ScheduledServices[];
  setScheduledServices?: React.Dispatch<React.SetStateAction<ScheduledServices[]>>;
  setServices?: React.Dispatch<React.SetStateAction<Service[]>>;
};

/***
 * HomeContext
 */

export const HomeContext = React.createContext<HomeContextState>({
  services: [],
  scheduledServices: [],
});

export const HomeProvider = HomeContext.Provider;
export const HomeConsumer = HomeContext.Consumer;

export const useHomeContext = (): HomeContextState => {
  return React.useContext(HomeContext);
}