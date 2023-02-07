// route de login et de register

import { Router } from 'express';
import { login, register, updateRole, getAll, getOne, remove, getProfile } from './controller';

const router = Router();

router.post('/login', login);

router.post('/register', register);

router.put('/:id', updateRole);

router.get('/', getAll);

router.get('/:id', getOne);

router.delete('/:id', remove);

router.get('/profile', getProfile);

export default router;