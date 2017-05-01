const
  path = require("path"),
  ExtractTextPlugin = require("extract-text-webpack-plugin"),
  CopyWebpackPlugin = require("copy-webpack-plugin"),
  webpack = require("webpack");

const
  srcDir = path.join(__dirname, "src"),
  appDir = path.join(__dirname, "build");

var cfg = {
  devServer: {
    inline: true,
    proxy: {
      "*": {
        target: "http://localhost:3000/",
        secure: false,
      },
    },
  },
  entry: srcDir + "/index.js",
  output: {
    path: appDir,
    filename: "js/bundle.js",
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new ExtractTextPlugin("[name].css"),
    new CopyWebpackPlugin([
      { from: srcDir + "/js/ext", to: appDir + "/js" },
      { from: srcDir + "/index.html", to: appDir + "/index.html" },
      { from: srcDir + "/assets/icons", to: appDir + "/build/" },
      { from: srcDir + "/assets/fonts", to: appDir + "/fonts" },
      { from: __dirname + "/app.js", to: appDir + "/app.js" },
      { from: __dirname + "/package.json", to: appDir + "/package.json" },
    ]),
  ],
  module: {
    loaders: [{
      test: /\.js$/,
      include: srcDir,
      loaders: ["babel"],
    },{
      test: /\.s[ac]ss$/,
      loaders: ["style", "css", "sass"],
    },{
      test: /\.(eot|svg|ttf|woff|woff2)(\?\w+)?$/,
      loader: "file?name=fonts/[name].[ext]",
    }],
  },
  resolve: {
    extensions: ["", ".js", ".scss", ".sass"],
    root: [srcDir],
  },
  node: {
    __dirname: false,
    __filename: false,
  },
};

module.exports = cfg;
