import { ExerciceModel } from '../models/ExerciceModel';
import ExerciceSchema from '../schemas/ExerciceSchema';
import RepositoryBase from '../../../helpers/lib/repositories/base/RepositoryBase';

class ExerciceRepository extends RepositoryBase<ExerciceModel> {
  constructor() {
    super(ExerciceSchema);
  }
}

Object.seal(ExerciceRepository);
export = ExerciceRepository;
