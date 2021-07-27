import { WorkoutModel } from '../models/WorkoutModel';
import WorkoutSchema from '../schemas/WorkoutSchema';
import RepositoryBase from '../../../helpers/lib/repositories/base/RepositoryBase';

class WorkoutRepository extends RepositoryBase<WorkoutModel> {
  constructor() {
    super(WorkoutSchema);
  }
}

Object.seal(WorkoutRepository);
export = WorkoutRepository;
