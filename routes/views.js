const express = require('express');
const router = express.Router();
const { body } = require('express-validator');
const passport = require('passport');

const User = require('../models/user');
const viewsController = require('../controllers/views');

router.get( '/',    //login
    viewsController.checkNotAuthenticated,
    viewsController.renderLogin
);

router.get( '/home',
    viewsController.checkAuthenticated,
    // viewsController.checkAccepted,
    viewsController.renderHome
);

router.get( '/signup',
    viewsController.checkNotAuthenticated,
    // viewsController.checkAccepted,
    viewsController.renderSignup
);

router.get( '/logout',
    viewsController.logout
);

router.post( '/signup',
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
    viewsController.signup
);

router.post( '/login',
    viewsController.checkNotAuthenticated,
    passport.authenticate('local'),
    // viewsController.checkAccepted,
    viewsController.renderHome
);


module.exports = router;
