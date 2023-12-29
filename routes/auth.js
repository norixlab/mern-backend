import { Router } from 'express';
import * as UserController from '../controllers/UserController.js';
import { registerValidation, loginValidation } from '../validations/userValidations.js';
import checkAuth from '../utils/checkAuth.js';
import handleValidationErrors from '../utils/handleValidationErrors.js';
const route = new Router();

route.post('/register', registerValidation, handleValidationErrors, UserController.register);
route.post('/login', loginValidation, handleValidationErrors, UserController.login);
route.get('/me', checkAuth, UserController.getMe);

export default route;
