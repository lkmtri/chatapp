module.exports = {
    entry: [
      'babel-polyfill',
      './client/app.js'
    ],
    output: {
        path: __dirname + '/dist',
        filename: '/scripts/bundle.js'
    },

    module: {
      loaders: [
        {
          test: /\.jsx?$/,
          exclude: /(node_modules|bower_components)/,
          loader: 'babel', // 'babel-loader' is also a legal name to reference
          query: {
            presets: ['es2015', 'stage-0', 'react'],
            plugins: ['transform-decorators']
          }
        },
        // { test: /\.css$/, loader: "style-loader!css-loader" }
        {
          test: /\.css$/,
          loaders: [
              'style-loader?sourceMap',
              'css-loader?modules&importLoaders=1&localIdentName=[path]___[name]__[local]___[hash:base64:5]'
          ]
        }
      ]
    }
};
