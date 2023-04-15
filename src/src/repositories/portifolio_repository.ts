import { Portifolio } from "../models/portifolio";
import { Repository } from "./repository";

export class PortifolioRepository extends Repository<Portifolio> {
    constructor() {
        super('Portifolio');
    }

    protected serialize(model: Portifolio): any {
        return { ...model };
    }

    protected deserialize(model: any): Portifolio {
        let portifolio: Portifolio = new Portifolio();
        portifolio.id = model.id;
        portifolio.fotos = model.fotos;
        return portifolio;
    }
}