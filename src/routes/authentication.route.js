import { Router } from 'express';
import { User } from '../models/user.model.js';
import {
    checkNotAuthenticated,
    checkIsAccepted,
    checkAuthenticated,
    checkAdmin,
} from '../middleware/authentication.middleware.js';
import {
    logout,
    okRespone,
    loginResponse,
} from '../controllers/authentication.controller.js';
import passport from 'passport';
import { createUser } from '../controllers/user.controller.js';
import { validationUserSignUp } from '../middleware/validation.middleware.js';

const router = Router();

router.post('/signup', checkNotAuthenticated, validationUserSignUp, createUser);

router.post(
    '/login',
    checkNotAuthenticated,
    passport.authenticate('local'),
    // checkIsAccepted,
    loginResponse
);

router.post('/isAuthenticated', checkAuthenticated, okRespone);

router.post('/isAdmin', checkAuthenticated, checkAdmin, okRespone);

router.post(
    '/logout',
    // checkAuthentication.checkAuthenticated,
    logout
);

export default router;
