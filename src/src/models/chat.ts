import { Model } from './model';

export class Chat extends Model {
  id?: string;
  prestador_servico_fk?: string;
  cliente_fk?: string;
  scheduled_service_fk?: string;
  mensagens?: ChatMessage[] = [];
  data_criacao?: Date;
}

/***
 * ChatMessage
 */

export class ChatMessage {
  sender_fk?: string;
  message?: string;
};