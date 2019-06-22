import {Router} from 'express';
import {CategoryController} from '../controllers';
import {handlePaginationErrors} from '../middleware/pagination';

const router = Router ();

router.get ('/', handlePaginationErrors, CategoryController.all);
router.get ('/:category_id', CategoryController.one);
router.get (
  '/inDepartment/:department_id',
  handlePaginationErrors,
  CategoryController.categoryInDepartment
);

export default router;
