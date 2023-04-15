import { Locale } from "../models/locale";
import { Repository } from "./repository";

export class LocaleRepository extends Repository<Locale> {
    constructor() {
        super('Locale');
    }

    protected serialize(model: Locale) {
        return { ...model };
    }

    protected deserialize(model: any): Locale {
        let locale: Locale = new Locale();
        locale.id = model.id;
        locale.rua = model.rua;
        locale.uf = model.uf;
        locale.cep = model.cep;
        locale.lat = model.lat;
        locale.lon = model.lon;
        return locale;
    }

}