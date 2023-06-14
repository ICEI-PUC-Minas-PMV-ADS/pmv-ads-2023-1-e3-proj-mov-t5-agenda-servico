import { Service } from "../../models/service";
import { User } from "../../models/user";
import { ServiceRepository } from "../service_repository";
import { UserRepository } from "../user_repository";

/**
 * PairUserServices
 */

export type PairUserServices = {
  supplier: User;
  services: Service[];
};

/**
 * QueryServicesByCategoryAndGroupByUser
 */

export class QueryServicesByCategoryAndGroupByUser {
  private categoryId: string;
  private userRepo: UserRepository;
  private serviceRepo: ServiceRepository;
  constructor(categoryId: string) {
    this.userRepo = new UserRepository();
    this.serviceRepo = new ServiceRepository();
    this.categoryId = categoryId;
  }

  query(callback: (servicesByUser: Map<string, PairUserServices>) => void) {
    this.queryServices(callback);
  }

  private async queryServices(callback: (servicesByUser: Map<string, PairUserServices>) => void) {
    this.serviceRepo.getAll((services) => {
      if (services) {
        new Promise<Map<string, PairUserServices>>(async (accept, reject) => {
          const findedServices: Map<string, PairUserServices> = new Map();
          const filteredServiceByCat = services
            ?.filter((service) => {
              return service.categoria === this.categoryId;
            });

          if (filteredServiceByCat?.length && filteredServiceByCat?.length > 0) {
            for (let i = 0; i < filteredServiceByCat?.length; i++) {
              const service = filteredServiceByCat[i];

              if (service.prestador_servico_fk) {
                if (findedServices.has(service.prestador_servico_fk)) {
                  findedServices.get(service.prestador_servico_fk)?.services.push(service);
                } else {
                  findedServices.set(service.prestador_servico_fk!, await this.createPairUserService(service.prestador_servico_fk, service))
                }
              } else {
                reject(Error('QueryServicesByCategoryAndGroupByUser.get(): Required field "prestador_servico_fk" at service'));
              }
            }
          }

          accept(findedServices);
        }).then((findedServices) => {
          callback(findedServices);
        }).catch((error) => {
          throw error;
        });
      } else {
        callback(new Map<string, PairUserServices>());
      }
    });
  }

  private async createPairUserService(prestadorId: string, service: Service): Promise<PairUserServices> {
    return await new Promise<PairUserServices>((accept, reject) => {
      this.userRepo.get(prestadorId, (prestador) => {
        if (prestador) {
          accept({ supplier: prestador, services: [service] });
        } else {
          reject(new Error("QueryServicesByCategoryAndGroupByUser.createPairUserService: Supplier not founded!"));
        }
      });
    });
  }
}