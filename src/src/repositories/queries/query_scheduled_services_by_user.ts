import { ScheduledServices } from "../../models/scheduled_services";
import { Service } from "../../models/service";
import { User } from "../../models/user";
import { ScheduledServicesRepository } from "../scheduled_services";
import { ServiceRepository } from "../service_repository";
import { UserRepository } from "../user_repository";

export class QueryScheduledServicesByUser {
  user: User;
  userRepository: UserRepository;
  serviceRepository: ServiceRepository;
  scheduledServicesRepository: ScheduledServicesRepository;
  constructor(user: User) {
    this.user = user;
    this.userRepository = new UserRepository();
    this.serviceRepository = new ServiceRepository();
    this.scheduledServicesRepository = new ScheduledServicesRepository();
  }

  async query(callback: (data: ScheduledServices[]) => void) {
    callback(await new Promise<ScheduledServices[]>((accepted, rejected) => {
      this.scheduledServicesRepository.getAll((scheduledServices) => {
        scheduledServices = scheduledServices?.filter((scheduledService) => scheduledService.status === "pendente");
        if (scheduledServices) {
          if (this.isClientUser()) {
            accepted(this.filterScheduledServicesToUse(scheduledServices));
          } else {
            accepted(this.filterScheduledServicesToProvider(scheduledServices));
          }
        } else {
          rejected("QueryScheduledServicesByUser.query: schduled service data not found!");
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
    return await scheduledServices.filter(async (scheduledService) => {
      const service = await new Promise<Service>((accepted, rejected) => {
        if (scheduledService?.servico_fk) {
          this.serviceRepository.get(scheduledService?.servico_fk, (service) => {
            if (service) {
              accepted(service);
            } else {
              rejected("QueryScheduledServicesByUser.filterSupplierScheduledServices: Service not found!");
            }
          });
        } else {
          rejected("QueryScheduledServicesByUser.filterSupplierScheduledServices: Invalid servico_fk!");
        }
      });

      return service.prestador_servico_fk === this.user.id;
    });
  }
}