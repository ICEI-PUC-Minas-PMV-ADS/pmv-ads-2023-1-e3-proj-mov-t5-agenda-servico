import { ScheduledServices } from "../../models/scheduled_services";
import { Service } from "../../models/service";
import { User } from "../../models/user";
import { ScheduledServicesRepository } from "../scheduled_services";
import { ServiceRepository } from "../service_repository";

export class QueryScheduledServicesByUser {
  private user: User;
  private serviceRepository: ServiceRepository;
  private scheduledServicesRepository: ScheduledServicesRepository;
  constructor(user: User) {
    this.user = user;
    this.serviceRepository = new ServiceRepository();
    this.scheduledServicesRepository = new ScheduledServicesRepository();
  }

  async query(callback: (data: ScheduledServices[]) => void) {
    callback(await new Promise<ScheduledServices[]>((accepted, rejected) => {
      this.scheduledServicesRepository.getAll((scheduledServices) => {
        if (scheduledServices) {
          if (this.isClientUser()) {
            accepted(this.filterScheduledServicesToUse(scheduledServices));
          } else {
            accepted(this.filterScheduledServicesToProvider(scheduledServices));
          }
        } else {
          rejected("QueryScheduledServicesByUser.query: scheduled service data not found!");
        }
      });
    }));
  }

  private isClientUser() {
    return this.user.tipo === 'cliente';
  }

  private filterScheduledServicesToUse(scheduledServices: ScheduledServices[]): ScheduledServices[] {
    return scheduledServices.filter((scheduledService) => scheduledService?.cliente_fk === this.user.id);
  }

  private async filterScheduledServicesToProvider(scheduledServices: ScheduledServices[]): Promise<ScheduledServices[]> {
    const result = await Promise.all(scheduledServices.map(async (scheduledService) => {
      const service = await new Promise<Service | undefined>((accepted, rejected) => {
        if (scheduledService?.servico_fk) {
          this.serviceRepository.get(scheduledService?.servico_fk, (service) => {
            accepted(service);
          });
        } else {
          rejected("QueryScheduledServicesByUser.filterSupplierScheduledServices: Invalid servico_fk!");
        }
      });
      return { scheduledService, service };
    }));

    const filteredResults = result
      .filter(({ service }) => service?.prestador_servico_fk === this.user.id)
      .map(({ scheduledService }) => scheduledService);

    return filteredResults;
  }
}