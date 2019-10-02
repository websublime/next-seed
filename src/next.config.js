/**
 * @license
 * Copyright Websublime. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://www.websublime.com/license
 */

const withLess = require('@zeit/next-less');
const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin');
const path = require('path');

// eslint-disable-next-line no-process-env
const isProduction = process.env.NODE_ENV === 'production';

module.exports = withLess({
  distDir: isProduction ? '../dist' : '../.next',
  lessLoaderOptions: {
    javascriptEnabled: true,
  },
  useFileSystemPublicRoutes: false,
  webpack: (config, { isServer }) => {
    const sentry = !isServer && { '@sentry/node': '@sentry/browser' };

    if (isServer) {
      const antStyles = /antd\/.*?\/style.*?/;
      const origExternals = [...config.externals];

      config.externals = [
        (context, request, callback) => {
          if (request.match(antStyles)) return callback();
          if (typeof origExternals[0] === 'function') {
            origExternals[0](context, request, callback);
          } else {
            callback();
          }
        },
        ...(typeof origExternals[0] === 'function' ? [] : origExternals),
      ];

      config.module.rules.unshift({
        test: antStyles,
        use: 'null-loader',
      });
    }

    config.resolve.alias = {
      ...config.resolve.alias,
      ...sentry,
      '@ws/react-next': path.resolve(__dirname, '../src'),
      '@ws/react-server': path.resolve(__dirname, '../server'),
      locales: path.resolve(__dirname, '../locales'),
    };

    config.resolve.plugins.push(
      new TsconfigPathsPlugin({
        configFile: path.resolve(__dirname, '../tsconfig.json'),
      }),
    );

    return config;
  },
});
