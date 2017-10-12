//import path module to resolve filepaths
const path = require('path');
const fs = require('fs');
const webpack = require('webpack');

const config = [{
  entry: {
    //if you have a new entry point for a new page, add it here
    customerApp: path.resolve(__dirname, 'client/src/customerIndex.jsx'),
    queueinfo: path.resolve(__dirname, 'client/src/queueinfoIndex.jsx'),
    managerApp: path.resolve(__dirname, 'client/src/managerIndex.jsx'),
    managerLogin: path.resolve(__dirname, 'client/src/managerLoginIndex.jsx')
  },
  output: {
    path: path.resolve(__dirname, 'client/dist/js'),
    filename: '[name]-bundle.js',
    publicPath: '../js'
  },
  module: {
    loaders: [
      {
        test: /\.jsx$/,
        loader: 'babel-loader',
        exclude: /node_modules/
      },
      {
        test: /\.css$/,
        loader: 'style-loader!css-loader'
      },
      {
        test: /\.(png|jpg|gif|svg|eot|ttf|woff|woff2)$/,
        loader: 'file-loader?name=/assets/[name].[ext]'
      }
    ],
  },
  plugins: [
    new webpack.ProvidePlugin({
      $: 'jquery',
      jQuery: 'jquery',
      bootstrap: 'bootstrap'
    })
  ]
}, {
  entry: path.resolve(__dirname, 'server', 'index.js'),
  output: {
    path: path.resolve(__dirname, 'server'),
    filename: 'server.bundle.js'
  },
  target: 'node',
  // keep node_module paths out of the bundle
  externals: fs.readdirSync(path.resolve(__dirname, 'node_modules')).concat([
    'react-dom/server', 'react/addons',
  ]).reduce(function (ext, mod) {
    ext[mod] = 'commonjs ' + mod
    return ext
  }, {}),
  node: {
    __filename: true,
    __dirname: true
  },
  module: {
    loaders: [
      { test: /\.jsx*$/, exclude: /node_modules/, loader: 'babel-loader?presets[]=es2015&presets[]=react' }
    ]
  }
}];

module.exports = config;
