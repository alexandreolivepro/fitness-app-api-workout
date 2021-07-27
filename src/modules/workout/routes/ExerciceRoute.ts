import express, { Express } from 'express';
import AuthService from '../../../helpers/lib/authentication/services/AuthService';

import ExerciceController from '../controllers/ExerciceControler';

const router = express.Router();

class WorkoutRoutes {
  private _exerciceController: ExerciceController;

  constructor() {
    this._exerciceController = new ExerciceController();
  }

  get routes(): express.Router {
    const exerciceController = this._exerciceController;

    router.get(
      '/exercice',
      AuthService.authenticate,
      exerciceController.buildFilters,
      exerciceController.count,
      exerciceController.retrieve,
    );

    router.get(
      '/exercice/:_id',
      AuthService.authenticate,
      exerciceController.findById,
    );

    router.get(
      '/workout/:workoutId/exercice',
      AuthService.authenticate,
      exerciceController.findByWorkoutId,
    );

    router.post(
      '/exercice',
      AuthService.authenticate,
      exerciceController.create,
    );

    router.put(
      '/exercice/:_id',
      AuthService.authenticate,
      exerciceController.update,
    );

    router.delete(
      '/exercice/:_id',
      AuthService.authenticate,
      exerciceController.delete,
    );

    return router;
  }
}

Object.seal(WorkoutRoutes);
export = WorkoutRoutes;
