import { Router } from 'express';
import { ClientsController } from '../controllers/clients.controller';
import authMiddleware from '../middlewares/auth.middleware';

const router = Router();

router.use(authMiddleware);

router.get('/clients', ClientsController.listarTodos);
router.post('/clients', ClientsController.criar);
router.delete('/clients/:id', ClientsController.deletar);

export default router;