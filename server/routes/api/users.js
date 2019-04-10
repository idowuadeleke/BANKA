import express from 'express';
import userController from '../../controllers/userController';

const router = express.Router();

const { createAccount, login } = userController;
// user signup route
router.post('/signup', createAccount);

router.post('/login', login);

// expose router
export default router;
