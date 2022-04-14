const express = require('express');
const router = express.Router();
const checkAuthentication = require("../passport/checkAuthentication");
const userController = require('../controllers/user');

/**
 * @swagger
 * components:
 *   schemas:
 *     User:
 *       type: object
 *       required:
 *         - name
 *         - email
 *         - password
 *       properties:
 *         id:
 *           type: string
 *           description: The auto-generated id of the book
 *         name:
 *           type: string
 *           description: The name of the user
 *         email:
 *           type: string
 *           description: The email of the user
 *         password:
 *           type: string
 *           description: The password of the user
 *         accepted:
 *           type: number
 *           description: 0 or 1 - The status of the user - if he can enter the application with his created account
 *         admin:
 *           type: number
 *           description: 0 or 1 - The status of the user - if he is admin and has access to certain content and actions
 *       example:
 *         id: 0
 *         name: John Doe
 *         email: john@doe.com 
 *         accepted: 1
 *         admin: 0
 */

/**
 * @swagger
 * tags:
 *   name: Users
 *   description: The Users managing API (All routes need authorization)
 */

/**
 * @swagger
 * /admin/users:
 *   get:
 *     summary: Returns the list of all the users
 *     tags: [Users]
 *     security:
 *       - basicAuth: []
 *     responses:
 *       200:
 *         description: The list of the users
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/User'
 *       401:
 *         description: Not authenticated
 *       403:
 *         description: Not authorized (no admin)
 */

router.get(
    '/users',
    checkAuthentication.checkAuthenticated,
    checkAuthentication.checkAdmin,
    userController.fetchUsers
);

/**
 * @swagger
 * /admin/users/{id}:
 *   get:
 *     summary: Get the user by id
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: number
 *         required: true
 *         description: The user id
 *     security:
 *       - basicAuth: []
 *     responses:
 *       200:
 *         description: The list of the users
 *         content:
 *           application/json:
 *             schema:
 *                 $ref: '#/components/schemas/User'
 *       401:
 *         description: Not authenticated
 *       403:
 *         description: Not authorized (no admin)
 */
router.get(
    '/users/:id',
    checkAuthentication.checkAuthenticated,
    checkAuthentication.checkAdmin,
    userController.fetchUser
);

/**
 * @swagger
 * /admin/users/{id}:
 *  patch:
 *    summary: Updates ONLY the user 'accepted' property
 *    tags: [Users]
 *    parameters:
 *      - in: path
 *        name: id
 *        schema:
 *          type: string
 *        required: true
 *        description: The user id
 *    security:
 *      - basicAuth: []
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/User'
 *    responses:
 *      200:
 *        description: The book was updated
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/User'
 *      400:
 *         description: Bad request
 *      401:
 *         description: Not authenticated
 *      403:
 *         description: Not authorized (no admin)
 *      404:
 *         description: User not found
 */

router.patch(
    '/users/:id',
    checkAuthentication.checkAuthenticated,
    checkAuthentication.checkAdmin,
    userController.updateUser
);

/**
 * @swagger
 * /admin/users/{id}:
 *   delete:
 *     summary: Remove the user by id
 *     tags: [Users]
 *     security:
 *       - basicAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: number
 *         required: true
 *         description: The User id
 *     responses:
 *       200:
 *         description: The User was deleted
 *       401:
 *         description: Not authenticated
 *       403:
 *         description: Not authorized (no admin)
 *       404:
 *         description: User not found
 */

router.delete(
    '/users/:id',
    checkAuthentication.checkAuthenticated,
    checkAuthentication.checkAdmin,
    userController.deleteUser
);

module.exports = router;