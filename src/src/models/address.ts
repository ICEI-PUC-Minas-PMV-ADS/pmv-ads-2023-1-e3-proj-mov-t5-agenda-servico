import { Model } from "./model";

export class Address extends Model {
    id?: number;
    cep?: String;
    logradouro?: String;
    numero?: number;
    bairro?: String;
    uf?: String;
    complemento?: String;
    observacoes?: String;
}