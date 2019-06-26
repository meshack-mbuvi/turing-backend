import { Router } from 'express';
import attributeRoutes from './attributes';
import cartRoutes from './cart';
import categoryRoutes from './category';
import customerRoutes from './customer';
import departmentRoutes from './department';
import orderRoutes from './order';
import productRoutes from './product';
import stripeRoutes from './stripe';

const router = Router();
router.use('/customers', customerRoutes);
router.use('/departments', departmentRoutes);
router.use('/categories', categoryRoutes);
router.use('/products', productRoutes);
router.use('/attributes', attributeRoutes);
router.use('/shoppingcart', cartRoutes);
router.use('/orders', orderRoutes);
router.use('/stripe', stripeRoutes);


export default router;
