import { Model } from "./model";

export class Qualification extends Model {
    id?: String;
    profissional_fk?: String;
    descricao?: String;
    foto_certificado?: String;
}