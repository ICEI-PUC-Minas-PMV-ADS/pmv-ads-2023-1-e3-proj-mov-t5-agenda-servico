import {Category} from '../models/category';
import {Repository} from './repository';

export class CategoryRepository extends Repository<Category> {
  constructor() {
    super('Category');
  }

  protected serialize(model: Category) {
    return {...model};
  }

  protected deserialize(model: any): Category {
    let category: Category = new Category();
    category.id = model.id;
    category.titulo = model.titulo;
    return category;
  }
}
