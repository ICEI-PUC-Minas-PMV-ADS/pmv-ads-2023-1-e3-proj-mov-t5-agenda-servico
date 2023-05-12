import { ScheduledServices } from '../models/scheduled_services';
import { Service } from '../models/service';
import { User } from '../models/user';
import { QueryScheduledServicesByUser } from './queries/query_scheduled_services_by_user';
import { Repository } from './repository';
import { ServiceRepository } from './service_repository';

export class ScheduledServicesRepository extends Repository<ScheduledServices> {
  constructor() {
    super('ScheduledServices');
  }

  filterScheduledServicesByUser(user: User, callback: (data: ScheduledServices[]) => void) {
    try {
      this.validateUser(user);
      new QueryScheduledServicesByUser(user).query(callback);
    } catch (error) {
      throw error;
    }
  }

  private validateUser(user: User) {
    if (user?.id === undefined) {
      throw Error("ScheduledServicesRepository.validateUser: Invalid user!");
    }
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
