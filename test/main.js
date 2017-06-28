// Setup NodeJS APIs
process.env.NODE_ENV = 'test';
require('babel-register')();
require.extensions['.scss'] = function () {return null;};
require('./bootstrap.js');