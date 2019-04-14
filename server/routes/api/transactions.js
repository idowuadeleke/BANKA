import express from 'express';
import transactionController from '../../controllers/transactionController';
import isAuth from '../../middleswares/is-Auth';
import checkPermission from '../../middleswares/checkPermission';

const { verifyToken } = isAuth;

const { permissionMiddleWare } = checkPermission;

const router = express.Router();

const { debitUserAccount, creditUserAccount } = transactionController;

router.post('/transactions/:accountNumber/debit', verifyToken, permissionMiddleWare, debitUserAccount);
// router.post('/transactions/:accountNumber/credit', verifyToken, permissionMiddleWare, creditUserAccount);


// expose router
export default router;
