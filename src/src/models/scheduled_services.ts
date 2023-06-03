import { Model } from './model';

export class ScheduledServices extends Model {
  id?: string;
  servico_fk?: string;
  descricao?: string;
  data?: Date;
  preco?: Number;
  avaliacao?: Boolean;
  cliente_fk?: string;
  local_fk?: string;
  hora?: Number;
  status?: "pendente" | "cancelado" | "concluido" | "fora do prazo" ;
  numero_endereco?: number
}


