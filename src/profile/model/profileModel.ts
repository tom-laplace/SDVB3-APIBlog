import { Schema, Document, model } from "mongoose";
import { User } from "../../users/model";
import * as uuidv4 from "uuid";

export interface Profile extends Document {
    id: string;
    avatar: string;
    bio: string;
    user: User;
}

const ProfileSchema = new Schema(
    {
        id: {
            type: String,
            default: uuidv4.v4,
        },

        avatar: {
            type: String,
            required: true,
            default:
                "https://images.unsplash.com/photo-1638803040283-7a5ffd48dad5?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1074&q=80",
        },

        bio: {
            type: String,
            required: false,
        },

        user: {
            type: Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
    },
    {
        discriminatorKey: "kind",
    }
);

export default model<Profile>("Profile", ProfileSchema);
