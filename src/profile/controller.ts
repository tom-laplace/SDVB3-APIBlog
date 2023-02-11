import { Request, Response } from "express";
import Profile from "./model/profileModel";
import User from "../users/model";
import Company from "./model/companyModel";
import Person from "./model/personModel";

export const createProfile = async (req: Request, res: Response) => {
    const { kind, firstname, lastname, avatar, bio, user, name } = req.body;
    
    let profile;

    try {
        switch (kind) {
            case "person":
                profile = new Person({
                    firstname: firstname,
                    lastname: lastname,
                    avatar: avatar,
                    bio: bio,
                    user: user,
                });
                break;
            case "company":
                profile = new Company({
                    name: name,
                    avatar: avatar,
                    bio: bio,
                    user: user,
                });
                break;
            default:
                return res.status(400).json({ msg: "Invalid kind" });
        }

        await profile.save();
        res.status(201).json(profile);

    } catch (err) {
        res.status(500).json({ msg: err });
    }
};

export const getAllProfilFromUser = async (req: Request, res: Response) => {
    try {
        const user = await User.findById(req.params.id);
        const profiles = await Profile.find({ user: user });
        res.status(200).send({ profiles });
    } catch (error: any) {
        res.status(400).send({ error: error.message });
    }
};

export const getProfileByID = async (req: Request, res: Response) => {
    try {
        const profile = await Profile.findById(req.params.id);
        res.status(200).send({ profile });
    } catch (error: TypeError | any) {
        res.status(400).send({ error: error.message });
    }
};

export const getAll = async (req: Request, res: Response) => {
    try {
        const profiles = await Profile.find();
        res.status(200).send({ profiles });
    } catch (error: Error | any) {
        res.status(400).send({ error: error.message });
    }
};

export const deleteProfile = async (req: Request, res: Response) => {
    try {
        const profile = await Profile.findById(req.params.id);
        if(!profile) throw new Error("Profile not found");
        await profile.remove();
        res.status(200).send({ profile });
    } catch (error: Error | any) {
        res.status(400).send({ error: error.message });
    }
};