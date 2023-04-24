import {Model} from './model';

export class Locale extends Model {
  id?: string;
  rua?: string;
  uf?: string;
  cep?: string;
  lat?: Number;
  lon?: Number;
}
