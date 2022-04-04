const express = require('express');

const router = express.Router();

const User = require('../models/user');

const checkAuthentication = require("../passport/checkAuthentication");

const adminController = require('../controllers/admin');

router.get(
    '/users',
    checkAuthentication.checkAuthenticated,
    checkAuthentication.checkAdmin,
    adminController.fetchUsers
);

router.get(
    '/users/:id',
    checkAuthentication.checkAuthenticated,
    checkAuthentication.checkAdmin,
    adminController.fetchUser
);

router.patch(
    '/users/:id',
    checkAuthentication.checkAuthenticated,
    checkAuthentication.checkAdmin,
    adminController.updateUser
);

router.delete(
    '/users/:id',
    checkAuthentication.checkAuthenticated,
    checkAuthentication.checkAdmin,
    adminController.deleteUser
);

module.exports = router;