import webpack from 'webpack';
import path from 'path';

import loaders from './webpack.loaders';

loaders.push(
  {
    test: /\.(css)$/,
    loaders: [
      'style-loader',
      'css-loader?importLoader=1&modules&localIdentName=[path]___[name]__[local]___[hash:base64:5]',
    ],
  },
  {
    test: /\.(scss)$/,
    loaders: [
      'style-loader',
      'css-loader?importLoader=1&modules&localIdentName=[path]___[name]__[local]___[hash:base64:5]',
      'sass-loader',
    ],
  },
);

module.exports = {
  entry: [
    './src/index.jsx',
  ],
  output: {
    publicPath: './',
    path: path.join(__dirname, 'public'),
    filename: 'bundle.js',
  },
  resolve: {
    extensions: ['.js', '.jsx'],
  },
  module: {
    loaders,
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: '"production"',
      },
    }),
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false,
        screw_ie8: true,
        drop_console: true,
        drop_debugger: true,
      },
    }),
  ],
};
