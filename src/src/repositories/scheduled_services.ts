import { ScheduledServices } from '../models/scheduled_services';
import { Service } from '../models/service';
import { User } from '../models/user';
import { Repository } from './repository';
import { ServiceRepository } from './service_repository';

export class ScheduledServicesRepository extends Repository<ScheduledServices> {
  constructor() {
    super('ScheduledServices');
  }

  filterScheduledServicesByUser(user: User, callback: (data: ScheduledServices[]) => void) {
    this.getAll((scheduledServices) => {
      if (user.tipo === 'cliente') {
        const filteredScheduledServices = scheduledServices?.filter((scheduledService) => scheduledService?.cliente_fk === user.id);
        if (filteredScheduledServices) {
          callback(filteredScheduledServices);
        }
      } else {
        const servicesRepo = new ServiceRepository();
        const servicesMap: Map<String, Service> = new Map();

        // Lista todos os serviços associados aos agendamentos.
        scheduledServices?.forEach((scheduledService) => {
          if (scheduledService?.servico_fk) {
            servicesRepo.get(scheduledService.servico_fk, (service) => {
              if (service?.id) {
                servicesMap.set(service.id, service);
              }
            });
          }
        });

        const filteredScheduledServices = scheduledServices?.filter((scheduledService) => {
          if (scheduledService?.servico_fk) {
            return servicesMap.get(scheduledService.servico_fk)?.prestador_servico_fk === user.id
          }
          return false;
        });

        if (filteredScheduledServices) {
          callback(filteredScheduledServices);
        }
      }
    });
  }

  protected serialize(model: ScheduledServices) {
    return { ...model, data: model?.data?.getTime() };
  }

  protected deserialize(model: any): ScheduledServices {
    let scheduledServices: ScheduledServices = new ScheduledServices();
    scheduledServices.id = model.id;
    scheduledServices.servico_fk = model.servico_fk;
    scheduledServices.descricao = model.descricao;
    scheduledServices.data = new Date(model.data);
    scheduledServices.status = model.status;
    scheduledServices.cliente_fk = model.cliente_fk;
    scheduledServices.local_fk = model.local_fk;
    scheduledServices.preco = model.preco;
    scheduledServices.numero_endereco = model.numero_endereco;
    scheduledServices.avaliacao = model.avaliacao;
    return scheduledServices;
  }
}
