import { Router } from 'express';
import { getAll, getOne, create, update, remove, getAllByProfile, getAllByPost } from './controller';

const router = Router();

router.get('/', getAll);
router.get('/:id', getOne);
router.post('/', create);
router.put('/:id', update);
router.delete('/:id', remove);
router.get('/user/:id', getAllByProfile);
router.get('/post/:id', getAllByPost);

export default router;