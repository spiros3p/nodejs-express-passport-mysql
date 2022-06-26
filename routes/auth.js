const express = require('express');
const { body } = require('express-validator');
const router = express.Router();
const User = require('../models/user');
const checkAuthentication = require("../passport/checkAuthentication");
const authController = require('../controllers/auth');
const passport = require('passport');

/**
 * @swagger
 * /auth/signup:
 *   post:
 *     summary: Create a new user
 *     tags: [Users]
 *     security:
 *       - basicAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/User'
 *     responses:
 *       201:
 *         description: The User was successfully created
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       400:
 *         description: Bad request
 *       500:
 *         description: Some server error
 */

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

/**
 * @swagger
 * tags:
 *   name: Authorization-Authentication
 *   description: The Auth managing API 
 */

/**
 * @swagger
 * /auth/login:
 *   post:
 *     summary: Login
 *     tags: [Authorization-Authentication]
 *     security:
 *       - basicAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 description: The user's email.
 *                 example: test@test.com
 *               password:
 *                 type: string
 *                 description: The user's password.
 *                 example: xxxxxxxxxx
 *     responses:
 *       200:
 *         description: User is logging in
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       500:
 *         description: Some server error
 */

router.post('/login',
    checkAuthentication.checkNotAuthenticated,
    passport.authenticate('local'),
    checkAuthentication.checkAccepted,
    (req, res) => {
        delete req.user['password'];
        res.status(200).json({ "user": req.user });
    }
);

/**
 * @swagger
 * /auth/isAuthenticated:
 *   post:
 *     summary: Check authentication
 *     tags: [Authorization-Authentication]
 *     security:
 *       - basicAuth: []
 *     requestBody:
 *       required: false
 *     responses:
 *       200:
 *         description: User is authenticated
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 statusCode:
 *                   type: string
 *                   description: The status of the request
 *                   example: 200
 *       401:
 *         description: Not authenticated
 */

router.post('/isAuthenticated',
    checkAuthentication.checkAuthenticated,
    (req, res) => {
        res.status(200).json({ "statusCode": 200 });
    }
);

/**
 * @swagger
 * /auth/isAdmin:
 *   post:
 *     summary: Check admin status - authorization
 *     tags: [Authorization-Authentication]
 *     security:
 *       - basicAuth: []
 *     requestBody:
 *       required: false
 *     responses:
 *       200:
 *         description: User is authorized as admin
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 statusCode:
 *                   type: string
 *                   description: The status of the request
 *                   example: 200
 *       401:
 *         description: Not authenticated
 *       403:
 *         description: Not authorized
 */

router.post('/isAdmin',
    checkAuthentication.checkAuthenticated,
    checkAuthentication.checkAdmin,
    (req, res) => {
        res.status(200).json({ "statusCode": 200 });
    }
);

/**
 * @swagger
 * /auth/logout:
 *   post:
 *     summary: User logout
 *     tags: [Authorization-Authentication]
 *     security:
 *       - basicAuth: []
 *     requestBody:
 *       required: false
 *     responses:
 *       200:
 *         description: User is logging out
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 statusCode:
 *                   type: string
 *                   description: Succesful logout message
 *                   example: Succsesfully Logged Out
 */

router.post('/logout',
    // checkAuthentication.checkAuthenticated,
    authController.logout
);

module.exports = router;