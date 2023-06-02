import { Service } from '../models/service';
import { Repository } from './repository';

export class ServiceRepository extends Repository<Service> {
  constructor() {
    super('Service');
  }

  protected serialize(model: Service) {
    return {
      ...model,
      duracao: JSON.stringify(model.duracao),
    };
  }

  protected deserialize(model: any): Service {
    let service: Service = new Service();
    service.id = model.id;
    service.titulo = model.titulo;
    service.prestador_servico_fk = model.prestador_servico_fk;
    service.descricao = model.descricao;
    service.valor = model.valor;
    service.servico_externo = model.servico_externo;
    service.categoria = model.categoria;
    service.avaliacao = model.avaliacao;
    service.regime_de_trabalho = model.regime_de_trabalho;
    service.duracao =  JSON.parse(model.duracao ?? "{}")
    return service;
  }
}
