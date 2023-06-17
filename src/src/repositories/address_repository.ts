import { Address } from '../models/address';
import { Repository } from './repository';

export class AddressRepository extends Repository<Address> {
  constructor() {
    super('Address');
  }

  protected serialize(model: Address): any {
    return { ...model };
  }

  protected deserialize(model: any): Address {
    let address: Address = new Address();
    address.id = model.id;
    address.cep = model.cep;
    address.cidade = model.cidade;
    address.logradouro = model.logradouro;
    address.bairro = model.bairro;
    address.uf = model.uf;
    address.complemento = model.complemento;
    return address;
  }
}
