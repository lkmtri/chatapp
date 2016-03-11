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
            presets: ['es2015', 'stage-0']
          }
        }
      ]
    }
};
