import express from 'express';
import transactionController from '../../controllers/transactionController';
import isAuth from '../../middleswares/is-Auth';
import checkPermission from '../../middleswares/checkPermission';
import validateInput from '../../middleswares/validation/cashierInput';

const { verifyTokendb } = isAuth;

const { permissionMiddleWareDb } = checkPermission;

const { validateCashierInput,validateParam } = validateInput;

const router = express.Router();

const { debitUserAccountDb, creditUserAccountDb, getSpecificTransaction } = transactionController;

router.post('/transactions/:accountNumber/debit', verifyTokendb, permissionMiddleWareDb,validateParam, validateCashierInput, debitUserAccountDb);
router.post('/transactions/:accountNumber/credit', verifyTokendb, permissionMiddleWareDb,validateParam,validateCashierInput, creditUserAccountDb);
router.get('/transactions/:transactionId', verifyTokendb, permissionMiddleWareDb,validateParam, getSpecificTransaction);


// expose router
export default router;
