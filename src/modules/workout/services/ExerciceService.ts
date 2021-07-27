import { FilterQuery, UpdateWriteOpResult } from 'mongoose';

import ExerciceRepository from '../repositories/ExerciceRepository';
import ExerciceModel from '../models/ExerciceModel';
import IOptionsRetrieveModel from '../../../helpers/lib/repositories/models/OptionsRetrieveModel';
import KeyValueObject from '../../../helpers/interfaces/KeyValueObject';

class ExerciceService {
  private _exerciceRepository: ExerciceRepository;

  constructor() {
    this._exerciceRepository = new ExerciceRepository();
  }

  retrieve(options: IOptionsRetrieveModel, params: any): Promise<ExerciceModel[]> {
    return this._exerciceRepository.retrieve(options, params);
  }

  aggregate(pipeline: unknown[]): Promise<ExerciceModel[]> {
    return this._exerciceRepository.aggregate(pipeline);
  }

  create(item: ExerciceModel): Promise<ExerciceModel> {
    return this._exerciceRepository.create(item);
  }

  update(_id: string, item: ExerciceModel): Promise<UpdateWriteOpResult> {
    return this._exerciceRepository.update(_id, item);
  }

  delete(_id: string): Promise<ExerciceModel> {
    return this._exerciceRepository.delete(_id);
  }

  findById(_id: string, projection?: { [key: string]: number }): Promise<ExerciceModel> {
    return this._exerciceRepository.findById(_id, projection);
  }

  count(
    params: FilterQuery<ExerciceModel>,
  ): Promise<number> {
    return this._exerciceRepository.count(params);
  }

  buildMatchQuery(query: KeyValueObject) {
    return {};
  }
}

Object.seal(ExerciceService);
export = ExerciceService;
