import {Router} from 'express';

import customerRoutes from './customer';
import departmentRoutes from './department';
import categoryRoutes from './category';
import productRoutes from './product';
import attributeRoutes from './attributes';
import cartRoutes from './cart';

const router = Router ();
router.use ('/customers', customerRoutes);
router.use ('/departments', departmentRoutes);
router.use ('/categories', categoryRoutes);
router.use ('/products', productRoutes);
router.use ('/attributes', attributeRoutes);
router.use ('/shoppingcart', cartRoutes);

export default router;
