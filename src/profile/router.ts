import { Router } from 'express';
import { getAllProfilFromUser, createProfile } from './controller';

const router = Router();

router.get('/user/:id', getAllProfilFromUser);

router.post("/", createProfile);

// @route   GET /
router.get("/", (req, res) => {});

// @route   GET /:id
router.get("/:id", (req, res) => {});

// @route   GET /:id/posts
router.get("/:id/posts", (req, res) => {});

// @route   GET /:id/comments
router.get("/:id/comments", (req, res) => {});

export default router;