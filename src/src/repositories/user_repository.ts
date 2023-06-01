import { User } from '../models/user';
import { Repository } from './repository';

export class UserRepository extends Repository<User> {
  constructor() {
    super('Users');
  }

  findUserByEmail(email: string, callback: (model: User | undefined) => void) {
    this.getAll(users => {
      if (users) {
        callback(users.find(u => u.email === email));
      } else {
        callback(undefined);
      }
    });
  }

  protected serialize(model: User): any {
    return {
      ...model,
      created_at: model?.created_at?.getTime(),
      lista_de_horarios: JSON.stringify(model.lista_de_horarios),
      taxa_de_deslocamento: JSON.stringify(model.taxa_de_deslocamento),
      onde_trabalha: JSON.stringify(model.onde_trabalha),
    };
  }

  protected deserialize(json: any): User {
    const user = new User();
    user.id = json.id;
    user.nome = json.nome;
    user.hash = json.hash;
    user.imagem_perfil = json.imagem_perfil;
    user.telefone = json.telefone;
    user.email = json.email;
    user.tipo = json.tipo;
    user.tipo_login = json.tipo_login;
    user.created_at = new Date(json.createdAt);
    user.endereco_fk = json.endereco_fk;
    user.portifolio_fk = json.portifolio_fk;
    user.nome_fantasia = json.nome_fantasia;
    user.descricao = json.descricao;
    user.cnpj = json.cnpj;
    user.lista_de_horarios = JSON.parse(json.lista_de_horarios ?? "[]")
    user.taxa_de_deslocamento = JSON.parse(json.taxa_de_deslocamento ?? "{}")
    user.onde_trabalha = JSON.parse(json.onde_trabalha ?? "{}")
    user.endereco_visivel = json.onde_trabalha
    return user;
  }
}
