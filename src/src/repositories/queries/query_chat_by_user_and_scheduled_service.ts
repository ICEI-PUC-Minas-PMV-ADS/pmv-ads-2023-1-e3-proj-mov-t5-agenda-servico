import { Chat } from "../../models/chat";
import { ChatRepository } from "../chat_repository";

export class QueryChatByUserAndScheduledService {
  private chatRepository: ChatRepository;
  constructor() {
    this.chatRepository = new ChatRepository();
  }

  query(userId: string, scheduledServiceId: string): Promise<Chat | undefined> {
    return new Promise<Chat | undefined>((accept, _) => {
      this.chatRepository.getAll((chats) => {
        accept(chats?.find(chat =>
          (chat.cliente_fk === userId || chat.prestador_servico_fk === userId) && chat.scheduled_service_fk === scheduledServiceId));
      });
    });
  }
}