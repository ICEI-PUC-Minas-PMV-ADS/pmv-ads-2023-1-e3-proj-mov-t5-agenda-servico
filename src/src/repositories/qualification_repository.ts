import { Qualification } from "../models/qualification";
import { Repository } from "./repository";

export class QualificationRepository extends Repository<Qualification> {
    constructor() {
        super('Qualification');
    }

    protected serialize(model: Qualification): any {
        return { ...model };
    }

    protected deserialize(model: any): Qualification {
        let qualification: Qualification = new Qualification();
        qualification.id = model.id;
        qualification.profissional_fk = model.profissional_fk;
        qualification.descricao = model.descricao;
        qualification.foto_certificado = model.foto_certificado;
        return qualification;
    }
}