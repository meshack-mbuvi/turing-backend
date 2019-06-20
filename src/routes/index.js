import {Router} from 'express';

import customerRoutes from './customer';
import departmentRoutes from './department';

const router = Router ();
router.use ('/customers', customerRoutes);
router.use ('/departments', departmentRoutes);

export default router;
