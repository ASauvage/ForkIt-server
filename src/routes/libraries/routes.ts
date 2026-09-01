import { Router } from "express";
import { validateGetLibraries, validatePostLibrary, validatePutLibrary } from "./validates.js";
import { getLibraries, getLibrary, postLibrary, putLibrary, deleteLibrary } from "./controllers.js";
export const librariesRouter: Router = Router();

librariesRouter.get('/', validateGetLibraries, getLibraries);
librariesRouter.get('/:id', getLibrary);
librariesRouter.post('/', validatePostLibrary, postLibrary);
librariesRouter.put('/:id', validatePutLibrary, putLibrary);
librariesRouter.delete('/:id', deleteLibrary);
