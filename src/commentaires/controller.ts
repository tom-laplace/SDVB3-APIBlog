// Controller pour récupérer les commentaires d'un post, pour créer un nouveau commentaire, pour modifier un commentaire et pour supprimer un commentaire

import { Request, Response } from 'express';
import Commentaire from './model';
import User from '../users/model';
import Post from '../posts/model';

// controller get all comments
export const getAll = async (req: Request, res: Response) => {
    const commentaires = await Commentaire.find();

    return res.status(200).json(commentaires);
}

// controller get one comment
export const getOne = async (req: Request, res: Response) => {
    const { id } = req.params;

    const commentaire = await Commentaire.findById(id);

    if (!commentaire) {
        return res.status(400).json({ message: 'Comment not found' });
    }

    return res.status(200).json(commentaire);

}

// controller create a new comment
export const create = async (req: Request, res: Response) => {
    const { content, auteur, post } = req.body;

    // check if user exists
    if(auteur) {
        const user = await User.findById(auteur);

        if (!user) {
            return res.status(400).json({ message: 'User not found' });
        }
    }

    // check if post exists
    if(post) {
        const postExists = await Post.findById(post);

        if (!postExists) {
            return res.status(400).json({ message: 'Post not found' });
        }
    }

    // create new comment
    const newComment = await Commentaire.create({ content, auteur, post });
    
    // return comment
    return res.status(200).json(newComment);
}

// controller update a comment
export const update = async (req: Request, res: Response) => {
    const { id } = req.params;

    const commentaire = await Commentaire.findById(id);

    if (!commentaire) {
        return res.status(400).json({ message: 'Comment not found' });
    }

    const { content, auteur, post } = req.body;

    // check if user exists
    if(auteur) {
        const user = await User.findById(auteur);

        if (!user) {
            return res.status(400).json({ message: 'User not found' });
        }
    }

    // check if post exists
    if(post) {
        const postExists = await Post.findById(post);

        if (!postExists) {
            return res.status(400).json({ message: 'Post not found' });
        }
    }

    // update comment
    commentaire.content = content;
    
    await commentaire.save();

    return res.status(200).json(commentaire);
}

// controller delete a comment
export const remove = async (req: Request, res: Response) => {
    const { id } = req.params;

    const commentaire = await Commentaire.findById(id);

    if (!commentaire) {
        return res.status(400).json({ message: 'Comment not found' });
    }

    await commentaire.remove();

    return res.status(200).json({ message: 'Comment deleted' });
}

// controller get all comments by post
export const getAllByPost = async (req: Request, res: Response) => {
    const { id } = req.params;

    const post = await Post.findById(id);

    if (!post) {
        return res.status(400).json({ message: 'Post not found' });
    }

    const commentaires = await Commentaire.find({ post: id });

    return res.status(200).json(commentaires);
}

// controller get all comments by user
export const getAllByUser = async (req: Request, res: Response) => {
    const { id } = req.params;

    const user = await User.findById(id);

    if (!user) {
        return res.status(400).json({ message: 'User not found' });
    }

    const commentaires = await Commentaire.find({ auteur: id });

    return res.status(200).json(commentaires);
}

export default {
    getAll,
    getOne,
    create,
    update,
    remove,
    getAllByPost,
    getAllByUser,
};

