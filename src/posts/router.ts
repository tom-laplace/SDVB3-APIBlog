import { Router } from 'express';
import { getAll, getOne, create, update, remove, getAllByProfile } from './controller';

const router = Router();

router.get('/', getAll);
router.get('/:id', getOne);
router.post('/', create);
router.put('/:id', update);
router.delete('/:id', remove);
router.get('/profile/:id', getAllByProfile);

export default router;