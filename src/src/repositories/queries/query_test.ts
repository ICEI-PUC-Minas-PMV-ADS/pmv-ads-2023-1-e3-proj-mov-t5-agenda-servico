import { Portifolio } from "../../models/portifolio";
import { User } from "../../models/user";
import { hash } from "../../utils/crypto";
import { PortifolioRepository } from "../portifolio_repository";
import { UserRepository } from "../user_repository";

export class QueryTest {
  private portifolioRepository: PortifolioRepository;
  constructor() {
    this.portifolioRepository = new PortifolioRepository();
  }

  query() {
    const portifolio = new Portifolio();
    portifolio.fotos = ['Foto1', 'Foto2'];
    this.portifolioRepository.create(portifolio, (DBPortifolio) => {
      if (DBPortifolio) {
        // Success
      } else {
        // Fail
      }
    });
  }

  queryUser() {
    // Instancia novo usuario.
    const user = new User();

    // Instancia a lista de horarios.
    user.lista_de_horarios = [
      { final: 2, inicio: 1 },
      { final: 2, inicio: 1 }
    ];

    // Insere dois elementos a lista.
    user.lista_de_horarios.push({ final: 2, inicio: 1 });
    user.lista_de_horarios.push({ final: 3, inicio: 2 });

    // Cria usuario no banco de dados.
    const userRepository = new UserRepository();
    userRepository.create(user, (DBUser) => { });

    // Gera hash da senha.
    const hashPassword = hash('123');
  }
}

// Ivory.