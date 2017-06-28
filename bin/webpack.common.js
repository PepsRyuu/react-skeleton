module.exports = {
    output: {
        path: __dirname + '/../target/dist',
        publicPath: '/',
        filename: 'app.bundle.js'
    },
    loaders: {
        rules: [{
            enforce: 'pre',
            test: /\.js$/,
            loader: 'eslint-loader',
            exclude: /node_modules/
        }, {
            test: /\.js$/,
            include: /(src|test)/,
            loader: 'babel-loader'
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