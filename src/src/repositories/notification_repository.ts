import { Notification } from "../models/notification";
import { Repository } from "./repository";

export class NotificationRepository extends Repository<Notification> {
    constructor() {
        super('Notification');
    }

    protected serialize(model: Notification) {
        return { ...model, data_criacao: model.data_criacao?.getTime() };
    }

    protected deserialize(model: any): Notification {
        let notification: Notification = new Notification();
        notification.id = model.id;
        notification.titulo = model.titulo;
        notification.usuario_fk = model.usuario_fk;
        notification.descricao = model.descricao;
        notification.data_criacao = new Date(model.data_criacao);
        return notification;
    }
}