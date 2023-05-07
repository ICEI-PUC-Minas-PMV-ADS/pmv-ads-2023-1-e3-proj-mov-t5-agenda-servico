import { Model } from './model';

export class Message extends Model {
  id?: string;
  prestador_servico_fk?: string;
  cliente_fk?: string;
  corpo_mensagem?: string;
  data_criacao?: Date;
}
