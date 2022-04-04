const express = require('express');

const { body } = require('express-validator');

const router = express.Router();

const User = require('../models/user');

const checkAuthentication = require("../passport/checkAuthentication");

const authController = require('../controllers/auth');

const passport = require('passport');

router.post('/signup',
    [
        body('name').trim().not().isEmpty(),
        body('email')
            .isEmail()
            .withMessage('Please enter a valid email.')
            .custom(async (email) => {
                const user = await User.find(email)
                if (user[0].length > 0) {
                    return Promise.reject('Email address already exist!');
                }
            })
            .normalizeEmail({ gmail_remove_dots: false }),
        body('password').trim().isLength({ min: 7 }),
    ],
    checkAuthentication.checkNotAuthenticated,
    authController.signup
);

router.post('/login',
    checkAuthentication.checkNotAuthenticated,
    passport.authenticate('local'),
    checkAuthentication.checkAccepted,
    (req, res) => {
        delete req.user['password'];
        res.status(200).json({ "user": req.user });
    }
);

router.post('/isAuthenticated',
    checkAuthentication.checkAuthenticated,
    (req, res) => {
        res.status(200).json({ "statusCode": 200 });
    }
);

router.post('/isAdmin',
    checkAuthentication.checkAuthenticated,
    checkAuthentication.checkAdmin,
    (req, res) => {
        res.status(200).json({ "statusCode": 200 });
    }
);

router.post('/logout',
    // checkAuthentication.checkAuthenticated,
    authController.logout
);

module.exports = router;