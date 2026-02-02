const defaultConfig = require('@wordpress/scripts/config/webpack.config');
const path = require('path');

module.exports = {
  ...defaultConfig,
  entry: {
    'rules': path.resolve(__dirname, 'assets/admin/src/tabs/ManageRules/index.tsx'),
    'roles': path.resolve(__dirname, 'assets/admin/src/tabs/ManageRoles/index.tsx'),
    'categories': path.resolve(__dirname, 'assets/admin/src/tabs/Categories/index.tsx'),
    'products': path.resolve(__dirname, 'assets/admin/src/tabs/Products/index.tsx'),
  },
  output: {
    path: path.resolve(__dirname, 'assets/admin/build'),
    filename: '[name].js',
  },
  resolve: {
    ...defaultConfig.resolve,
    extensions: ['.ts', '.tsx', '.js', '.jsx', '.json']
  },
  externals: {
    '@wordpress/element': 'wp.element',
    '@wordpress/components': 'wp.components',
    '@wordpress/data': 'wp.data',
    '@wordpress/api-fetch': 'wp.apiFetch',
    '@wordpress/notices': 'wp.notices',
  }
};
