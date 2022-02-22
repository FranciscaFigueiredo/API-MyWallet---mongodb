import { Router } from 'express';
import * as financeController from '../controllers/financeController.js';
import { auth } from '../middlewares/auth.js';
import { financialEventsValidation } from '../middlewares/financialEventsValidationMiddleware.js';

const router = new Router();

router.use(auth);
router.post('/new-transition', financialEventsValidation, financeController.postFinancialEvents);
router.get('/', financeController.getFinancialEvents);
router.delete('/event/:id', financeController.deleteFinancialEvent);
router.get('/event/:id', financeController.getFinancialEventData);
router.put('/event/:id', financeController.updateFinancialEvent);

export default router;
