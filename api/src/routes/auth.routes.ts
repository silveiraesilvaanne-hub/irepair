import { Router } from 'express';
import { AuthController } from '../controllers/auth.controller';
import authMiddleware from '../middlewares/auth.middleware';

const router = Router();

router.post('/auth/register', AuthController.register);
router.post('/auth/login', AuthController.login);
router.post('/auth/logout', AuthController.logout);
router.get('/auth/me', authMiddleware, AuthController.me);

export default router;