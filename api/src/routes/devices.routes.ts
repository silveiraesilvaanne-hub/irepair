import { Router } from 'express';
import { DevicesController } from '../controllers/devices.controller';
import authMiddleware from '../middlewares/auth.middleware';

const router = Router();

router.use(authMiddleware);

router.get('/devices', DevicesController.listarTodos);
router.post('/devices', DevicesController.criar);
router.delete('/devices/:id', DevicesController.deletar);

export default router;