import { Router } from 'express';
import { getAllProfilFromUser, createProfile, getProfileByID, getAll } from './controller';

const router = Router();

router.get('/user/:id', getAllProfilFromUser);

router.post("/", createProfile);

router.get("/", getAll);

router.get("/:id", getProfileByID);

export default router;