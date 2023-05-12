import { ScheduledServices } from "../../models/scheduled_services";
import { ScheduledServicesRepository } from "../scheduled_services";

export class QueryValidateTimeOfScheduleServices {
  private scheduledServices: ScheduledServices[];
  private scheduledServicesRepository: ScheduledServicesRepository;
  private updatedScheduledServices: ScheduledServices[];
  constructor(scheduledServices: ScheduledServices[]) {
    this.scheduledServices = scheduledServices;
    this.scheduledServicesRepository = new ScheduledServicesRepository();
    this.updatedScheduledServices = [];
  }

  async query(): Promise<ScheduledServices[]> {
    this.scheduledServices.forEach(async (scheduledService) =>
      await this.validateTimeOfScheduledService(scheduledService))
    return this.updatedScheduledServices;
  }

  private async validateTimeOfScheduledService(scheduledServices: ScheduledServices) {
    if (scheduledServices.data) {
      if (scheduledServices.data.getTime() >= Date.now()) {
        this.updateOutOfTimeScheduledService(scheduledServices);
      }
    }
  }

  private async updateOutOfTimeScheduledService(scheduledServices: ScheduledServices) {
    scheduledServices.status = "fora do prazo";
    this.persistAndListOutOfTimeScheduledService(scheduledServices);
  }

  private async persistAndListOutOfTimeScheduledService(scheduledServices: ScheduledServices) {
    this.updatedScheduledServices.push(await new Promise<ScheduledServices>((accepted, rejected) => {
      this.scheduledServicesRepository.update(scheduledServices, (updatedScheduledService) => {
        if (!updatedScheduledService) {
          rejected("QueryValidateTimeOfScheduleServices.validateTimeOfScheduledService: Failed to update scheduled service.");
        } else {
          accepted(updatedScheduledService)
        }
      })
    }));
  }
}