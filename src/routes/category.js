import {Router} from 'express';
import {CategoryController} from '../controllers';
const router = Router ();

router.get ('/', CategoryController.all);
router.get ('/:category_id', CategoryController.one);
router.get (
  '/inDepartment/:department_id',
  CategoryController.categoryInDepartment
);

export default router;
