// Modèle basique d'un utilisateur

import { Schema, model, Document } from 'mongoose';

export interface User extends Document {
    email: string;
    password: string;
}

const UserSchema = new Schema({
    email: {
        type: String,
        required: true,
        unique: true,
    },

    password: {
        type: String,
        required: true,
    },

    createdAt: {
        type: Date,
        default: Date.now,
    },
});

export default model<User>('User', UserSchema);