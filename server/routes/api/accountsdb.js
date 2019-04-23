import express from 'express';
import accountController from '../../controllers/accountController';
import userController from '../../controllers/userController';
import isAuth from '../../middleswares/is-Auth';
import checkPermission from '../../middleswares/checkPermission';
import validateInput from '../../middleswares/validation/cashierInput';

const { verifyTokendb } = isAuth;

const { permissionMiddleWareDb } = checkPermission;

const router = express.Router();

const {
  createBankAccountdb, fetchAllAccountsDb, getAccountDb, changeStatusDb, deleteBankAccountDb,
  getSpecificUserAccount, getAccountTransactions,
} = accountController;

const { createAccountDb } = userController;
const { validateAccountInput, validateParam, validateEmail, validateUpdateStatus,validateAccountStatusInput} = validateInput;

// user signup route
router.post('/accounts', verifyTokendb,validateAccountInput, createBankAccountdb);
router.get('/accounts', verifyTokendb, permissionMiddleWareDb,validateAccountStatusInput, fetchAllAccountsDb);
router.get('/accounts/:accountNumber/transactions', verifyTokendb, permissionMiddleWareDb,validateParam, getAccountTransactions);
router.get('/accounts/:accountNumber', verifyTokendb, permissionMiddleWareDb,validateParam, getAccountDb);
router.patch('/accounts/:accountNumber', verifyTokendb, permissionMiddleWareDb,validateParam,validateUpdateStatus, changeStatusDb);
router.delete('/accounts/:accountNumber', verifyTokendb, permissionMiddleWareDb,validateParam, deleteBankAccountDb);
router.get('/user/:email/accounts', verifyTokendb, permissionMiddleWareDb,validateEmail, getSpecificUserAccount);
router.post('/user', verifyTokendb, permissionMiddleWareDb,validateAccountInput, createAccountDb);
// router.get('/user',verifyTokendb, permissionMiddleWareDb,getAllUsers);


// expose router
export default router;
