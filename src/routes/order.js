import { OrderController } from '../controllers';
import { Router } from 'express';
import { authentication } from '../middleware/index';

const router = Router();

router.post('/', authentication, OrderController.create);
router.get('/:order_id', authentication, OrderController.one);
router.get('/inCustomer', authentication, OrderController.orderDetail);
router.get(
 '/shortDetail/:order_id',
 authentication,
 OrderController.orderDetail
);

export default router;
