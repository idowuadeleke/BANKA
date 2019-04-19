import express from 'express';
import accountController from '../../controllers/accountController';
import isAuth from '../../middleswares/is-Auth';
import checkPermission from '../../middleswares/checkPermission';

const { verifyTokendb } = isAuth;

const { permissionMiddleWare } = checkPermission;

const router = express.Router();

const { createBankAccountdb } = accountController;
// user signup route
router.post('/accounts', verifyTokendb, createBankAccountdb);


// expose router
export default router;
