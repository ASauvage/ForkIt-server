import { Router } from 'express';
import { getHealthcheck } from './controllers.js';

export const healthcheckRouter: Router = Router();

healthcheckRouter.get('/', getHealthcheck);
