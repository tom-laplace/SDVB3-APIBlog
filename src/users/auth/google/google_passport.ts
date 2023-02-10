import passport, { Profile } from "passport";
import dotenv from "dotenv";
import { Request } from "express";

const GoogleStrategy = require("passport-google-oauth2").Strategy;

dotenv.config();

passport.use(
    new GoogleStrategy(
        {
            clientID: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
            callbackURL: "http://localhost:4004/auth/google/callback",
            passReqToCallback: true,
        },
        (
            request: Request,
            accessToken: string,
            refreshToken: string,
            profile: object,
            done: (arg0: null, arg1: Object) => Profile
        ) => {
            return done(null, profile);
        }
    )
);

passport.serializeUser((user: Object, done: (arg0: null, arg1: Object) => any) => {
    done(null, user);
});

passport.deserializeUser((user: Object, done: (arg0: null, arg1: Object) => any) => {
    done(null, user);
});
