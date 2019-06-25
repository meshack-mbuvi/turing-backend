import { ReviewController } from '../controllers';
import { Router } from 'express';
const router = Router();

router.get('/', ReviewController.all);

export default router;
