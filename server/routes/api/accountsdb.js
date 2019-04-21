import express from 'express';
import accountController from '../../controllers/accountController';
import isAuth from '../../middleswares/is-Auth';
import checkPermission from '../../middleswares/checkPermission';

const { verifyTokendb } = isAuth;

const { permissionMiddleWareDb } = checkPermission;

const router = express.Router();

const {
  createBankAccountdb, fetchAllAccountsDb, getAccountDb, changeStatusDb, deleteBankAccountDb,
  getSpecificUserAccount } = accountController;

// user signup route
router.post('/accounts', verifyTokendb, createBankAccountdb);
router.get('/accounts', verifyTokendb, permissionMiddleWareDb, fetchAllAccountsDb);
router.get('/accounts/:accountNumber', verifyTokendb, permissionMiddleWareDb, getAccountDb);
router.patch('/accounts/:accountNumber', verifyTokendb, permissionMiddleWareDb, changeStatusDb);
router.delete('/accounts/:accountNumber', verifyTokendb, permissionMiddleWareDb, deleteBankAccountDb);
router.get('/user/:email/accounts', verifyTokendb, permissionMiddleWareDb,  getSpecificUserAccount);


// expose router
export default router;
