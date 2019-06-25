import { addTocart, cart } from '../middleware/index';

import { CartController } from '../controllers';
import { Router } from 'express';

const router = Router();

router.get('/generateUniqueId', CartController.generateUniqueCartId);
router.post('/add', addTocart, CartController.add);
router.get('/:cart_id', CartController.getCart);
router.put('/update/:item_id', cart, CartController.update);
router.delete('/empty/:cart_id', CartController.empty);
router.get('/totalAmount/:cart_id', CartController.totalAmount);
router.delete('/removeProduct/:item_id', CartController.deleteItem);

export default router;
