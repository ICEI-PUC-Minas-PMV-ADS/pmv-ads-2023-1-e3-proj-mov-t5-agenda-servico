import { Model } from './model';

export class Address extends Model {
  id?: number;
  cep?: string;
  logradouro?: string;
  numero?: number;
  bairro?: string;
  uf?: string;
  complemento?: string;
  observacoes?: string;
}
