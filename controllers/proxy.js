
const { createProxyMiddleware } = require('http-proxy-middleware');

exports.proxyMiddleware = createProxyMiddleware(
    {
        target: process.env.PROXY_IP || 'http://localhost',
        changeOrigin: true,
        pathRewrite: {
            [`^/proxy`]: '',
        }
    }
)