const withLess = require('next-with-less');

module.exports = withLess({
  lessLoaderOptions: {
    lessOptions: {
      javascriptEnabled: true,
      //modifyVars: themeVariables,
      localIdentName: '[path]___[local]___[hash:base64:5]',
    },
  },
  reactStrictMode: true,
});
