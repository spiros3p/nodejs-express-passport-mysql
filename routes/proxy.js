const express = require('express');

const checkAuthentication = require("../passport/checkAuthentication");
const proxyController = require("../controllers/proxy");

const router = express.Router();

router.use('',
    checkAuthentication.checkAuthenticated,
    proxyController.proxyMiddleware
)

module.exports = router;

/**
 * @swagger
 * tags:
 *   name: Resource
 *   description: "See same url at path: /resource-api-docs for the official TMF-639 OpenAPI Specs - accessed from the /proxy/resource path on our server"
 */
