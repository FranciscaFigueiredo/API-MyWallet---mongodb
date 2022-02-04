import { Router } from 'express';
import * as financeController from '../controllers/financeController.js';
import { auth } from '../middlewares/auth.js';

const router = new Router();

router.use(auth);
router.post('/new-transition', financeController.postFinancialEvents);

export default router;
