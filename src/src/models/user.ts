import {Model} from './model';

export class User extends Model {
  id?: String;
  nome?: String;
  hash?: String;
  imagem_perfil?: String;
  telefone?: String;
  email?: String;
  tipo?: 'cliente' | 'prestador';
  tipo_login?: 'google' | 'facebook' | 'app';
  created_at?: Date = new Date();
  endereco_fk?: String;
  portifolio_fk?: String;
  nome_fantasia?: String;
  descricao?: String;
  cnpj?: String;
}
