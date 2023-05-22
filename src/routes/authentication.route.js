import { Router } from 'express';
// import { body } from 'express-validator';
import { User } from '../models/user.model.js';
import {
    checkNotAuthenticated,
    checkIsAllowed,
    checkAuthenticated,
    checkAdmin,
} from '../middleware/authentication.middleware.js';
import { logout } from '../controllers/authentication.controller.js';
import passport from 'passport';
import { createUser } from '../controllers/user.controller.js';
import { validationUserSignUp } from '../middleware/validation.middleware.js';

const router = Router();

router.post('/signup', checkNotAuthenticated, validationUserSignUp, createUser);

router.post(
    '/login',
    checkNotAuthenticated,
    passport.authenticate('local'),
    // checkIsAllowed,
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
