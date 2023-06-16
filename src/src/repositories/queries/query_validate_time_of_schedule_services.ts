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
    for (let scheduledService of this.scheduledServices) {
      this.updatedScheduledServices.push(await this.validateTimeOfScheduledService(scheduledService));
    }
    return this.updatedScheduledServices;
  }

  private async validateTimeOfScheduledService(scheduledServices: ScheduledServices): Promise<ScheduledServices> {
    if (scheduledServices.data) {
      if (scheduledServices.data.getTime() <= Date.now()) {
        return await this.updateOutOfTimeScheduledService(scheduledServices);
      }
    }
    return scheduledServices;
  }

  private async updateOutOfTimeScheduledService(scheduledServices: ScheduledServices): Promise<ScheduledServices> {
    scheduledServices.status = "fora do prazo";
    return await this.persistAndListOutOfTimeScheduledService(scheduledServices);
  }

  private async persistAndListOutOfTimeScheduledService(scheduledServices: ScheduledServices): Promise<ScheduledServices> {
    return await new Promise<ScheduledServices>((accepted, rejected) => {
      this.scheduledServicesRepository.update(scheduledServices, (updatedScheduledService) => {
        if (!updatedScheduledService) {
          rejected("QueryValidateTimeOfScheduleServices.validateTimeOfScheduledService: Failed to update scheduled service.");
        } else {
          accepted(updatedScheduledService)
        }
      })
    })
  }
}