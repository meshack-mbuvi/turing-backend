import {Router} from 'express';
import {CustomerController} from '../controllers/customer';
const router = Router ();

router.post ('/', CustomerController.create);
router.post ('/login', CustomerController.login);

export default router;
