var express = require('express');
var webpack = require('webpack');
var webpackDevMiddleware = require('webpack-dev-middleware');
var webpackHotMiddleware = require('webpack-hot-middleware');
var common_config = require('./webpack.common');

var app = express();

function createConfig() {
    var plugins = [new webpack.HotModuleReplacementPlugin()];

    // Workaround to ensure that eslint doesn't stop build of app
    // when we're running it during development.
    common_config.loaders.rules[0].options = {
        emitWarning: true
    };

    return {
        devtool: 'cheap-module-source-map',
        entry: ['webpack-hot-middleware/client', './src/main.js'],
        target: 'web',
        output: common_config.output,
        module: common_config.loaders,
        plugins: plugins,
        externals: common_config.externals
    }
}

var compiler = webpack(createConfig());

app.use(webpackDevMiddleware(compiler, {
    publicPath: '/',
    stats: common_config.stats
}));

app.use(webpackHotMiddleware(compiler));
app.use(express.static('./'));
app.use(express.static('./public'));
app.listen(9001);

console.log('Listening on http://localhost:9001');