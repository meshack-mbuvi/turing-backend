import { AttributeController, AttributeValueController } from '../controllers';

import { Router } from 'express';

const router = Router();

router.get('/', AttributeController.all);
router.get('/:attribute_id', AttributeController.one);
router.get('/values/:attribute_id', AttributeValueController.all);
router.get('/inProduct/:product_id', AttributeController.attributesInProduct);

export default router;
