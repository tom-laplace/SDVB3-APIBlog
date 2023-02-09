// Modèle de données Personne, héritant de Profile et ajoutant des champs supplémentaires

import  Profile  from "./profileModel";
import { Schema, Document, model } from "mongoose";

export interface Person extends Document {
    firstname: string;
    lastname: string;
    profile: typeof Profile;
}

const PersonSchema = new Schema(
    {
        firstname: {
            type: String,
            required: true,
        },

        lastname: {
            type: String,
            required: true,
        },

        profile: {
            type: Schema.Types.ObjectId,
            ref: "Profile",
        },
    }
);

export default Profile.discriminator<Person>("Person", PersonSchema);





