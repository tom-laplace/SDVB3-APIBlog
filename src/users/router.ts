import { Router } from 'express';
import { login, register, updateRole, getAll, getOne, remove } from './controller';

const router = Router();

router.post('/login', login);

router.post('/register', register);

router.put('/:id', updateRole);

router.get('/', getAll);

router.get('/:id', getOne);

router.delete('/:id', remove);


export default router;