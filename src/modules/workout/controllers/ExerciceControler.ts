import express from 'express';
import StatusAPI from '../../../helpers/status/StatusAPI';

import JsonValidator from '../../../helpers/lib/schemaValidator/JsonValidator';

// Services
import ExerciceService from '../services/ExerciceService';
import VcreateExerciceValidator from '../validator/exercice/createExerciceValidator';
import VupdateExerciceValidator from '../validator/exercice/updateExerciceValidator';
import { ExerciceModel } from '../models/ExerciceModel';

// Validators
import UtilsService from '../../../helpers/utils/UtilsService';
import KeyValueObject from '../../../helpers/interfaces/KeyValueObject';

class ExerciceController {
  private _exerciceService: ExerciceService;

  private _ajv = new JsonValidator();

  private _statusAPI = new StatusAPI();

  constructor() {
    this._exerciceService = new ExerciceService();
    this._ajv = new JsonValidator();
    this._statusAPI = new StatusAPI();
  }

  /** Create an exercice
   * @param  {express.Request} req requête express
   * @param  {express.Response} res réponse express
   * @returns Promise<void>
   */
  create = async (req: express.Request, res: express.Response): Promise<void> => {
    try {
      const exercice = this._ajv.validate<ExerciceModel>(
        VcreateExerciceValidator,
        req.body as ExerciceModel,
      );
      const result = await this._exerciceService.create(exercice);
      res.send(result);
    } catch (e) {
      this._statusAPI.addMessage(
        'CREATE_EXERCICE_ERROR',
        'error',
        'An error appeared while creating the exercice, please try again',
        e.message,
      );
      res.status(500).send(this._statusAPI.returnStatus());
    }
  }

  /** Get a list of exercice
  * @param  {express.Request} req requête express
  * @param  {express.Response} res réponse express
  * @returns Promise<void>
  */
  retrieve = async (req: express.Request, res: express.Response): Promise<void> => {
    try {
      const {
        limit,
        index,
        sortBy,
      } = req.query;
      const { count, match } = req.exercices;

      const pipeline: unknown[] = [
        { $sort: UtilsService.getSortForPipeline('createdAt', sortBy ? sortBy.toString() : null) },
      ];

      if (Object.keys(match).length > 0) {
        pipeline.push({
          $match: match,
        });
      }
      pipeline.push({ $project: { password: 0 } });
      pipeline.push(
        { $skip: +index },
        { $limit: +limit },
      );

      const data = await this._exerciceService.aggregate(pipeline);
      res.send({ pagination: UtilsService.buildPagination(count, +index, +limit), data });
    } catch (e) {
      this._statusAPI.addMessage(
        'RETIEVE_EXERCICE_ERROR',
        'error',
        'An error appeared while getting the exercices',
        e.message,
      );
      res.status(500).send(this._statusAPI.returnStatus());
    }
  }

  /** Update an exercice
   * @param  {express.Request} req requête express
   * @param  {express.Response} res réponse express
   * @returns Promise<void>
   */
  update = async (req: express.Request, res: express.Response): Promise<void> => {
    try {
      const { _id } = req.params;
      this._ajv.validate({ objectId: true }, _id);
      const exercice = this._ajv.validate<ExerciceModel>(
        VupdateExerciceValidator,
        req.body,
      );

      const result = await this._exerciceService.update(_id, exercice);
      res.send(result);
    } catch (e) {
      this._statusAPI.addMessage(
        'UPDATE_ERROR',
        'error',
        'Une erreur est survenue lors de la création du compte',
        e.message,
      );
      res.status(500).send(this._statusAPI.returnStatus());
    }
  };

  /** Delete an exercice
   * @param  {express.Request} req requête express
   * @param  {express.Response} res réponse express
   * @returns Promise<void>
   */
  delete = async (req: express.Request, res: express.Response): Promise<void> => {
    try {
      const { _id } = req.params;
      this._ajv.validate({ objectId: true }, _id);
      const result = await this._exerciceService.delete(_id);
      if (result === null) {
        throw new Error('NOTFOUND: This exercice could not be found in the database');
      }
      res.send(result);
    } catch (e) {
      this._statusAPI.addMessage(
        'DELETE_EXERCICE_ERROR',
        'error',
        'An error appeared while deleting the exercice',
        e.message,
      );
      res.status(500).send(this._statusAPI.returnStatus());
    }
  };

  /** Find an exercice by his id
   * @param  {express.Request} req requête express
   * @param  {express.Response} res réponse express
   * @returns void
   */
  findById = async (req: express.Request, res: express.Response): Promise<void> => {
    try {
      const { _id } = req.params;
      this._ajv.validate({ objectId: true }, _id);

      const result = await this._exerciceService.findById(_id);
      if (!result) {
        this._statusAPI.addMessage(
          'FINDBYID_EXERCICE_ERROR',
          'error',
          'This exercice does not exist.',
        );
        res.status(404).send(this._statusAPI.returnStatus());
      } else {
        res.send(result);
      }
    } catch (e) {
      this._statusAPI.addMessage(
        'FINDBYID_EXERCICE_ERROR',
        'error',
        'an error appeared while getting the exercice by his id',
        e,
      );
      res.status(500).send(this._statusAPI.returnStatus());
    }
  };

  /** Find a list of exercices by workout id
   * @param  {express.Request} req requête express
   * @param  {express.Response} res réponse express
   * @returns void
   */
   findByWorkoutId = async (req: express.Request, res: express.Response): Promise<void> => {
     try {
       const { _id } = req.params;
       this._ajv.validate({ objectId: true }, _id);

       const result = await this._exerciceService.findById(_id);
       res.send(result);
     } catch (e) {
       this._statusAPI.addMessage(
         'FINDBYID_EXERCICE_ERROR',
         'error',
         'an error appeared while getting the exercice by his id',
         e,
       );
       res.status(500).send(this._statusAPI.returnStatus());
     }
   };

   /** Build the filters to use while counting and getting the exercices
  * @param  {express.Request} req requête express
  * @param  {express.Response} res réponse express
  * @returns Promise<void>
  */
 buildFilters = async (req: express.Request, res: express.Response, next: () => void): Promise<void> => {
   req.exercices = {
     match: this._exerciceService.buildMatchQuery(req.query as KeyValueObject),
   };
   next();
 }

  /** Count the number of exercice in the collection for the specific filters
  * @param  {express.Request} req requête express
  * @param  {express.Response} res réponse express
  * @returns Promise<void>
  */
  count = async (req: express.Request, res: express.Response, next: () => void): Promise<void> => {
    const pipeline: unknown[] = [];
    if (Object.keys(req.exercices?.match).length > 0) {
      pipeline.push({
        $match: req.exercices.match,
      });
    }
    pipeline.push({
      $count: 'count',
    });
    try {
      const [count] = await this._exerciceService.aggregate(pipeline);
      req.exercices = {
        ...req.exercices,
        ...count,
      };
      if (!count) {
        req.exercices.count = 0;
      }
      next();
    } catch (e) {
      this._statusAPI.addMessage(
        'COUNT_EXERCICE_ERROR',
        'error',
        'An error occured while counting the exercices',
        e,
      );
      res.status(500).send(this._statusAPI.returnStatus());
    }
  }
}

export = ExerciceController;
