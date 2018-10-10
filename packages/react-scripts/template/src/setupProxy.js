/*
const proxy = require('http-proxy-middleware');

const proxySettings = {
  '/mock/': {
    target: 'http://localhost:8080',
    secure: false,
    pathRewrite: {
      '^/mock/': '',
    },
  },
};

module.exports = function(app) {
  const proxyList = Object.entries(proxySettings);
  proxyList.length && proxyList.forEach(([k, v]) => app.use(proxy(k, v)));
};
*/
module.exports = function() {};
