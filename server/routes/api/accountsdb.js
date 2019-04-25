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
  permissionMiddleWareDb,
  validateAccountStatusInput,
  fetchAllAccountsDb);

router.get('/accounts/:accountNumber/transactions',
  verifyTokendb,
  permissionMiddleWareDb,
  validateParam,
  getAccountTransactions);

router.get('/accounts/:accountNumber',
  verifyTokendb,
  permissionMiddleWareDb,
  validateParam,
  getAccountDb);

router.patch('/accounts/:accountNumber',
  verifyTokendb,
  permissionMiddleWareDb,
  validateParam,
  validateUpdateStatus,
  changeStatusDb);

router.delete('/accounts/:accountNumber',
  verifyTokendb,
  permissionMiddleWareDb,
  validateParam,
  deleteBankAccountDb);

router.get('/user/:email/accounts',
  verifyTokendb,
  permissionMiddleWareDb,
  validateEmail,
  getSpecificUserAccount);

router.post('/user',
  verifyTokendb,
  permissionMiddleWareDb,
  validateSignUpInput,
  createAccountDb);

router.post('/user/resetPassword',
  verifyTokendb,
  validateResetPassword,
  resetPassword);
// router.get('/user',verifyTokendb, permissionMiddleWareDb,getAllUsers);


// expose router
export default router;
