import { CategoryController } from '../controllers';
import { Router } from 'express';
import { handlePaginationErrors } from '../middleware/index';

const router = Router();

router.get('/', handlePaginationErrors, CategoryController.all);
router.get('/:category_id', CategoryController.one);
router.get(
 '/inDepartment/:department_id',
 handlePaginationErrors,
 CategoryController.categoryInDepartment
);

export default router;
