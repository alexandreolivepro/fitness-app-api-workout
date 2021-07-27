import { CategoryModel } from '../models/CategoryModel';
import CategorySchema from '../schemas/CategorySchema';
import RepositoryBase from '../../../helpers/lib/repositories/base/RepositoryBase';

class CategoryRepository extends RepositoryBase<CategoryModel> {
  constructor() {
    super(CategorySchema);
  }
}

Object.seal(CategoryRepository);
export = CategoryRepository;
