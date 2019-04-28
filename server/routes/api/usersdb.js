import express from 'express';
import userController from '../../controllers/userController';
import validateInput from '../../middleswares/validation/validator';
import Auth from '../../middleswares/is-Auth';

const { trimmer } = Auth;

const router = express.Router();

const { signinDb, createAccountDb } = userController;
const { validateSignUpInput, validatesignInInput } = validateInput;

// db user signup route
router.post('/signup', trimmer, validateSignUpInput, createAccountDb);

// db user signin route
router.post('/signin', trimmer, validatesignInInput, signinDb);


// expose router
export default router;
