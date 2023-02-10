import { Request, Response, NextFunction, RequestHandler } from "express";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import User from "../model";

dotenv.config();

const JWT_SECRET = process.env.JWT_SECRET || "";

interface RequestWithUser extends Request {
    user: any;
}

export const verifyToken: RequestHandler = (req, res, next) => {
    const token =
        req.body.token || req.query.token || req.headers["x-access-token"];

    if (!token) {
        return res.status(403).send("A token is required for authentication");
    }
    try {
        const decoded = jwt.verify(token, JWT_SECRET);
        (req as RequestWithUser).user = decoded;
    } catch (err) {
        return res.status(401).send("Invalid Token");
    }
    return next();
};


export const isAdmin = async (req: Request, res: Response, next: NextFunction) => {
    const user_decoded = (req as RequestWithUser).user;

    const user = await User.findById(user_decoded.id);

    if(!user) {
        return res.status(404).send("User not found");
    }

    if (user.role !== "admin") {
        return res.status(403).send("Admin ressource");
    }
    next();
};

export const hasRights = async (req: Request, res: Response, next: NextFunction) => {
    const user_decoded = (req as RequestWithUser).user;

    const user = await User.findById(user_decoded.id);

    if(!user) {
        return res.status(404).send("User not found");
    }

    if (user.role !== "admin" && user.id !== req.params.id) {
        return res.status(403).send("You don't have the rights");
    }
    next();
}

export const generateJwt = (user: any) => {
return jwt.sign(user, JWT_SECRET, { expiresIn: "7d" });
}