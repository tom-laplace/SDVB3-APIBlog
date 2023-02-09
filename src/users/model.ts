import { Schema, model, Document } from 'mongoose';
import * as uuidv4 from 'uuid';
import * as bcrypt from 'bcryptjs';
export interface User extends Document {
    id: string;
    email: string;
    password: string;
    role: string;
}

const UserSchema = new Schema({
    id: {
        type: String,
        default: uuidv4.v4,
    },
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