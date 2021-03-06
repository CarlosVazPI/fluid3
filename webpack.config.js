module.exports = {
    entry: './source/app.js',
    output: {
        path: './build',
        filename: 'app.js'
    },
    module: {
        loaders: [
            { test: /\.css$/, loader: 'style!css' },
            { test: /\.js$/, loader: 'babel?presets[]=es2015', exclude: /node_modules/ }
        ]
    }
};
