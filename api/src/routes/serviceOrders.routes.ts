import { Router } from 'express';
import { ServiceOrdersController } from '../controllers/serviceOrders.controller';
import authMiddleware from '../middlewares/auth.middleware';

const router = Router();

router.use(authMiddleware);

router.get('/service-orders', ServiceOrdersController.listarTodos);
router.post('/service-orders', ServiceOrdersController.criar);
router.put('/service-orders/:id', ServiceOrdersController.atualizarStatus);
router.delete('/service-orders/:id', ServiceOrdersController.deletar);

export default router;