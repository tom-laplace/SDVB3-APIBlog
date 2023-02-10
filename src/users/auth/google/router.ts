// route for google auth 

import Router from "express"
import passport from 'passport';
import { Request, Response } from "express";

const router = Router()

router.get("/", passport.authenticate("google", { scope: ["profile", "email"] })); 

router.get(
    "/callback",
    passport.authenticate("google", {
        failureRedirect: "/auth/google/callback/failure",
        successRedirect: "/auth/google/callback/success",
    }),
);

router.get("/callback/success", (req: Request, res: Response) => {
    if(!req.user){
        res.send("Google auth failed");
    }
    res.send("Google auth success" + req.user);
});

router.get("/callback/failure", (req, res) => {
    res.send("Google auth failed");
});

export default router;

