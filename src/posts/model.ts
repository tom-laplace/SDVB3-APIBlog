// modèle du schéma de données pour les posts
// titre, contenu, auteur, date de création

import { Schema, model, Document } from "mongoose";
import { Profile } from "../profile/model/profileModel";

import * as uuidv4 from "uuid";

export interface Post extends Document {
    id: string;
    title: string;
    content: string;
    profile: Profile;
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
    profile: {
        type: Schema.Types.ObjectId,
        ref: "Profile",
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

export default model<Post>("Post", PostSchema);
