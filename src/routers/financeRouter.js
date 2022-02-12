import { Router } from 'express';
import * as financeController from '../controllers/financeController.js';
import { auth } from '../middlewares/auth.js';
import { financialEventsValidation } from '../middlewares/financialEventsValidationMiddleware.js';

const router = new Router();

router.use(auth);
router.post('/new-transition', financialEventsValidation, auth, financeController.postFinancialEvents);
router.get('/', auth, financeController.getFinancialEvents);
router.delete('/event/:id', auth, financeController.deleteFinancialEvent);
router.get('/event/:id', auth, financeController.getFinancialEventData);
router.put('/event/:id', auth, financeController.updateFinancialEvent);

export default router;
