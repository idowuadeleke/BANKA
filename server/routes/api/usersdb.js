import express from 'express';
import userController from '../../controllers/userController';
import validateInput from '../../middleswares/validation/cashierInput';

const router = express.Router();

const { signinDb, createAccountDb } = userController;
const { validateSignUpInput , validatesignInInput} = validateInput;

// db user signup route
router.post('/signup', validateSignUpInput, createAccountDb);

// db user signin route
router.post('/signin', validatesignInInput,  signinDb);

// expose router
export default router;
