// Modèle des commentaires d'un post

import { Schema, model, Document } from 'mongoose';
import { User } from '../users/model';
import { Post } from '../posts/model';

export interface Commentaire extends Document {
    content: string;
    auteur: User;
    post: Post;
    createdAt: Date;
}

const CommentaireSchema = new Schema({
    content: {
        type: String,
        required: true,
    },
    auteur: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    post: {
        type: Schema.Types.ObjectId,
        ref: 'Post',
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

export default model<Commentaire>('Commentaire', CommentaireSchema);