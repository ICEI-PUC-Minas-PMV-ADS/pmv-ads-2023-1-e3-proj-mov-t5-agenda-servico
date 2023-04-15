import { ScheduledServices } from "../models/scheduled_services";
import { Repository } from "./repository";

export class ScheduledServicesRepository extends Repository<ScheduledServices> {
    constructor() {
        super('ScheduledServices');
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