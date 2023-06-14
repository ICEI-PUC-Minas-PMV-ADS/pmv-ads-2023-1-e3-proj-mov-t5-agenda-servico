import EncryptedStorage from 'react-native-encrypted-storage';
import { database } from '../FirebaseApp';
import { Notification } from '../models/notification';
import { User } from '../models/user';
import { Repository } from './repository';
import { KEY_USERDATA } from '../constants/app';

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

  clearNotifications(model: User, onComplete: () => void) {
    database
      .ref(`${this.table}/${model.id}/notificacoes`)
      .set([])
      .then(() => onComplete());
  }

  markAsNotifiedNotifications(model: User, notifications: Notification[], onComplete: (notifications: Notification[]) => void) {
    for (let modelKey in notifications) {
      if (notifications[modelKey as keyof object].notified === false) {
        database
          .ref(`${this.table}/${model.id}/notificacoes/${modelKey}`)
          .set({ ...notifications[modelKey as keyof object], notified: true });
      }
    }
    onComplete?.(notifications)
  }

  markAsReadedNotifications(model: User, notifications: Notification[], onComplete: (notifications: Notification[]) => void) {
    for (let modelKey in notifications) {
      if (notifications[modelKey as keyof object].readed === false) {
        database
          .ref(`${this.table}/${model.id}/notificacoes/${modelKey}`)
          .set({ ...notifications[modelKey as keyof object], readed: true });
      }
    }
    onComplete?.(notifications)
  }

  getUnnotifiedNotifications(model: User, onComplete: (notifications: Notification[]) => void) {
    database
      .ref(`${this.table}/${model.id}/notificacoes`)
      .once('value')
      .then((snapshot) => {
        const notifications: Notification[] = [];
        const data = snapshot.val();
        if (data !== null && data instanceof Object) {
          for (let modelKey in data) {
            const notification: Notification = { ...data[modelKey as keyof object] };
            if (notification?.notified === false) {
              notifications[modelKey as keyof object] = ({ ...notification, data_criacao: new Date(notification.data_criacao ?? 0) });
            }
          }
        }
        onComplete?.(notifications);
      });
  }

  getNotifications(model: User, onComplete: (notifications: Notification[]) => void) {
    database
      .ref(`${this.table}/${model.id}/notificacoes`)
      .once('value')
      .then((snapshot) => {
        const notifications: Notification[] = [];
        const data = snapshot.val();
        if (data !== null && data instanceof Object) {
          for (let modelKey in data) {
            const notification: Notification = { ...data[modelKey as keyof object] };
            notifications.push({ ...notification, data_criacao: new Date(notification.data_criacao ?? 0) });
          }
        }
        onComplete?.(notifications);
      });
  }

  sendNotification(model: User, title: string, message: string, onComplete: () => void) {
    database
      .ref(`${this.table}/${model.id}/notificacoes/${model.notificacoes?.length}`)
      .set({ title: title, message: message, notified: false, readed: false, data_criacao: new Date().getTime() })
      .then(() => onComplete());
  }

  getFavoriteSuppliers(user: User, callback: (favoritySuppliers: string[]) => void) {
    database
      .ref(`${this.table}/${user.id}/favorite_suppliers`)
      .once('value', (snapshot) => {
        callback(snapshot.val() ?? []);
      });
  }


  toggleFavoriteSupplier(user: User, supplierId: string, callback: (favoritySuppliers: string[]) => void) {
    this.getFavoriteSuppliers(user, (userFavoritySuppliers) => {
      const favoriteIndex = userFavoritySuppliers.findIndex((userSupplierId) => userSupplierId === supplierId);
      if (favoriteIndex >= 0) {
        userFavoritySuppliers.splice(favoriteIndex, 1);
        const newFavoriteSuppliers = [...userFavoritySuppliers];
        database
          .ref(`${this.table}/${user.id}/favorite_suppliers`)
          .set(newFavoriteSuppliers)
          .then(() => callback(newFavoriteSuppliers));
      } else {
        const newFavoriteSuppliers = [...userFavoritySuppliers, supplierId];
        database
          .ref(`${this.table}/${user.id}/favorite_suppliers`)
          .set(newFavoriteSuppliers)
          .then(() => callback(newFavoriteSuppliers));
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
    user.endereco_visivel = json.endereco_visivel
    return user;
  }
}
