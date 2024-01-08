import express from 'express';
import { AuthController } from '../controllers/auth.controller.js';

const router = express.Router();

const authController = new AuthController();

router.post('/auth/signup', authController.signup);
router.post('/auth/signin', authController.signin);

export { router as AuthRouter };
