import { Address } from "../models/address";
import { Repository } from "./repository";

class AddressRepository extends Repository<Address> {
    constructor() {
        super('address');
    }

    protected serialize(model: Address): any {
        return { ...model };
    }

    protected deserialize(model: any): Address {
        let address: Address = new Address();
        address.id = model.id;
        address.cep = model.cep;
        address.logradouro = model.logradouro;
        address.numero = model.numero;
        address.bairro = model.bairro;
        address.uf = model.uf;
        address.complemento = model.complemento;
        address.observacoes = model.observacoes;
        return address;
    }
}