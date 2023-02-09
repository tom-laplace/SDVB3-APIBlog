// Modèle de données Company, héritant de Profile et ajoutant des champs supplémentaires

import Profile from "./profileModel";
import { Schema, Document, model } from "mongoose";

export interface Company extends Document {
    name: string;
    profile: typeof Profile;
}

const CompanySchema = new Schema(
    {
        name: {
            type: String,
            required: true,
        },

        profile: {
            type: Schema.Types.ObjectId,
            ref: "Profile",
        },
    }
);

export default Profile.discriminator<Company>("Company", CompanySchema);