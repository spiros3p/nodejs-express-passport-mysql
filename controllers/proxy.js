const { createProxyMiddleware } = require('http-proxy-middleware');

const checkAuthentication = require("../passport/checkAuthentication");

const filter = function (pathname, req){
    return !((req.method==='DELETE' || req.method==='POST') && req.session.passport.user.admin===0)
}

exports.proxyMiddleware = createProxyMiddleware(filter, {
    target: process.env.PROXY_IP || 'http://localhost',
    changeOrigin: true,
    pathRewrite: {
        [`^/proxy`]: '',
    }
})