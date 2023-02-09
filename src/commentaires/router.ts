import { Router } from 'express';
import { hasRights, isAdmin } from '../users/auth/middleware';
import { getAll, getOne, create, update, remove, getAllByUser, getAllByPost } from './controller';

const router = Router();

router.get('/', getAll);
router.get('/:id', getOne);
router.post('/', create);
router.put('/:id', hasRights, update);
router.delete('/:id', hasRights, remove);
router.get('/user/:id', isAdmin, getAllByUser);
router.get('/post/:id', getAllByPost);

export default router;