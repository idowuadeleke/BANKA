import express from 'express';
import userController from '../../controllers/userController';

const router = express.Router();

const { createAccountDb } = userController;

// db user signup route
router.post('/signup', createAccountDb);

// expose router
export default router;


