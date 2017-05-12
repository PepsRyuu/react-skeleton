var path = require('path');
var deepClone = require('lodash.clonedeep');

var config = {
    loaders: {
        rules: [{
            enforce: 'pre',
            test: /\.js$/,
            loader: 'eslint-loader',
            exclude: /node_modules/
        }, {
            test: /\.js$/,
            include: /(src|test)/,
            loader: 'babel-loader',
            query: {
                presets: ["react", ["es2015", {"modules": false}]],
                plugins: [
                    ["transform-es2015-modules-commonjs-simple", {
                        "noMangle": true
                    }]
                ]
            }
        }, {
            test: /\.scss$/,
            loaders: ['style-loader', 'css-loader', 'sass-loader']
        }]
    },
    externals: {
        'react/lib/ExecutionEnvironment': true,
        'react/lib/ReactContext': true,
        'react/addons': true
    },
    stats: {
        assets: true,
        modules: false,
        timings: false,
        hash: false,
        chunks: false,
        version: false
    }
};

module.exports = Object.assign({}, config, {
    clone: function (name) {
        var c = deepClone(config);
        c.output = {
            path: __dirname + '/../target' + (name === 'test'? '' : '/dist'),
            publicPath: '/',
            filename: name + '.bundle.js'
        };

        if (name === 'test') {
            c.loaders.rules[1].query.plugins.push('istanbul');
        }

        return c;
    }
});