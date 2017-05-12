var express = require('express');
var webpack = require('webpack');
var webpackDevMiddleware = require('webpack-dev-middleware');
var webpackHotMiddleware = require('webpack-hot-middleware');
var fs = require('fs');
var common_config = require('./webpack.common');

var app = express();
var flags = {HOT: 1, TEST: 2};

// Istanbul doesn't actually provide the original code in the coverage results.
// This is important because we can't visualise the coverage otherwise in the browser.
// Using the public API so should be future-proof.
(function IstanbulInjection() {
    var fc = require('istanbul-lib-coverage').classes.FileCoverage;
    var fc_toJson = fc.prototype.toJSON;
    fc.prototype.toJSON = function () {
        var hr = fc_toJson.apply(this, arguments);
        hr.code = fs.readFileSync(hr.path, 'utf8');    
        return hr;
    };
})();

function createConfig(path, name, flag) {
    var config = common_config.clone(name);
    var plugins = [];

    if (flag === flags.HOT) {
        plugins.push(new webpack.HotModuleReplacementPlugin());
    }

    // Workaround to ensure that eslint doesn't stop build of app
    // when we're running it during development.
    config.loaders.rules[0].options = {
        emitWarning: true
    };

    return {
        devtool: 'cheap-module-source-map',
        entry: (flag === flags.HOT)? [
            'webpack-hot-middleware/client',
        ].concat(path) : path,
        target: 'web',
        output: config.output,
        module: config.loaders,
        plugins: plugins,
        externals: config.externals
    }
}

([
    createConfig('./src/main', 'app', flags.HOT),
    createConfig('./test/main', 'test', flags.TEST) 
]).forEach(function (config, index) {
    var compiler = webpack(config);

    app.use(webpackDevMiddleware(compiler, {
        publicPath: '/',
        stats: common_config.stats
    }));

    if (index === 0) { // app only
        app.use(webpackHotMiddleware(compiler));
    }
    
});

app.use(express.static('./'));
app.use(express.static('./public'));
app.listen(9001);

console.log('Listening on http://localhost:9001');