import CategoryRepository from '../repositories/CategoryRepository';
import CategoryModel from '../models/CategoryModel';

class CategoryService {
  private _categoryRepository: CategoryRepository;

  constructor() {
    this._categoryRepository = new CategoryRepository();
  }

  aggregate(pipeline: unknown[]): Promise<CategoryModel[]> {
    return this._categoryRepository.aggregate(pipeline);
  }

  create(item: CategoryModel): Promise<CategoryModel> {
    return this._categoryRepository.create(item);
  }
}

Object.seal(CategoryService);
export = CategoryService;
