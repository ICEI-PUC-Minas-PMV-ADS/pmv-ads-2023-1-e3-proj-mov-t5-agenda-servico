import { ScheduledServices } from "../../models/scheduled_services";
import { ScheduledServicesRepository } from "../../repositories/scheduled_services";

export type ScheduleServiceReducerState = {
  tipo_de_servico?: string;
  dia?: string;
  hora?: string;
  cep?: string;
  lat?: string;
  lng?: string;
};

export type ScheduleServiceReducerAction = {
  type: string;
  payload: any;
};

export function ScheduleServiceReducer(state: ScheduleServiceReducerState, action: ScheduleServiceReducerAction): ScheduleServiceReducerState {
  switch (action.type) {
    case 'set_tipo_servico': {
      return { ...state, tipo_de_servico: action.payload };
    }

    case 'set_dia': {
      return { ...state, dia: action.payload };
    }

    case 'set_hora': {
      return { ...state, hora: action.payload };
    }

    case 'save': {
      const scheduleServiceRepo = new ScheduledServicesRepository();
      const scheduleService = new ScheduledServices();
      scheduleService.descricao = state?.tipo_de_servico;

      scheduleServiceRepo.create(scheduleService, () => { });
    }
  }
  return state;
}