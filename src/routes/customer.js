import { CustomerController } from '../controllers';
import { Router } from 'express';
const router = Router();

router.post('/', CustomerController.create);
router.post('/login', CustomerController.login);

export default router;
