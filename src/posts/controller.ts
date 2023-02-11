// controller for blog posts
// get all, get one, create, update, delete, get all by user

import { Request, Response } from 'express';
import Post from './model';
import  Profile  from '../profile/model/profileModel';

// controller get all blog posts
export const getAll = async (req: Request, res: Response) => {
    const { page, limit } = req.query;

    const posts = await Post.find().skip((Number(page) - 1) * Number(limit)).limit(Number(limit));


    return res.status(200).json(posts);
}

// controller get one blog post
export const getOne = async (req: Request, res: Response) => {
    const { id } = req.params;

    const post = await Post.findOne({ id: id });

    if (!post) {
        return res.status(400).json({ message: 'Post not found' });
    }

    return res.status(200).json(post);

}

// controller create a new blog post
export const create = async (req: Request, res: Response) => {
    const { title, content, profile } = req.body;

    // check if user exists
    const profil_to_check = await Profile.findById(profile);

    if (!profil_to_check) {
        return res.status(400).json({ message: 'Profile not found' });
    }

    // create new post
    const newPost = await Post.create({ title, content, profile });

    // return post
    return res.status(201).json(newPost);
}

// controller update a blog post
export const update = async (req: Request, res: Response) => {
    const { id } = req.params;

    const post = await Post.findOne({ id: id });

    if (!post) {
        return res.status(400).json({ message: 'Post not found' });
    }

    const { title, content, profile } = req.body;

    // check if user exists
    const profil_to_check = await Profile.findOne({ id: profile });

    if (!profil_to_check) {
        return res.status(400).json({ message: 'User not found' });
    }

    // update post
    post.title = title;
    post.content = content;

    await post.save();

    // return post
    return res.status(200).json(post);
}

// controller delete a blog post
export const remove = async (req: Request, res: Response) => {
     const { id } = req.params;

    const post = await Post.findOne({ id: id });

    if (!post) {
        return res.status(400).json({ message: 'Post not found' });
    }

    await post.remove();
    
    return res.status(200).json({ message: 'Post deleted' });
}

// controller get all blog posts by user
export const getAllByProfile = async (req: Request, res: Response) => {
    const { id } = req.params;

    const profile = Profile.findOne({ id: id });

    if (!profile) {
        return res.status(400).json({ message: 'User not found' });
    }

    const posts = await Post.find({ profile: id });

    return res.status(200).json(posts);
}
