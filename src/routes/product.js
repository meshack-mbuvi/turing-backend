import {Router} from 'express';
import {ProductController, ReviewController} from '../controllers';

import {handlePaginationErrors, authentication} from '../middleware/index';

const router = Router ();

router.get ('/', handlePaginationErrors, ProductController.all);
router.get ('/search', handlePaginationErrors, ProductController.search);
router.get ('/:product_id', ProductController.one);
router.get (
  '/inCategory/:category_id',
  handlePaginationErrors,
  ProductController.productInCategory
);
router.get (
  '/inDepartment/:department_id',
  handlePaginationErrors,
  ProductController.productInDepartment
);
router.get ('/:product_id/locations', ProductController.productLocation);

router.get ('/:product_id/reviews', ReviewController.all);
router.post ('/:product_id/reviews', authentication, ReviewController.create);

export default router;
