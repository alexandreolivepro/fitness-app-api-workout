import express from 'express';
import StatusAPI from '../../../helpers/status/StatusAPI';

import JsonValidator from '../../../helpers/lib/schemaValidator/JsonValidator';

// Services
import WorkoutService from '../services/WorkoutService';

import { WorkoutModel } from '../models/WorkoutModel';

// Validators
import VcreateWorkoutValidator from '../validator/workout/createWorkoutValidator';
import VupdateWorkoutValidator from '../validator/workout/updateWorkoutValidator';
import UtilsService from '../../../helpers/utils/UtilsService';
import KeyValueObject from '../../../helpers/interfaces/KeyValueObject';
import AuthService from '../../../helpers/lib/authentication/services/AuthService';

class WorkoutController {
  private _workoutService: WorkoutService;

  private _ajv = new JsonValidator();

  private _statusAPI = new StatusAPI();

  constructor() {
    this._workoutService = new WorkoutService();
    this._ajv = new JsonValidator();
    this._statusAPI = new StatusAPI();
  }

  /** Creer un workout
   * @param  {express.Request} req requête express
   * @param  {express.Response} res réponse express
   * @returns Promise<void>
   */
  create = async (req: express.Request, res: express.Response): Promise<void> => {
    try {
      const workout = this._ajv.validate<WorkoutModel>(
        VcreateWorkoutValidator,
        req.body as WorkoutModel,
      );
      if (!workout.userId) {
        workout.userId = await AuthService.getUserIdFromAccessToken(req.headers.authorization);
      }
      const result = await this._workoutService.create(workout);
      res.send(result);
    } catch (e) {
      this._statusAPI.addMessage(
        'CREATE_WORKOUT_ERROR',
        'error',
        'Une erreur est survenue lors de la création du workout',
        e.message,
      );
      res.status(500).send(this._statusAPI.returnStatus());
    }
  }

  /** Récupère la liste des workout
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
      const { count, match } = req.workouts;

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

      const data = await this._workoutService.aggregate(pipeline);
      res.send({ pagination: UtilsService.buildPagination(count, +index, +limit), data });
    } catch (e) {
      this._statusAPI.addMessage(
        'RETIEVE_WORKOUT_ERROR',
        'error',
        'Une erreur est survenue lors de la recuperation des workouts',
        e.message,
      );
      res.status(500).send(this._statusAPI.returnStatus());
    }
  }

  /** Met à jour un utilisateur USI
   * @param  {express.Request} req requête express
   * @param  {express.Response} res réponse express
   * @returns Promise<void>
   */
  update = async (req: express.Request, res: express.Response): Promise<void> => {
    try {
      const { _id } = req.params;
      this._ajv.validate({ objectId: true }, _id);
      const workout = this._ajv.validate<WorkoutModel>(
        VupdateWorkoutValidator,
        req.body,
      );

      const result = await this._workoutService.update(_id, workout);
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

  /** Supprime un utilisateur
   * @param  {express.Request} req requête express
   * @param  {express.Response} res réponse express
   * @returns Promise<void>
   */
  delete = async (req: express.Request, res: express.Response): Promise<void> => {
    try {
      const { _id } = req.params;
      this._ajv.validate({ objectId: true }, _id);
      const result = await this._workoutService.delete(_id);
      if (result === null) {
        throw new Error('NOTFOUND: This workout could not be found in the database');
      }
      res.send(result);
    } catch (e) {
      this._statusAPI.addMessage(
        'DELETE_WORKOUT_ERROR',
        'error',
        'An error appeared while deleting the account',
        e.message,
      );
      res.status(500).send(this._statusAPI.returnStatus());
    }
  };

  /** Récupère un workout par son id
   * @param  {express.Request} req requête express
   * @param  {express.Response} res réponse express
   * @returns void
   */
  findById = async (req: express.Request, res: express.Response): Promise<void> => {
    try {
      const { _id } = req.params;
      this._ajv.validate({ objectId: true }, _id);

      const result = await this._workoutService.findById(_id);
      res.send(result);
    } catch (e) {
      this._statusAPI.addMessage(
        'FINDBYID_WORKOUT_ERROR',
        'error',
        'Une erreur est survenue lors de la recuperation du workout',
        e,
      );
      res.status(500).send(this._statusAPI.returnStatus());
    }
  };

  /** Récupère un workout par son id
   * @param  {express.Request} req requête express
   * @param  {express.Response} res réponse express
   * @returns void
   */
   findByUserId = async (req: express.Request, res: express.Response): Promise<void> => {
     try {
       const { userId } = req.params;
       this._ajv.validate({ objectId: true }, userId);
       const result = await this._workoutService.findByUserId(userId);
       if (result === null) {
         throw new Error('NOTFOUND: This workout could not be found in the database');
       }
       res.send(result);
     } catch (e) {
       this._statusAPI.addMessage(
         'FINDBYID_WORKOUT_ERROR',
         'error',
         'Une erreur est survenue lors de la recuperation du workout',
         e,
       );
       res.status(500).send(this._statusAPI.returnStatus());
     }
   };

   /** Compte le nombre de documents correspondant aux «critères» dans la collection
  * @param  {express.Request} req requête express
  * @param  {express.Response} res réponse express
  * @returns Promise<void>
  */
 buildFilters = async (req: express.Request, res: express.Response, next: () => void): Promise<void> => {
   try {
     req.workouts = {
       match: this._workoutService.buildMatchQuery(req.query as KeyValueObject),
     };
     next();
   } catch (e) {
     this._statusAPI.addMessage(
       'COUNT_WORKOUT_ERROR',
       'error',
       'Une erreur est survenue lors de la recuperation du workout',
       e,
     );
     res.status(500).send(this._statusAPI.returnStatus());
   }
 }

  /** Compte le nombre de documents correspondant aux «critères» dans la collection
  * @param  {express.Request} req requête express
  * @param  {express.Response} res réponse express
  * @returns Promise<void>
  */
  count = async (req: express.Request, res: express.Response, next: () => void): Promise<void> => {
    const pipeline: unknown[] = [];
    if (Object.keys(req.workouts.match).length > 0) {
      pipeline.push({
        $match: req.workouts.match,
      });
    }
    pipeline.push({
      $count: 'count',
    });
    this._workoutService.aggregate(pipeline)
      .then((countResult) => {
        const [count] = countResult;
        req.workouts = {
          ...req.workouts,
          ...count,
        };
        if (!count) {
          req.workouts.count = 0;
        }
        next();
      });
  }
}

export = WorkoutController;
