
const { createProxyMiddleware } = require('http-proxy-middleware');

exports.proxyMiddleware = createProxyMiddleware(
    {
        target: process.env.PROXY_API,
        changeOrigin: true,
        pathRewrite: {
            [`^/proxy`]: '',
        }
    }
)