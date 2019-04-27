import express from 'express';
import accountController from '../../controllers/accountController';
import userController from '../../controllers/userController';
import isAuth from '../../middleswares/is-Auth';
import checkPermission from '../../middleswares/checkPermission';
import validateInput from '../../middleswares/validation/validator';

const { verifyTokendb } = isAuth;

const { permissionMiddleWareDb } = checkPermission;

const router = express.Router();

const {
  createBankAccountdb, fetchAllAccountsDb, getAccountDb, changeStatusDb, deleteBankAccountDb,
  getSpecificUserAccount, getAccountTransactions,
} = accountController;

const { createAccountDb, resetPassword } = userController;
const {
  validateSignUpInput,
  validateAccountInput,
  validateParam,
  validateEmail,
  validateUpdateStatus,
  validateAccountStatusInput,
  validateResetPassword,
} = validateInput;

// user signup route
router.post('/accounts',
  verifyTokendb,
  validateAccountInput,
  createBankAccountdb);

router.get('/accounts',
  verifyTokendb,
  validateAccountStatusInput,
  permissionMiddleWareDb,
  fetchAllAccountsDb);

router.get('/accounts/:accountNumber/transactions',
  verifyTokendb,
  validateParam,
  permissionMiddleWareDb,
  getAccountTransactions);

router.get('/accounts/:accountNumber',
  verifyTokendb,
  validateParam,
  permissionMiddleWareDb,
  getAccountDb);

router.patch('/accounts/:accountNumber',
  verifyTokendb,
  validateParam,
  validateUpdateStatus,
  permissionMiddleWareDb,
  changeStatusDb);

router.delete('/accounts/:accountNumber',
  verifyTokendb,
  validateParam,
  permissionMiddleWareDb,
  deleteBankAccountDb);

router.get('/user/:email/accounts',
  verifyTokendb,
  validateEmail,
  permissionMiddleWareDb,
  getSpecificUserAccount);

router.post('/user',
  verifyTokendb,
  validateSignUpInput,
  permissionMiddleWareDb,
  createAccountDb);

router.post('/user/resetPassword',
  verifyTokendb,
  validateResetPassword,
  resetPassword);
// router.get('/user',verifyTokendb, permissionMiddleWareDb,getAllUsers);

// expose router
export default router;
