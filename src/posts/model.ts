// modèle du schéma de données pour les posts
// titre, contenu, auteur, date de création

import { Schema, model, Document } from 'mongoose';
import { User } from 'src/users/model';
import * as uuidv4 from 'uuid';

export interface Post extends Document {
    id: string;
    title: string;
    content: string;
    auteur: User;
    createdAt: Date;
    commentsCount: number;
}

const PostSchema = new Schema({
    id: {
        type: String,
        default: uuidv4.v4,
    },
    title: {
        type: String,
        required: true,
    },
    content: {
        type: String,
        required: true,
    },
    auteur: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
    commentsCount: {
        type: Number,
        default: 0,
    },
});

export default model<Post>('Post', PostSchema);

