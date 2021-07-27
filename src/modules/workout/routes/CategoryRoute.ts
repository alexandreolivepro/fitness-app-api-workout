import express, { Express } from 'express';
import AuthService from '../../../helpers/lib/authentication/services/AuthService';

import CategoryController from '../controllers/CategoryController';

const router = express.Router();

class WorkoutRoutes {
  private _categoryController: CategoryController;

  constructor() {
    this._categoryController = new CategoryController();
  }

  get routes(): express.Router {
    const categoryController = this._categoryController;

    router.get(
      '/category',
      AuthService.authenticate,
      categoryController.retrieve,
    );

    router.post(
      '/category',
      AuthService.authenticate,
      categoryController.create,
    );

    return router;
  }
}

Object.seal(WorkoutRoutes);
export = WorkoutRoutes;
