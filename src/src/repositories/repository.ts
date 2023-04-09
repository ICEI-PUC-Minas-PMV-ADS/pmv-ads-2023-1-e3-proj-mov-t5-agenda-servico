import { database } from "../FirebaseApp";
import { ref, push, get as fget, set, remove } from 'firebase/database';
import { Model } from "../models/model";

export abstract class Repository<TModel extends Model> {
  protected table: string | undefined = undefined;

  constructor(table: string) { this.table = table; }

  create(model: TModel, callback?: (model: TModel | undefined) => void): void {
    const normalizedModel = this.serialize(model);
    delete normalizedModel.id;

    push(ref(database, this.table), JSON.parse(JSON.stringify(normalizedModel))).then((data) => {
      callback?.(this.deserialize({...model, id: data.key}));
    });
  }

  getAll(callback?: (models: TModel[] | undefined) => void): void {
    fget(ref(database, `${this.table}`)).then((snapshot) => {
      const data = snapshot.val();
      if (data !== null && data instanceof Object) {       
        const models: TModel[] = []; 
        for (let modelKey in data) {
          models.push(this.deserialize({ ...data[modelKey as keyof object], id: modelKey }));
        }
        callback?.(models);
      } else {
        callback?.(undefined);
      }      
    });
  }

  get(id: String, callback?: (model: TModel | undefined) => void): void {
    fget(ref(database, `${this.table}/${id}`)).then((snapshot) => {
      const data = snapshot.val();
      if (data !== null && data instanceof Object) {
        callback?.(this.deserialize({ ...data, id: id }));
      } else {
        callback?.(undefined);
      }
    });
  }

  update(model: TModel, callback?: (model: TModel | undefined) => void): void {
    const normalizedModel = this.serialize(model);
    const modelKey = normalizedModel.id;

    fget(ref(database, `${this.table}/${modelKey}`)).then((snapshot) => {
      const data = snapshot.val();
      if (data !== null && data instanceof Object) {
        delete normalizedModel.id;
        set(ref(database, `${this.table}/${modelKey}`), normalizedModel).then(() => {
          callback?.(model);
        });
      } else {
        callback?.(undefined);
      }
    });
  }

  delete(model: TModel, callback?: (success: boolean) => void): void {
    const normalizedModel = this.serialize(model);
    const modelKey = normalizedModel.id;

    fget(ref(database, `${this.table}/${modelKey}`)).then((snapshot) => {
      const data = snapshot.val();
      if (data !== null && data instanceof Object) {
        remove(ref(database, `${this.table}/${modelKey}`)).then(() => {
          callback?.(true);
        });
      } else {
        callback?.(false);
      }
    });
  }

  protected abstract serialize(model: TModel): any;
  protected abstract deserialize(json: any): TModel
}