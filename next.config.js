const withLess = require('next-with-less');

module.exports = withLess({
  assetPrefix: process.env.ASSET_PREFIX_BASE_PATH,
  lessLoaderOptions: {
    lessOptions: {
      javascriptEnabled: true,
      localIdentName: '[path]___[local]___[hash:base64:5]',
    },
  },
  reactStrictMode: true,
  staticPageGenerationTimeout: 1000,
  images: {
    unoptimized: true,
  },
});
