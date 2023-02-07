import { Router } from 'express';
import { createProfile, getProfile, removeProfile, updateProfile, getProfileFromUser } from './controller';

const router = Router();

router.post('/', createProfile);
router.get('/:id', getProfile);
router.put('/:id', updateProfile);
router.delete('/:id', removeProfile);
router.get('/user/:id', getProfileFromUser);

export default router;