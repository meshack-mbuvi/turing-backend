import {Router} from 'express';
import {DepartmentController} from '../controllers';
const router = Router ();

router.get ('/', DepartmentController.all);
router.get ('/:department_id', DepartmentController.one);

export default router;
