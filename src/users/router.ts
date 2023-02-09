import { Router } from 'express';
import { verifyToken, isAdmin } from './auth/middleware';
import { login, register, updateRole, getAll, getOne, remove } from './controller';

const router = Router();

router.post('/login', login);

router.post('/register', register);

router.put('/:id', verifyToken, isAdmin, updateRole);

router.get('/', getAll);

router.get('/:id', getOne);

router.delete('/:id', remove);


export default router;