import { Router } from 'express';
import { isAdmin, hasRights } from './auth/middleware';
import { login, register, updateRole, getAll, getOne, remove } from './controller';

const router = Router();

router.post('/login', login);

router.post('/register', register);

router.put('/:id', isAdmin, updateRole);

router.get('/', hasRights, getAll);

router.get('/:id', getOne);

router.delete('/:id', hasRights, remove);


export default router;