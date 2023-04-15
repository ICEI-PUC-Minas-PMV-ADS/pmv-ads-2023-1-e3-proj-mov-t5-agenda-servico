import { Message } from "../models/message";
import { Repository } from "./repository";

export class MessageRepository extends Repository<Message> {
    constructor() {
        super('Message');
    }

    protected serialize(model: Message): any {
        return { ...model, data_criacao: model?.data_criacao?.getTime() };
    }

    protected deserialize(model: any): Message {
        let message: Message = new Message();
        message.id = model.id;
        message.prestador_servico_fk = model.prestador_servico_fk;
        message.cliente_fk = model.cliente_fk;
        message.corpo_mensagem = model.corpo_mensagem;
        message.data_criacao = new Date(model.data_criacao);
        return message;
    }
}