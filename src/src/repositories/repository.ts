import { database } from '../FirebaseAppNew';
import { Model } from '../models/model';

export abstract class Repository<TModel extends Model> {
  protected table: string | undefined = undefined;

  constructor(table: string) {
    this.table = table;
  }

  create(model: TModel, callback?: (model: TModel | undefined) => void): void {
    const { id, ...normalizedModel } = this.serialize(model);
    const ref = database
      .ref(this.table)
      .push(JSON.parse(JSON.stringify(normalizedModel)), () => {
        callback?.(this.deserialize({ ...normalizedModel, id: ref.key }));
      });
  }

  getAll(callback?: (models: TModel[] | undefined) => void): void {
    database
      .ref(`${this.table}`)
      .once('value')
      .then((snapshot) => {
        const data = snapshot.val();
        if (data !== null && data instanceof Object) {
          const models: TModel[] = [];
          for (let modelKey in data) {
            models.push(
              this.deserialize({ ...data[modelKey as keyof object], id: modelKey }),
            );
          }
          callback?.(models);
        } else {
          callback?.([]);
        }
      });
  }

  get(id: String, callback?: (model: TModel | undefined) => void): void {
    database
      .ref(`${this.table}/${id}`)
      .once('value')
      .then(snapshot => {
        const data = snapshot.val();
        if (data !== null && data instanceof Object) {
          callback?.(this.deserialize({ ...data, id: id }));
        } else {
          callback?.(undefined);
        }
      });
  }

  update(model: TModel, callback?: (model: TModel | undefined) => void): void {
    const { id: modelKey, ...normalizedModel } = this.serialize(model);
    database
      .ref(`${this.table}/${modelKey}`)
      .once('value')
      .then(snapshot => {
        const data = snapshot.val();
        if (data !== null && data instanceof Object) {
          const ref = database
            .ref(`${this.table}/${modelKey}`)
            .set(JSON.parse(JSON.stringify(normalizedModel)), (error) => {
              callback?.(error ? undefined : model)
            });
        }
      })
  }

  delete(model: TModel, callback?: (success: boolean) => void): void {
    const { id: modelKey } = this.serialize(model);
    database
      .ref(`${this.table}/${modelKey}`)
      .once('value')
      .then(snapshot => {
        const data = snapshot.val();
        if (data !== null && data instanceof Object) {
          database
            .ref(`${this.table}/${modelKey}`)
            .remove((error) => {
              callback?.(error ? false : true)
            });
        }
      })
  }

  protected abstract serialize(model: TModel): any;
  protected abstract deserialize(model: any): TModel;
}
