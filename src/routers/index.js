import { Router } from 'express';
import userRouter from './userRouter.js';
import financeRouter from './financeRouter.js';

const router = new Router();

router.use(userRouter);
router.use(financeRouter);

export default router;
