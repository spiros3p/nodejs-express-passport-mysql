const express = require('express');

const checkAuthentication = require("../passport/checkAuthentication");
const proxyController = require("../controllers/proxy");

const router = express.Router();

router.use('',
    checkAuthentication.checkAuthenticated,
    proxyController.proxyMiddleware
)

module.exports = router;