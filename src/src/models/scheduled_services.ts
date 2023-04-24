import {Model} from './model';

export class ScheduledServices extends Model {
  id?: string;
  servico_fk?: string;
  descricao?: string;
  data?: Date;
  status?: string;
  cliente_fk?: string;
  local_fk?: string;
  preco?: Number;
  numero_endereco?: Number;
  avaliacao?: Boolean;
}
