import { Router } from 'express';
import * as PostController from '../controllers/PostController.js';
import { postValidation } from '../validations/postValidations.js';
import handleValidationErrors from '../utils/handleValidationErrors.js';
import checkAuth from '../utils/checkAuth.js';
const route = new Router();

route.post('/create', checkAuth, postValidation, handleValidationErrors, PostController.create);
route.get('/', PostController.getAll);
route.get('/:id', PostController.getOne);
route.delete('/:id', checkAuth, PostController.remove);
route.patch('/:id', checkAuth, postValidation, handleValidationErrors, PostController.update);

export default route;
