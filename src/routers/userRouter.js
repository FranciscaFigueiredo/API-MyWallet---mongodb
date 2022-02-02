import { Router } from 'express';
import * as userController from '../controllers/userController.js';

const router = new Router();

router.post('/sign-up', userController.signUp);

export default router;
