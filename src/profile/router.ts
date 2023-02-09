import { Router } from 'express';
import { hasRights } from 'src/users/auth/middleware';
import { createProfile, getProfile, removeProfile, updateProfile } from './controller';

const router = Router();

router.post('/:id', createProfile);
router.get('/:id', getProfile);
router.put('/:id', hasRights, updateProfile);
router.delete('/:id', hasRights, removeProfile);

export default router;