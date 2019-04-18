import express from 'express';
import userController from '../../controllers/userController';

const router = express.Router();

const { loginDb, createAccountDb } = userController;

// db user signup route
router.post('/signup', createAccountDb);

// db user login route 
router.post('/login', loginDb);

// expose router
export default router;
