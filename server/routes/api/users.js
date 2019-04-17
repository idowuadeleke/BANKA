import express from 'express';
import userController from '../../controllers/userController';

const router = express.Router();

const { login } = userController;

router.post('/login', login);

// expose router
export default router;
