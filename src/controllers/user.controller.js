import { User } from '../models/user.model.js';
import { validationResult } from 'express-validator';
import bcrypt from 'bcrypt';

export async function createUser(req, res, next) {
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

export async function getUsers(req, res, next) {
    try {
        const [allUsers] = await User.getAll();
        res.status(200).json(removePassword(allUsers));
    } catch (err) {
        if (!err.statusCode) {
            err.statusCode = 500;
        }
        next(err);
    }
}

export async function getUser(req, res, next) {
    try {
        const [allUsers] = await User.get(req.params.id);
        res.status(200).json(removePassword(allUsers)[0]);
    } catch (err) {
        if (!err.statusCode) {
            err.statusCode = 500;
        }
        next(err);
    }
}

export async function deleteUser(req, res, next) {
    try {
        const deleteResponse = await User.remove(req.params.id);
        if (deleteResponse[0].affectedRows) {
            res.status(200).json({ message: 'User was succesfully deleted' });
        } else {
            res.status(404).json({
                statusCode: 404,
                message: 'User Not Found',
            });
        }
    } catch (err) {
        if (!err.statusCode) {
            err.statusCode = 500;
        }
        next(err);
    }
}

export async function updateUser(req, res, next) {
    try {
        if (typeof req.body.accepted === 'undefined') {
            res.status(400).json({
                statusCode: 400,
                message: 'Wrong patch request',
            });
            return;
        }
        const result = await User.update(req.params.id, req.body);
        if (result[0].affectedRows) {
            res.status(201).json({ message: 'User Updated!' });
        } else {
            res.status(404).json({
                statusCode: 404,
                message: 'User Not Found',
            });
        }
    } catch (err) {
        if (!err.statusCode) {
            err.statusCode = 500;
        }
        next(err);
    }
}

function removePassword(users) {
    for (let user in users) {
        delete users[user]['password'];
    }
    return users;
}