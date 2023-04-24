import { Model } from './model';

export class Notification extends Model {
  id?: string;
  titulo?: string;
  usuario_fk?: string;
  descricao?: string;
  data_criacao?: Date;
}
