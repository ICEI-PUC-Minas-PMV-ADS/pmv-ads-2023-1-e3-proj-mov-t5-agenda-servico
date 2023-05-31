import { Address } from "../models/address";
import { ScheduledServices } from "../models/scheduled_services";
import { Service } from "../models/service";
import { User } from "../models/user";
import { AddressRepository } from "../repositories/address_repository";
import { ScheduledServicesRepository } from "../repositories/scheduled_services";
import { ServiceRepository } from "../repositories/service_repository";
import { UserRepository } from "../repositories/user_repository";
import { hash } from "../utils/crypto";

export function mockServices() {
  createAddressOne();
}

function createAddressOne() {
  const address = new Address();
  address.cep = '01001-000';
  address.uf = 'SP';
  address.logradouro = 'Rua Se';
  address.bairro = 'Se'

  new AddressRepository().create(address, (serverAddress) => {
    const supplierUser = new User();
    supplierUser.nome = "Fornecedor Pedro";
    supplierUser.email = 'pedro_fornecedor@email.com'
    supplierUser.hash = hash('123');
    supplierUser.endereco_fk = serverAddress!.id;

    new UserRepository().create(supplierUser, (serverSupplierUser) => {
      const clientUser = new User();
      clientUser.nome = "Cliente Tulio";
      clientUser.email = 'tulio_cliente@email.com'
      clientUser.hash = hash('123');
      clientUser.endereco_fk = serverAddress!.id;

      new UserRepository().create(clientUser, (serverClientUser) => {
        const serviceManicure = new Service();
        serviceManicure.titulo = "Manicure";
        serviceManicure.valor = 10;
        serviceManicure.servico_externo = false;
        serviceManicure.prestador_servico_fk = serverSupplierUser!.id;

        new ServiceRepository().create(serviceManicure, (serverServiceManicure) => {
          const scheduleService = new ScheduledServices();
          scheduleService.cliente_fk = serverClientUser!.id;
          scheduleService.servico_fk = serverServiceManicure!.id;
          scheduleService.status = "pendente";
          scheduleService.data = new Date(2023, 6, 5, 11, 0, 0, 0);
          scheduleService.numero_endereco = 100;

          new ScheduledServicesRepository().create(scheduleService, (serverScheduleService) => {

          });
        });

        const servicePedicure = new Service();
        servicePedicure.titulo = "Manicure";
        servicePedicure.valor = 15;
        servicePedicure.servico_externo = false;
        servicePedicure.prestador_servico_fk = serverSupplierUser!.id;

        new ServiceRepository().create(servicePedicure, (serverServicePedicure) => {
          const scheduleService = new ScheduledServices();
          scheduleService.cliente_fk = serverClientUser!.id;
          scheduleService.servico_fk = serverServicePedicure!.id;
          scheduleService.status = "pendente";
          scheduleService.data = new Date(2023, 6, 5, 12, 0, 0, 0);
          scheduleService.numero_endereco = 100;

          new ScheduledServicesRepository().create(scheduleService, (serverScheduleService) => {

          });
        });
      });
    });
  });
}