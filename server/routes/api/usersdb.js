import express from 'express';
import userController from '../../controllers/userController';

const router = express.Router();

const { signinDb, createAccountDb } = userController;

// db user signup route
router.post('/signup', createAccountDb);

// db user signin route
router.post('/signin', signinDb);

// expose router
export default router;
