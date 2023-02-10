import { Request, Response, NextFunction } from "express";
import User from "./model";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { generateJwt } from "./auth/middleware";
import dotenv from "dotenv";

dotenv.config();

///////////////////////////////////////////////////
// Controller pt1 : login, register, updateRole //
/////////////////////////////////////////////////

export const login = async (req: Request, res: Response) => {
    try {
        const { email, password } = req.body;

        // Rechercher l'utilisateur dans la base de données
        const user = await User.findOne({ email });
        if (!user) {
            return res
                .status(400)
                .json({ error: "email ou mot de passe incorrect" });
        }

        // Vérifier le mot de passe
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res
                .status(400)
                .json({ error: "email ou mot de passe incorrect" });
        }

        const token = generateJwt(user);

        // Renvoyer le jeton JWT au client
        res.json({ token });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Une erreur est survenue" });
    }
};

export const register = async (req: Request, res: Response) => {
    const { email, password } = req.body;

    const user_test_mail = await User.findOne({ email });

    if (user_test_mail) {
        return res.status(400).json({ message: "Mail or password incorrect" });
    }

    if (
        password.length < 8 ||
        password.length > 16 ||
        !password.match(/[a-z]/) ||
        !password.match(/[A-Z]/) ||
        !password.match(/[0-9]/) ||
        !password.match(/[^a-zA-Z\d]/)
    ) {
        return res.status(400).json({ message: "Password not valid" });
    }

    bcrypt.hash(password, 10).then(async (hash) => {
        await User.create({
            email,
            password: hash,
        });

        return res.status(200).json({ message: "User created" });
    });
};

export const updateRole = async (req: Request, res: Response) => {
    const { id } = req.params;

    const user = await User.findOne({ id: id });

    if (!user) {
        return res.status(400).json({ message: "User not found" });
    }

    if (user.role === "admin") {
        return res.status(400).json({ message: "User is already admin" });
    }

    user.role = "admin";

    await user.save();

    return res.status(200).json(user);
};

////////////////////////////////////////
// Controller pt2: basic user routes //
//////////////////////////////////////

export const getAll = async (req: Request, res: Response) => {
    const users = await User.find();

    return res.status(200).json(users);
};

export const getOne = async (req: Request, res: Response) => {
    const { id } = req.params;

    const user = await User.findOne({ id: id });

    if (!user) {
        return res.status(400).json({ message: "User not found" });
    }

    return res.status(200).json(user);
};

export const remove = async (req: Request, res: Response) => {
    const { id } = req.params;

    const user = await User.findOne({ id: id });

    if (!user) {
        return res.status(400).json({ message: "User not found" });
    }

    await user.remove();

    return res.status(200).json({ message: "User deleted" });
};
