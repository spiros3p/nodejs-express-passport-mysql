import { Router } from 'express';
import { body } from 'express-validator';
import { User } from '../models/user.model.js';
import {
    checkNotAuthenticated,
    checkAccepted,
    checkAuthenticated,
    checkAdmin,
} from '../middleware/authentication.middleware.js';
import { logout } from '../controllers/authentication.controller.js';
import passport from 'passport';
import { createUser } from '../controllers/user.controller.js';

const router = Router();

router.post(
    '/signup',
    [
        body('name').trim().not().isEmpty(),
        body('email')
            .isEmail()
            .withMessage('Please enter a valid email.')
            .custom(async (email) => {
                const user = await User.find(email);
                if (user[0].length > 0) {
                    return Promise.reject('Email address already exist!');
                }
            })
            .normalizeEmail({ gmail_remove_dots: false }),
        body('password').trim().isLength({ min: 7 }),
    ],
    checkNotAuthenticated,
    createUser
);

router.post(
    '/login',
    checkNotAuthenticated,
    passport.authenticate('local'),
    checkAccepted,
    (req, res) => {
        delete req.user['password'];
        res.status(200).json({ user: req.user });
    }
);

router.post('/isAuthenticated', checkAuthenticated, (req, res) => {
    res.status(200).json({ statusCode: 200 });
});

router.post('/isAdmin', checkAuthenticated, checkAdmin, (req, res) => {
    res.status(200).json({ statusCode: 200 });
});

router.post(
    '/logout',
    // checkAuthentication.checkAuthenticated,
    logout
);

export default router;
