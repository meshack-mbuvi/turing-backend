import { Router } from 'express';
import { StripController } from '../controllers';
const router = Router();

router.post('/charge', StripController.charge);

export default router;
