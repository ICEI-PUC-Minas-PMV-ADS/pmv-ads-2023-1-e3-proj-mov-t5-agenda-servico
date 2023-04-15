import { Model } from "./model";

export class Service extends Model {
    id?: String;
    titulo?: String;
    prestador_servico_fk?: String;
    descricao?: String;
    valor?: Number;
    servico_externo?: Boolean;
    duracao_servico?: Date;
    categoria?: String;
    avaliacao?: Number;
    regime_de_trabalho?: String;
}