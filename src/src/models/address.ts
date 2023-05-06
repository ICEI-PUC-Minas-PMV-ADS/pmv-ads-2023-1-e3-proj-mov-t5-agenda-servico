import { Model } from './model';

export class Address extends Model {
  id?: string;
  cep?: string;
  logradouro?: string;
  numero?: number;
  bairro?: string;
  uf?: string;
  complemento?: string;
  observacoes?: string;
}
