import {Router} from 'express';

import customerRoutes from './customer';
import departmentRoutes from './department';
import categoryRoutes from './category';

const router = Router ();
router.use ('/customers', customerRoutes);
router.use ('/departments', departmentRoutes);
router.use ('/categories', categoryRoutes);

export default router;
