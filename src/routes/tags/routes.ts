import { Router } from 'express';
import { validateGetTags, validatePostTag, validatePutTag } from './validates.js';
import { getTags, getTag, postTag, putTag, deleteTag } from './controllers.js';


export const tagsRouter: Router = Router();

tagsRouter.get('/', validateGetTags, getTags);
tagsRouter.get('/:id', getTag);
tagsRouter.post('/', validatePostTag, postTag);
tagsRouter.put('/:id', validatePutTag, putTag);
tagsRouter.delete('/:id', deleteTag);
