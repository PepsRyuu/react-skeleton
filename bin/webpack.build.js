var webpack = require('webpack');
var common_config = require('./webpack.common');

process.env.NODE_ENV = 'production';

function createConfig(path, name) {
    var config = common_config.clone(name);
    var plugins = [
        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: JSON.stringify('production')
            }
        }),
        new webpack.optimize.UglifyJsPlugin({minimize: true, compressor: {warnings: false}})
    ];

    return {
        devtool: 'source-map',
        entry: path,
        target: 'web',
        output: config.output,
        module: config.loaders,
        plugins: plugins,
        externals: config.externals
    }
}

function webpackPromise (config) {
    return new Promise(function (resolve, reject) {
        webpack(config).run(function (err, stats) {
            if (stats.hasErrors()) {
                console.log(stats.toString("errors-only"));
                reject();
            } else {
                console.log(stats.toString(common_config.stats));
                resolve();
            }
        });
    })
}

console.log('Executing webpack...');
Promise.all([
    createConfig('./src/main', 'app'),
    createConfig('./test/main', 'test') 
].map(webpackPromise)).then(function (results) {
    console.log('Build complete.');  
}).catch(() => {
    process.exit(1);
});



