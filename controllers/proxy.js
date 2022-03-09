
const { createProxyMiddleware } = require('http-proxy-middleware');

exports.proxyMiddleware = createProxyMiddleware(
    {
        target: process.env.PROXY_IP,
        changeOrigin: true,
        pathRewrite: {
            [`^/proxy`]: '',
        }
    }
)