import express from 'express';
import accountController from '../../controllers/accountController';
import isAuth from '../../middleswares/is-Auth';
import checkPermission from '../../middleswares/checkPermission';

const { verifyTokendb } = isAuth;

const { permissionMiddleWareDb } = checkPermission;

const router = express.Router();

const { createBankAccountdb,fetchAllAccountsDb, getAccountDb } = accountController;
// user signup route
router.post('/accounts', verifyTokendb, createBankAccountdb);
router.get('/accounts', verifyTokendb, permissionMiddleWareDb, fetchAllAccountsDb);
router.get('/accounts/:accountNumber', verifyTokendb, permissionMiddleWareDb, getAccountDb);


// expose router
export default router;
