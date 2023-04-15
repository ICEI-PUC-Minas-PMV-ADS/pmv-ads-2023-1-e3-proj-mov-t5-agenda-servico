import {Model} from './model';

export class ScheduledServices extends Model {
  id?: String;
  servico_fk?: String;
  descricao?: String;
  data?: Date;
  status?: String;
  cliente_fk?: String;
  local_fk?: String;
  preco?: Number;
  numero_endereco?: Number;
  avaliacao?: Boolean;
}
