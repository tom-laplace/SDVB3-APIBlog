// controller for blog posts
// get all, get one, create, update, delete, get all by user

import { Request, Response } from 'express';
import Post from './model';
import User from '../users/model';

// controller get all blog posts
export const getAll = async (req: Request, res: Response) => {
    // pagination 
    const { page, limit } = req.query;
    const posts = await Post.find();

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
    const { title, content, auteur } = req.body;

    // check if user exists
    const user = await User.findOne({ id: auteur });

    if (!user) {
        return res.status(400).json({ message: 'User not found' });
    }

    // create new post
    const newPost = await Post.create({ title, content, auteur });

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

    const { title, content, auteur } = req.body;

    // check if user exists
    const user = await User.findOne({ id: auteur });

    if (!user) {
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
export const getAllByUser = async (req: Request, res: Response) => {
    const { id } = req.params;

    const auteur = User.findOne({ id: id });

    if (!auteur) {
        return res.status(400).json({ message: 'User not found' });
    }

    const posts = await Post.find({ auteur: id });

    return res.status(200).json(posts);
}

export default {
    getAll,
    getOne,
    create,
    update,
    remove,
    getAllByUser,
};
