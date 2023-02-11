// Modèle des commentaires d'un post

import { Schema, model, Document } from 'mongoose';
import { Profile } from '../profile/model/profileModel';
import { Post } from '../posts/model';
import * as uuidv4 from 'uuid';

export interface Commentaire extends Document {
    id: string;
    content: string;
    post: Post;
    profile: Profile;
    createdAt: Date;
}

const CommentaireSchema = new Schema({
    id: {
        type: String,
        default: uuidv4.v4,
    },
    content: {
        type: String,
        required: true,
    },
    profile: {
        type: Schema.Types.ObjectId,
        ref: 'Profile',
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