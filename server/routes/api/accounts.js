import express from 'express';
import accountController from '../../controllers/accountController';
import isAuth from '../../middleswares/is-Auth';
import checkPermission from '../../middleswares/checkPermission';

const { verifyToken } = isAuth;

const { permissionMiddleWare } = checkPermission;

const router = express.Router();

const { createBankAccount, fetchAllAccounts, getAccount, changeStatus, deleteBankAccount } = accountController;
// user signup route
router.post('/accounts', verifyToken, createBankAccount);
router.get('/accounts', verifyToken, permissionMiddleWare, fetchAllAccounts);
router.get('/accounts/:accountNumber', verifyToken, permissionMiddleWare, getAccount);
router.patch('/accounts/:accountNumber', verifyToken, permissionMiddleWare, changeStatus);
// router.delete('/accounts/:accountNumber', verifyToken, permissionMiddleWare, deleteBankAccount);


// expose router
export default router;
