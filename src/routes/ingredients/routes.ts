import { Router } from 'express';
import { validateGetIngredients, validatePostIngredient, validatePutIngredient } from './validates.js';
import { getIngredients, getIngredient, postIngredient, putIngredient, deleteIngredient } from './controllers.js';

export const ingredientsRouter: Router = Router();

ingredientsRouter.get('/', validateGetIngredients, getIngredients);
ingredientsRouter.get('/:id', getIngredient);
ingredientsRouter.post('/', validatePostIngredient, postIngredient);
ingredientsRouter.put('/:id', validatePutIngredient, putIngredient);
ingredientsRouter.delete('/:id', deleteIngredient);
