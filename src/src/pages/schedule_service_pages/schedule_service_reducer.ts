import { Address } from "../../models/address";
import { ScheduledServices } from "../../models/scheduled_services";

export type AddressPage = {
  address: Address,
}

export type FirstPage = {
  schedule: ScheduledServices
}

export type ScheduleServiceReducerState = {
  supplierId?: string;
  addressPage?: AddressPage;
  firstPage?: FirstPage;
};

export type ScheduleServiceReducerAction = {
  type: "set_address_page" | "set_first_page";
  payload: any;
};

export function ScheduleServiceReducer(state: ScheduleServiceReducerState, action: ScheduleServiceReducerAction): ScheduleServiceReducerState {

  switch (action.type) {
    case "set_address_page":
      return {
        ...state, addressPage: action.payload.addressPage, firstPage: { ...state.firstPage, schedule: { ...state.firstPage?.schedule, numero_endereco: action.payload.numero } }
      }
    case "set_first_page":
      return {
        ...state, firstPage: { schedule: action.payload.scheduledService }, supplierId: action.payload.supplierId
      }
  }
  return state;
}