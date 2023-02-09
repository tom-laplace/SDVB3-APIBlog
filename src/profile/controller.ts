import { Request, Response } from "express";
import Profile from "./model/profileModel";
import User from "../users/model";
import Company from "./model/companyModel";
import Person from "./model/personModel";

export const createPerson = async (req: Request, res: Response) => {
    try {
        const person = new Person({
            firstname: req.body.firstname,
            lastname: req.body.lastname,
            username: req.body.username,
            avatar: req.body.avatar,
            bio: req.body.bio,
            user: req.body.user,
        });

        const createdPerson = await person.save();
        res.status(201).send(createdPerson);
    } catch (error: any) {
        res.status(400).send({ error: error.message });
    }
};

export const createCompany = async (req: Request, res: Response) => {
    try {
        const company = new Company({
            name: req.body.name,
            avatar: req.body.avatar,
            bio: req.body.bio,
            user: req.body.user,
        });

        const createdCompany = await company.save();
        res.status(201).send(createdCompany);
    } catch (error: any) {
        res.status(400).send({ error: error.message });
    }
};

export const getAllProfilFromUser = async (req: Request, res: Response) => {
    try {
        const user = await User.findById(req.params.id);
        const profile = await Profile.findOne({ user: user });
        const persons = await Person.find({ profile: profile });
        const companies = await Company.find({ profile: profile });
        res.status(200).send({ persons, companies });
    } catch (error: any) {
        res.status(400).send({ error: error.message });
    }
};