import express from 'express';
import transactionController from '../../controllers/transactionController';
import isAuth from '../../middleswares/is-Auth';
import checkPermission from '../../middleswares/checkPermission';

const { verifyTokendb } = isAuth;

const { permissionMiddleWareDb } = checkPermission;

const router = express.Router();

const { debitUserAccountDb, creditUserAccountDb } = transactionController;

router.post('/transactions/:accountNumber/debit', verifyTokendb, permissionMiddleWareDb, debitUserAccountDb);
router.post('/transactions/:accountNumber/credit', verifyTokendb, permissionMiddleWareDb, creditUserAccountDb);


// expose router
export default router;
