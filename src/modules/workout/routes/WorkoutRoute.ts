import express, { Express } from 'express';
import AuthService from '../../../helpers/lib/authentication/services/AuthService';

import WorkoutController from '../controllers/WorkoutController';

const router = express.Router();

class WorkoutRoutes {
  private _workoutController: WorkoutController;

  constructor() {
    this._workoutController = new WorkoutController();
  }

  get routes(): express.Router {
    const workoutController = this._workoutController;

    router.get(
      '/workout',
      AuthService.authenticate,
      workoutController.buildFilters,
      workoutController.count,
      workoutController.retrieve,
    );

    router.get(
      '/workout/:_id',
      AuthService.authenticate,
      workoutController.findById,
    );

    router.get(
      '/user/:userId/workout',
      AuthService.authenticate,
      workoutController.findByUserId,
    );

    router.post(
      '/workout',
      AuthService.authenticate,
      workoutController.create,
    );

    router.put(
      '/workout/:_id',
      AuthService.authenticate,
      workoutController.update,
    );

    router.delete(
      '/workout/:_id',
      AuthService.authenticate,
      workoutController.delete,
    );

    return router;
  }
}

Object.seal(WorkoutRoutes);
export = WorkoutRoutes;
