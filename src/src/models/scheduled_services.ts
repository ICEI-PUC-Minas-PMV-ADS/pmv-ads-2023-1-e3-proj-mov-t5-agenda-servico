import { Model } from './model';
import { Service } from './service';

export class ScheduledServices extends Model {
  id?: string;
  servico_fk?: string;
  descricao?: string;
  data?: Date;
  status?: "pendente" | "cancelado" | "concluido" | "fora do prazo";
  cliente_fk?: string;
  local_fk?: string;
  preco?: Number;
  numero_endereco?: Number;
  avaliacao?: Boolean;
}
