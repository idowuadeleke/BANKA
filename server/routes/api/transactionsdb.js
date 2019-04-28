import express from 'express';
import transactionController from '../../controllers/transactionController';
import isAuth from '../../middleswares/is-Auth';
import checkPermission from '../../middleswares/checkPermission';
import validateInput from '../../middleswares/validation/validator';

const { verifyTokendb } = isAuth;

const { permissionMiddleWareDb } = checkPermission;

const { validateCashierInput, validateParam, validateTransParam } = validateInput;

const router = express.Router();

const { debitUserAccountDb, creditUserAccountDb, getSpecificTransaction } = transactionController;

router.post('/transactions/:accountNumber/debit',
  verifyTokendb,
  validateParam,
  validateCashierInput,
  permissionMiddleWareDb,
  debitUserAccountDb);

router.post('/transactions/:accountNumber/credit',
  verifyTokendb,
  validateParam,
  validateCashierInput,
  permissionMiddleWareDb,
  creditUserAccountDb);

router.get('/transactions/:transactionId',
  verifyTokendb,
  validateTransParam,
  permissionMiddleWareDb,
  getSpecificTransaction);


// expose router
export default router;
