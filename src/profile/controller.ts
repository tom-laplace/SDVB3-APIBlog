// Controller for the profile page

import { Request, Response } from 'express';
import Profile from './model';

export const createProfile = async (req: Request, res: Response) => {
    const { username, bio } = req.body;
    const { id } = req.params;

    const profile = await Profile.create({
        username,
        bio,
        user: id,
    });

    return res.status(200).json(profile);
}

export const updateProfile = async (req: Request, res: Response) => {
    const { username, bio, avatar } = req.body;
    const { id } = req.params;

    const profile = await Profile.findOne({ user: id });

    if (!profile) {
        return res.status(400).json({ message: 'Profile not found' });
    }

    profile.username = username;
    profile.bio = bio;
    profile.avatar = avatar;

    await profile.save();

    return res.status(200).json(profile);
}

export const getProfile = async (req: Request, res: Response) => {
    const { id } = req.params;

    const profile = await Profile.findOne({ user: id });

    if (!profile) {
        return res.status(400).json({ message: 'Profile not found' });
    }

    return res.status(200).json(profile);
}

export const removeProfile = async (req: Request, res: Response) => {
    const { id } = req.params;

    const profile = await Profile.findOne({ user: id });

    if (!profile) {
        return res.status(400).json({ message: 'Profile not found' });
    }

    await profile.remove();

    return res.status(200).json({ message: 'Profile removed' });
}

export const getProfileFromUser = async (req: Request, res: Response) => {
    const { id } = req.params;

    const profile = await Profile.findOne({ user: id });

    if (!profile) {
        return res.status(400).json({ message: 'Profile not found' });
    }

    return res.status(200).json(profile);
}

export default {
    createProfile,
    updateProfile,
    getProfile,
    removeProfile,
    getProfileFromUser,
};
