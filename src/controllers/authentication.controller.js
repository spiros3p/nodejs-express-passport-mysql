import { validationResult } from 'express-validator';
import bcrypt from 'bcrypt';
import { User } from '../models/user.model.js';

export function logout(req, res, next) {
    try {
        req.logout();

        res.clearCookie('connect.sid'); // clean up!
        res.status(200).json({ message: 'Succsesfully logged out...' });
    } catch (err) {
        if (!err.statusCode) {
            err.statusCode = 500;
        }
        next(err);
    }
}

export async function signup(req, res, next) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.errors[0] });
    }

    const name = req.body.name;
    const email = req.body.email;
    const password = req.body.password;

    try {
        const hashedPassword = await bcrypt.hash(password, 12);
        const userDetails = {
            name: name,
            email: email,
            password: hashedPassword,
        };
        await User.create(userDetails);

        res.status(201).json({ message: 'User registered!' });
    } catch (err) {
        if (!err.statusCode) {
            err.statusCode = 500;
        }
        next(err);
    }
}
