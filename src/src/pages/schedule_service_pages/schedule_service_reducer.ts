import { Locale } from "../../models/locale";
import { ScheduledServices } from "../../models/scheduled_services";
import { ScheduledServicesRepository } from "../../repositories/scheduled_services";

export type AddressPage = {
  address: Locale,

}

export type FirstPage ={
  schedule: ScheduledServices
}

export type ScheduleServiceReducerState = {
  addressPage?: AddressPage;
  firstPage?: FirstPage;
};

export type ScheduleServiceReducerAction = {
  type: "set_address_page" | "set_first_page" ;
  payload: any;
};

export function ScheduleServiceReducer(state: ScheduleServiceReducerState, action: ScheduleServiceReducerAction): ScheduleServiceReducerState {
  
  switch (action.type) {
    case "set_address_page":
      return { 
        ...state, addressPage: action.payload
      }
    case "set_first_page":
      return {
        ...state, firstPage: action.payload
      }
  }
  return state;
}