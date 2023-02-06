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


//controller retrieve all users
export const getAll = async (req: Request, res: Response) => {
    const users = await User.find();

    return res.status(200).json(users);
}

// controller retrieve one user
export const getOne = async (req: Request, res: Response) => {
    const { id } = req.params;

    const user = await User.findById(id);

    if (!user) {
        return res.status(400).json({ message: 'User not found' });
    }

    return res.status(200).json(user);
}

// controller delete one user
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
    getAll,
    getOne,
    remove,
};
