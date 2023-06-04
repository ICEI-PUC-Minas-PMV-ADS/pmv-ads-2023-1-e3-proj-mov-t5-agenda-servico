import { Model } from './model';

export class Service extends Model {
  id?: string;
  titulo?: string;
  prestador_servico_fk?: string;
  descricao?: string;
  valor?: string;
  servico_externo?: Boolean;
  categoria?: string;
  avaliacao?: number;
  regime_de_trabalho?: string;
  duracao?: Tempo;
}

export class Tempo {
  horas?: number;
  minutos?: number;
}


