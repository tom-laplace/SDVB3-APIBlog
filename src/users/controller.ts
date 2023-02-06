// controller for user routes 
// Path: src/users/controller.ts
import { Request, Response } from 'express';
import User from './model';

// controller login checking if user exists and password is correct
export const login = async (req: Request, res: Response) => {
    const { email, password } = req.body;

    // check if user exists
    const user = await User.findOne({ email });

    if (!user) {
        return res.status(400).json({ message: 'User not found' });
    }

    // check if password is correct
    if (password !== user.password) {
        return res.status(400).json({ message: 'Password is incorrect' });
    }

    // return user
    return res.status(200).json(user);
}


// controller register creating a new user
export const register = async (req: Request, res: Response) => {
    const { email, password } = req.body;

    // check if user exists
    const user = await User.findOne({ email });

    if (user) {
        return res.status(400).json({ message: 'User already exists' });
    }

    // create new user
    const newUser = await User.create({ email, password });

    // return user
    return res.status(200).json(newUser);
}

export default { login, register };
