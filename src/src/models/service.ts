import { Model } from './model';

export class Service extends Model {
  id?: string;
  titulo?: string;
  prestador_servico_fk?: string;
  descricao?: string;
  valor?: Number;
  servico_externo?: Boolean;
  categoria?: string;
  avaliacao?: Number;
  regime_de_trabalho?: string;
  duracao?: Tempo;
}

export class Tempo {
  horas?: number;
  minutos?: number;
}


