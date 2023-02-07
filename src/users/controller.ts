import { Request, Response } from 'express';
import User from './model';
import bcrypt from 'bcryptjs';
import passport from 'passport';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import Profile from '../profile/model';

dotenv.config();

//////////////////////////////////////////////////////
// Controller pt1 : passport strategy and function //
////////////////////////////////////////////////////

const localStrategy = require('passport-local').Strategy;

passport.use(
    new localStrategy(
      {
        usernameField: "email",
        passwordField: "password",
      },
      function (email: string, password: string, done: any) {
        User.findOne({ email: email }, function (err: any, user: any) {
          if (err) {
            return done(err);
          }
          if (!user) {
            return done(null, false, { message: "Incorrect email." });
          }
          if (!validPassword(password, user)) {
            return done(null, false, { message: "Incorrect password." });
          }
          return done(null, user);
        });
      }
    )
  );

  function validPassword(password: string, obj: {password: string}) {
    return bcrypt.compareSync(password, obj.password);
  }

  const getUserProfile = async (token: string) => {
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET || '');
      if (typeof decoded === "object" && "id" in decoded) {
        const userId = decoded.id;
      
        // Use userId to find the corresponding user profile in your database
        const userProfile = await Profile.findOne({ user: userId });
  
        return userProfile;
      } else {
        return null;
      }
    } catch (error) {
      return null;
    }
  };


//////////////////////////////////////////////////////////////////
// Controller pt2 : login, register, updateRole and get profile//
////////////////////////////////////////////////////////////////

export const login = async (req: Request, res: Response) => {
    passport.authenticate("local", { session: false }, function (err, user, info) {
        if (err || !user) {
          return res.status(400).json({
            message: "Something is not right",
            user: user,
          });
        }
        req.login(user, { session: false }, function (err) {
          if (err) {
            res.send(err);
          }
        const token = jwt.sign(user.toJSON(), process.env.JWT_SECRET || '');
          return res.json({ user, token });
        });
      })(req, res);
}

export const register = async (req: Request, res: Response) => {
    const { email, password, username } = req.body;

    const user_test_mail = await User.findOne({ email });
    const user_test_username = await User.findOne({ username })

    if (user_test_mail) {
        return res.status(400).json({ message: 'User already exists' });
    }

    if (user_test_username) {
        return res.status(400).json({ message: 'Username already exists' });
    }

    if(password.length < 8 || password.length > 16 || !password.match(/[a-z]/) || !password.match(/[A-Z]/) || !password.match(/[0-9]/) || !password.match(/[^a-zA-Z\d]/)) {
        return res.status(400).json({ message: 'Password must be between 8 and 16 characters, contain at least one uppercase letter, one lowercase letter, one number and one special character' });
    }
    
    bcrypt.hash(password, 10).then(async (hash) => {
        await User.create({
            email,
            password: hash,
        })
        return res.status(200).json({ message: 'User created', user: { email } });
    });
}

export const updateRole = async (req: Request, res: Response) => {
    const { id } = req.params;
    
    const user = await User.findById(id);

    if (!user) {
        return res.status(400).json({ message: 'User not found' });
    }

    if (user.role === 'admin') {
        return res.status(400).json({ message: 'User is already admin' });
    }

    user.role = 'admin';

    await user.save();

    return res.status(200).json(user);
}

export const getProfile = async (req: Request, res: Response) => {
    const token = req.headers.authorization?.split(' ')[1];
    const userProfile = await getUserProfile(token || '');

    if (!userProfile) {
        return res.status(404).json({ message: 'User not found' });
    }

    return res.status(200).json(userProfile);
}


////////////////////////////////////////
// Controller pt3: basic user routes //
//////////////////////////////////////

export const getAll = async (req: Request, res: Response) => {
    const users = await User.find();

    return res.status(200).json(users);
}

export const getOne = async (req: Request, res: Response) => {
    const { id } = req.params;

    const user = await User.findById(id);

    if (!user) {
        return res.status(400).json({ message: 'User not found' });
    }

    return res.status(200).json(user);
}

export const remove = async (req: Request, res: Response) => {
    const { id } = req.params;

    const user = await User.findById(id);

    if (!user) {
        return res.status(400).json({ message: 'User not found' });
    }

    await user.remove();

    return res.status(200).json({ message: 'User deleted' });
}

export default {
    login,
    register,
    updateRole,
    getAll,
    getOne,
    remove,
};
