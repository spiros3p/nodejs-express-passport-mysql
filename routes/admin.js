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

router.patch(
    '/users/:id/accepted',
    checkAuthentication.checkAuthenticated,
    checkAuthentication.checkAdmin,
    adminController.toggleUserAccepted
);

router.delete(
    '/users/:id',
    checkAuthentication.checkAuthenticated,
    checkAuthentication.checkAdmin,
    adminController.deleteUser
);

module.exports = router;