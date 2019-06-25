import { DepartmentController } from '../controllers';
import { Router } from 'express';
const router = Router();

router.get('/', DepartmentController.all);
router.get('/:department_id', DepartmentController.one);

export default router;
