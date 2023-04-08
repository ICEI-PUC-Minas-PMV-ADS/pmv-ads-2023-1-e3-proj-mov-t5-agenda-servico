import { Model } from "./model";

export class User extends Model {
  id?: String;
  nome?: String;
  hash?: String;
  imagem_perfil?: String;
  telefone?: String;  
  email?: String;
  tipo?: String;
  createdAt?: Date;
}