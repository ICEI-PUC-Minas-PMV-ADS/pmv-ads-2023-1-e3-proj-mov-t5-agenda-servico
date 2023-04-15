import { Model } from "./model";

export class Message extends Model {
    id?: String;
    prestador_servico_fk?: String;
    cliente_fk?: String;
    corpo_mensagem?: String;
    data_criacao?: Date;
}