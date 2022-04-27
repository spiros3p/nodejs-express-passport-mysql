const { createProxyMiddleware, responseInterceptor } = require('http-proxy-middleware');

const checkAuthentication = require("../passport/checkAuthentication");

const filter = function (pathname, req){
    return !((req.method==='DELETE' || req.method==='POST') && req.session.passport.user.admin===0)
}

exports.proxyMiddleware = createProxyMiddleware(filter, {
    target: process.env.PROXY_IP || 'http://localhost',
    changeOrigin: true,
    pathRewrite: {
        [`^/proxy`]: '',
    },
    selfHandleResponse: true,
    onProxyRes: responseInterceptor(async (responseBuffer, proxyRes, req, res) => {
        // manipulate response from outside server and return to the client
        const response = responseBuffer.toString('utf8'); // convert buffer to string
        res.setHeader('access-control-allow-origin', req.headers.origin); //change the res.origin received from the API server to the one received-intented to the ANGULAR app
        return response;
    })
})