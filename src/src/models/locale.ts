import { Model } from "./model";

export class Locale extends Model {
    id?: String;
    rua?: String;
    uf?: String;
    cep?: String;
    lat?: Number;
    lon?: Number;
}