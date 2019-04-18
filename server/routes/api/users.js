import express from 'express';
import userController from '../../controllers/userController';

const router = express.Router();

const { signin } = userController;

router.post('/signin', signin);

// expose router
export default router;
