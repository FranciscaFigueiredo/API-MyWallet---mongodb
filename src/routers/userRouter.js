import { Router } from 'express';
import * as userController from '../controllers/userController.js';
import { auth } from '../middlewares/auth.js';

const router = new Router();

router.post('/sign-up', userController.signUp);
router.post('/login', userController.login);
router.get('/user', auth, userController.getUserInfo);
router.post('/logout', auth, userController.postLogout);

export default router;
