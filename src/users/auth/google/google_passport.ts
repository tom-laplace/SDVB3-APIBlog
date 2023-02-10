import passport from "passport";
import dotenv from "dotenv";

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
            request: any,
            accessToken: any,
            refreshToken: any,
            profile: any,
            done: (arg0: null, arg1: any) => any
        ) => {
            return done(null, profile);
        }
    )
);

passport.serializeUser((user: any, done: (arg0: null, arg1: any) => any) => {
    done(null, user);
});

passport.deserializeUser((user: any, done: (arg0: null, arg1: any) => any) => {
    done(null, user);
});
