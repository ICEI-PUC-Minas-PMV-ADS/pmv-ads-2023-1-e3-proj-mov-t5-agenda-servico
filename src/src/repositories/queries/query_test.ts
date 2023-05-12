import { Portifolio } from "../../models/portifolio";
import { PortifolioRepository } from "../portifolio_repository";

export class QueryTest {
  private portifolioRepository: PortifolioRepository;
  constructor() {
    this.portifolioRepository = new PortifolioRepository();
  }

  query() {
    const portifolio = new Portifolio();
    this.portifolioRepository.create(portifolio, (DBPortifolio) => {
      if (DBPortifolio) {
        // Success
      } else {
        // Fail
      }
    });
  }
}

// Ivory.