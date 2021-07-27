import express from 'express';
import StatusAPI from '../../../helpers/status/StatusAPI';
import CategoryModel from '../models/CategoryModel';

// Services
import CategoryService from '../services/CategoryService';

class CategoryController {
  private _categoryService: CategoryService;

  private _statusAPI = new StatusAPI();

  constructor() {
    this._categoryService = new CategoryService();
    this._statusAPI = new StatusAPI();
  }

  /** Create an exercice
   * @param  {express.Request} req requête express
   * @param  {express.Response} res réponse express
   * @returns Promise<void>
   */
   create = async (req: express.Request, res: express.Response): Promise<void> => {
     try {
       const result = await this._categoryService.create(req.body as CategoryModel);
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

  /** Récupère la liste des category
  * @param  {express.Request} req requête express
  * @param  {express.Response} res réponse express
  * @returns Promise<void>
  */
  retrieve = async (req: express.Request, res: express.Response): Promise<void> => {
    try {
      const pipeline: unknown[] = [
        { $sort: { name: 1 } },
      ];

      const data = await this._categoryService.aggregate(pipeline);
      res.send({ data });
    } catch (e) {
      this._statusAPI.addMessage(
        'RETIEVE_CATEGORY_ERROR',
        'error',
        'Une erreur est survenue lors de la recuperation des categories',
        e.message,
      );
      res.status(500).send(this._statusAPI.returnStatus());
    }
  }
}

export = CategoryController;
