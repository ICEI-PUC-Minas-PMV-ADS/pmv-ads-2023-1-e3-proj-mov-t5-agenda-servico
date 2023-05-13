import { Model } from './model';

export class User extends Model {
  id?: string;
  nome?: string;
  hash?: string;
  imagem_perfil?: string;
  telefone?: string;
  email?: string;
  tipo?: 'cliente' | 'prestador';
  tipo_login?: 'google' | 'facebook' | 'app';
  created_at?: Date = new Date();
  endereco_fk?: string;
  portifolio_fk?: string;
  nome_fantasia?: string;
  descricao?: string;
  cnpj?: string;
  lista_de_horarios?: Horario[];
}

export class Horario {
  dia?:string;
  aberto?: boolean;
  inicio?: Tempo;
  fim?: Tempo;
  intervalos?: Intervalo[];
}

export class Intervalo {
inicio?: Tempo;
fim?: Tempo;
}

export class Tempo {
  horas?: number;
  minutos?: number;
}