// Controller pour récupérer les commentaires d'un post, pour créer un nouveau commentaire, pour modifier un commentaire et pour supprimer un commentaire

import { Request, Response } from 'express';
import Commentaire from './model';
import User from '../users/model';
import Post from '../posts/model';
import Profile from '../profile/model/profileModel';

// controller get all comments
export const getAll = async (req: Request, res: Response) => {
    const commentaires = await Commentaire.find();

    return res.status(200).json(commentaires);
}

// controller get one comment
export const getOne = async (req: Request, res: Response) => {
    const { id } = req.params;

    const commentaire = await Commentaire.findOne({ id: id });

    if (!commentaire) {
        return res.status(400).json({ message: 'Comment not found' });
    }

    return res.status(200).json(commentaire);

}

// controller create a new comment
export const create = async (req: Request, res: Response) => {
    const { content, profile, post } = req.body;

    if(profile) {
        const profile_to_check = await Profile.findById(profile);

        if (!profile_to_check) {
            return res.status(400).json({ message: 'Profile not found' });
        }
    }

    if(post) {
        const postExists = await Post.findById(post);

        if (!postExists) {
            return res.status(400).json({ message: 'Post not found' });
        }
    }


    const newComment = await Commentaire.create({ content, profile, post });

    if(newComment && post){
        
            const post_related = await Post.findById(post);
            if(!post_related) return res.status(400).json({ message: 'Post not found' })


            post_related.commentsCount = post_related.commentsCount + 1;

            await post_related.save();
    }
    
    // return comment
    return res.status(200).json(newComment);
}

// controller update a comment
export const update = async (req: Request, res: Response) => {
    const { id } = req.params;

    const commentaire = await Commentaire.findOne({ id: id });

    if (!commentaire) {
        return res.status(400).json({ message: 'Comment not found' });
    }

    const { content, profile, post } = req.body;

    // check if user exists
    if(profile) {
        const profile_to_check = await User.findById(profile);

        if (!profile_to_check) {
            return res.status(400).json({ message: 'User not found' });
        }
    }

    // check if post exists
    if(post) {
        const postExists = await Post.findOne({ id: post });

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
    const { post } = req.body;

    const commentaire = await Commentaire.findOne({ id: id });

    if (!commentaire) {
        return res.status(400).json({ message: 'Comment not found' });
    }

    await commentaire.remove();
    post.commentsCount = post.commentsCount - 1;
    await post.save();

    return res.status(200).json({ message: 'Comment deleted' });
}

// controller get all comments by post
export const getAllByPost = async (req: Request, res: Response) => {
    const { id } = req.params;

    const post = await Post.findOne({ id: id });

    if (!post) {
        return res.status(400).json({ message: 'Post not found' });
    }

    const commentaires = await Commentaire.find({ post: id });

    return res.status(200).json(commentaires);
}

// controller get all comments by user
export const getAllByProfile = async (req: Request, res: Response) => {
    const { id } = req.params;

    const profil_to_check = await Profile.findById(id);

    if (!profil_to_check) {
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
    getAllByProfile,
};

