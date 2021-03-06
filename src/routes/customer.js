import { CustomerController } from '../controllers';
import { Router } from 'express';
import { authentication } from '../middleware/index';

const router = Router();

router.post('/', CustomerController.create);
router.put('/', authentication, CustomerController.update);
router.get('/', authentication, CustomerController.one);
router.post('/login', CustomerController.login);
router.put('/address', authentication, CustomerController.address);
router.put('/creditCard', authentication, CustomerController.creditCard);

export default router;
