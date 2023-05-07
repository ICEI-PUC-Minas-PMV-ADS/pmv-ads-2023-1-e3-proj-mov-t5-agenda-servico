import { Address } from "../models/address";
import { ScheduledServices } from "../models/scheduled_services";
import { Service } from "../models/service";
import { AddressRepository } from "../repositories/address_repository";
import { ScheduledServicesRepository } from "../repositories/scheduled_services";
import { ServiceRepository } from "../repositories/service_repository";

export function mockServices() {
  const servicesRepo = new ServiceRepository();
  {
    const service = new Service();
    service.titulo = 'Manicure';
    service.categoria = 'Beleza';
    service.duracao_servico = new Date(0, 0, 0, 1); // 1 Hora
    service.prestador_servico_fk = '-NTKrt6E9_NTRPXE3ui6'
    service.regime_de_trabalho = 'interno';
    service.valor = 10;
    servicesRepo.create(service, (s) => {
      if (s?.id) {
        console.log('service created: ' + s);
        const addressRepo = new AddressRepository();
        {
          const address = new Address();
          address.uf = 'MG';
          address.bairro = 'Lagoinha';
          address.cep = '31240-203';
          address.complemento = 'casa';
          address.logradouro = 'Rua Bonita';
          addressRepo.create(address, (serverAddr) => {
            if (serverAddr?.id) {
              console.log('address created: ' + serverAddr);
              const scheduledServicesRepo = new ScheduledServicesRepository();
              {
                const scheduledService = new ScheduledServices();
                scheduledService.cliente_fk = '-NTUrB7fVwyh1XB826QP';
                scheduledService.servico_fk = s.id;
                scheduledService.data = new Date(2023, 2, 25, 13); // 13:00 25/02/2023
                scheduledService.descricao = 'Descrição de manicure';
                scheduledService.numero_endereco = 10;
                scheduledService.local_fk = serverAddr.id;
                scheduledService.status = 'Aguardando';
                scheduledServicesRepo.create(scheduledService, (serverScheduledService) => {
                  console.log('service scheduled: ' + serverScheduledService);
                });
              }

              // CADASTRA SERVIÇO 2
              {
                const service = new Service();
                service.titulo = 'Cortar Cabelo';
                service.categoria = 'Beleza';
                service.duracao_servico = new Date(0, 0, 0, 2); // 2 Hora
                service.prestador_servico_fk = '-NTKrt6E9_NTRPXE3ui6'
                service.regime_de_trabalho = 'interno';
                service.valor = 20;
                servicesRepo.create(service, (s) => {
                  if (s?.id) {
                    console.log('service created: ' + s);
                    const scheduledServicesRepo = new ScheduledServicesRepository();
                    {
                      const scheduledService = new ScheduledServices();
                      scheduledService.cliente_fk = '-NTUrB7fVwyh1XB826QP';
                      scheduledService.servico_fk = s.id;
                      scheduledService.data = new Date(2023, 2, 25, 13); // 13:00 25/02/2023
                      scheduledService.descricao = 'Descrição de manicure';
                      scheduledService.numero_endereco = 10;
                      scheduledService.local_fk = serverAddr.id;
                      scheduledService.status = 'Aguardando';
                      scheduledServicesRepo.create(scheduledService, (serverScheduledService) => {
                        console.log('service scheduled: ' + serverScheduledService);
                      });
                    }
                  }
                });
              }
            }
          });
        }
      }
    });
  }
}