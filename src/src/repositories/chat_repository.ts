import { ref, set } from 'firebase/database';
import { Chat, ChatMessage } from '../models/chat';
import { Repository } from './repository';

import { database } from '../FirebaseApp';

export class ChatRepository extends Repository<Chat> {
  constructor() {
    super('Chat');
  }

  sendMessage(model: Chat, message: ChatMessage, callback: (message: ChatMessage) => void) {
    set(ref(database, `${this.table}/${model.id}/mensagens/${model.mensagens?.length}`), message).then(() => {
      callback(message);
    });
  }

  protected serialize(model: Chat): any {
    return { ...model, data_criacao: model?.data_criacao?.getTime() };
  }

  protected deserialize(model: any): Chat {
    let chat: Chat = new Chat();
    chat.id = model.id;
    chat.scheduled_service_fk = model.scheduled_service_fk;
    chat.prestador_servico_fk = model.prestador_servico_fk;
    chat.cliente_fk = model.cliente_fk;
    chat.mensagens = model.mensagens;
    chat.data_criacao = new Date(model.data_criacao);
    return chat;
  }
}
