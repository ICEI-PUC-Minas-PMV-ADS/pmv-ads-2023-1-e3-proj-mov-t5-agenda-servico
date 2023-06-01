import { Model } from './model';

export class Ticket extends Model {
  id?: string;
  motivo?: string;
  descricao?: string;
}
