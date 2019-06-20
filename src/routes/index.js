import {Router} from 'express';

import customerRoutes from './customer';

const router = Router ();
router.use ('/customers', customerRoutes);

export default router;
