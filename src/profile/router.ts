import { Router } from 'express';
import { createProfile, getProfile, removeProfile, updateProfile } from './controller';

const router = Router();

router.post('/:id', createProfile);
router.get('/:id', getProfile);
router.put('/:id', updateProfile);
router.delete('/:id', removeProfile);

export default router;