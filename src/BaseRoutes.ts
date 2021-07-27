import express from 'express';
import WorkoutRoute from './modules/workout/routes/WorkoutRoute';
import Constants from './config/constants/Constants';
import ExerciceRoute from './modules/workout/routes/ExerciceRoute';
import CategoryRoute from './modules/workout/routes/CategoryRoute';

const app = express();

class BaseRoutes {
  private _workoutsRoute: WorkoutRoute;

  private _exerciceRoute: ExerciceRoute;

  private _categoryRoute: CategoryRoute;

  constructor() {
    this._workoutsRoute = new WorkoutRoute();
    this._exerciceRoute = new ExerciceRoute();
    this._categoryRoute = new CategoryRoute();
  }

  get routes(): express.Express {
    const v1 = Constants.BASE_PATH;

    app.use(v1, this._workoutsRoute.routes);
    app.use(v1, this._exerciceRoute.routes);
    app.use(v1, this._categoryRoute.routes);

    return app;
  }
}
export = BaseRoutes;
