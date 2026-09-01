import { Router } from "express";
import { validateGetRecipes, validatePostRecipe, validatePutRecipe } from "./validates.js";
import { getRecipes, getRecipe, postRecipe, putRecipe, deleteRecipe } from "./controllers.js";

export const recipesRouter: Router = Router();

recipesRouter.get('/', validateGetRecipes, getRecipes);
recipesRouter.get('/:id', getRecipe);
recipesRouter.post('/', validatePostRecipe, postRecipe);
recipesRouter.put('/:id', validatePutRecipe, putRecipe);
recipesRouter.delete('/:id', deleteRecipe);
