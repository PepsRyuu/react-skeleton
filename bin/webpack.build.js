var webpack = require('webpack');
var common_config = require('./webpack.common');

process.env.NODE_ENV = 'production';

function createConfig() {
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
        entry: './src/main.js',
        target: 'web',
        output: common_config.output,
        module: common_config.loaders,
        plugins: plugins,
        externals: common_config.externals
    }
}

webpack(createConfig()).run(function(err, stats) {
    if (stats.hasErrors()) {
        console.log(stats.toString("errors-only"));
        process.exit(1);
    } else {
        console.log(stats.toString(common_config.stats));
        console.log('Build complete.');
    }
});


