import { Model } from './model';

export class Address extends Model {
  id?: string;
  cep?: string;
  logradouro?: string;
  cidade?: string;
  bairro?: string;
  uf?: string;
  complemento?: string;
}
