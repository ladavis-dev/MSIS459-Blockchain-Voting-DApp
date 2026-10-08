const { createProxyMiddleware } = require("http-proxy-middleware");

module.exports = function (app) {
  app.use(
    "/rpc",
    createProxyMiddleware({
      target: "http://127.0.0.1:8545",
      changeOrigin: true,
      pathRewrite: {
        "^/rpc": "/"
      },
      logLevel: "debug"
    })
  );
};
