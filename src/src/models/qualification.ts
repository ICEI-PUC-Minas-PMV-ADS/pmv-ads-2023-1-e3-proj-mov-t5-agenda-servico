import {Model} from './model';

export class Qualification extends Model {
  id?: string;
  profissional_fk?: string;
  descricao?: string;
  foto_certificado?: string;
}
