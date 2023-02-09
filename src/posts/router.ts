import { Router } from 'express';
import { getAll, getOne, create, update, remove, getAllByUser } from './controller';
import { verifyToken } from '../users/auth/middleware';

const router = Router();

router.get('/', getAll);
router.get('/:id', getOne);
router.post('/', create);
router.put('/:id', update);
router.delete('/:id', remove);
router.get('/user/:id', getAllByUser);

export default router;