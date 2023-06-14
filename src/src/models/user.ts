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
  fcm_token?: string;
  endereco_fk?: string;
  portifolio_fk?: string;
  nome_fantasia?: string;
  descricao?: string;
  cnpj?: string;
  lista_de_horarios?: Horario[];
  taxa_de_deslocamento?: Taxa;
  onde_trabalha?: Onde;
  endereco_visivel?: boolean;
  notificacoes?: string[] = [];
  favorite_suppliers?: string[] = [];
}

export class AvaliableSchedule {
  horas?: number;
  minutos?: number;
  status?: "disponivel" | "indisponivel" | "ocupado"
}

export class Horario {
  dia?: string;
  aberto?: boolean;
  inicio?: Tempo;
  fim?: Tempo;
  intervalos?: Intervalo[];
  horarios_agendados?: AvaliableSchedule[] = [];
}

export class Intervalo {
  inicio?: Tempo;
  fim?: Tempo;
}

export class Tempo {
  horas?: number;
  minutos?: number;
}

export class Taxa {
  distancia?: '5 km' | '10 km' | '15 km' | '20 km' | '25 km' | '30 km' | '35 km' | '40 km' | '45 km' | '50 km';
  tipo_taxa?: 'Gratuito' | 'Fixo' | 'Começa em';
  valor_taxa?: string
}

export class Onde {
  estabelecimento?: boolean;
  casa_cliente?: boolean;
}