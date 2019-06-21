import {Router} from 'express';
import {ReviewController} from '../controllers';
const router = Router ();

router.get ('/', ReviewController.all);

export default router;
