import { FilterQuery, UpdateWriteOpResult } from 'mongoose';

import WorkoutRepository from '../repositories/WorkoutRepository';
import WorkoutModel from '../models/WorkoutModel';
import IOptionsRetrieveModel from '../../../helpers/lib/repositories/models/OptionsRetrieveModel';

class WorkoutService {
  private _workoutRepository: WorkoutRepository;

  constructor() {
    this._workoutRepository = new WorkoutRepository();
  }

  retrieve(options: IOptionsRetrieveModel, params: any): Promise<WorkoutModel[]> {
    return this._workoutRepository.retrieve(options, params);
  }

  aggregate(pipeline: unknown[]): Promise<WorkoutModel[]> {
    return this._workoutRepository.aggregate(pipeline);
  }

  create(item: WorkoutModel): Promise<WorkoutModel> {
    return this._workoutRepository.create(item);
  }

  update(_id: string, item: WorkoutModel): Promise<UpdateWriteOpResult> {
    return this._workoutRepository.update(_id, item);
  }

  delete(_id: string): Promise<WorkoutModel> {
    return this._workoutRepository.delete(_id);
  }

  findById(_id: string, projection?: { [key: string]: number }): Promise<WorkoutModel> {
    return this._workoutRepository.findById(_id, projection);
  }

  findByUserId(userId: string): Promise<WorkoutModel[]> {
    return this._workoutRepository.retrieve({ skip: 0, limit: 0 }, { userId });
  }

  count(
    params: FilterQuery<WorkoutModel>,
  ): Promise<number> {
    return this._workoutRepository.count(params);
  }

  buildMatchQuery(filters: unknown): unknown {
    const match = {};

    return match;
  }
}

Object.seal(WorkoutService);
export = WorkoutService;
