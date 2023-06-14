import { Model } from './model';

export class ScheduledServices extends Model {
  id?: string;
  servico_fk?: string;
  descricao?: string;
  data?: Date;
  preco?: string;
  avaliacao?: boolean;
  cliente_fk?: string;
  local_fk?: string;
  hora?: number;
  status?: "pendente" | "cancelado" | "concluido" | "fora do prazo";
  numero_endereco?: number;
  lat?: number;
  lng?: number;
}


