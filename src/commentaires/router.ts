import { Router } from 'express';
import { getAll, getOne, create, update, remove, getAllByUser, getAllByPost } from './controller';

const router = Router();

router.get('/', getAll);
router.get('/:id', getOne);
router.post('/', create);
router.put('/:id', update);
router.delete('/:id', remove);
router.get('/user/:id', getAllByUser);
router.get('/post/:id', getAllByPost);

export default router;