import {Model} from './model';

export class Notification extends Model {
  id?: String;
  titulo?: String;
  usuario_fk?: String;
  descricao?: String;
  data_criacao?: Date;
}
