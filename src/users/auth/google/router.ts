import Router from "express";
import passport from "passport";
import { Request, Response } from "express";
import { generateJwt } from "../middleware";

import User from "src/users/model";

const router = Router();

router.get(
    "/",
    passport.authenticate("google", { scope: ["profile", "email"] })
);

router.get(
    "/callback",
    passport.authenticate("google", {
        failureRedirect: "/auth/google/callback/failure",
        successRedirect: "/auth/google/callback/success",
    })
);

router.get("/callback/success", async (req: Request, res: Response) => {
    if (!req.user) {
        res.send("Google auth failed");
    }

    let user: Object | any = req.user;
    let account: typeof User | null;

    try {
        account = await User.findOne({ email: user.email });
        if (!account) {
            user = new User({
                email: user.email,
                provider: "google",
            });

            await user.save();
        }
        return res.status(200).json({ token: generateJwt(user) });
    } catch (err: TypeError | any) {
        res.status(500).json({ message: err.message });
    }
});

router.get("/callback/failure", (req, res) => {
    res.send("Google auth failed");
});

export default router;
