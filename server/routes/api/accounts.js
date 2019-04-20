import express from 'express';
import accountController from '../../controllers/accountController';
import isAuth from '../../middleswares/is-Auth';
import checkPermission from '../../middleswares/checkPermission';

const { verifyToken } = isAuth;

const { permissionMiddleWare } = checkPermission;

const router = express.Router();

const {
 deleteBankAccount,
} = accountController;
// user signup route
router.delete('/accounts/:accountNumber', verifyToken, permissionMiddleWare, deleteBankAccount);


// expose router
export default router;
