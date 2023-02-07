import { Request, Response } from 'express';
import User from './model';
import bcrypt from 'bcryptjs';

////////////////////////////////////////
// Controller pt1 : authentification //
//////////////////////////////////////

export const login = async (req: Request, res: Response) => {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if(!email || !password) {
        return res.status(400).json({ message: 'Email and password are required' });
    }

    if (!user) {
        return res.status(400).json({ message: 'User not found' });
    }

    bcrypt.compare(password, user.password).then((result) => {
        if (!result) {
            return res.status(400).json({ message: 'Password is incorrect' });
        } else {
            return "Hash is correct";
        }
    });

    return res.status(200).json(user);
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
            username,
        })
    });

    return res.status(200).json({ message: 'User created'});
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


////////////////////////////////////////
// Controller pt2: basic user routes //
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
