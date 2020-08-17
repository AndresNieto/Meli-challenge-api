import {Router} from 'express'
import ItemController from '../controller/ItemController';

const router = Router();

router.get('', ItemController.getItemsList);
router.get('/:id', ItemController.getItemById);

export default router;