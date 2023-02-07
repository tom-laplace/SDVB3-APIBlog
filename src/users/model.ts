// Modèle basique d'un utilisateur

import { Schema, model, Document } from 'mongoose';

export interface User extends Document {
    email: string;
    password: string;
    role: string;
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
    
    role: {
        type: String,
        required: true,
        default: 'user',
    },
});

export default model<User>('User', UserSchema);