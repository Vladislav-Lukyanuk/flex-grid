const path = require("path");
const webpack = require("webpack");

module.exports = {
  devtool: "source-map",
  entry: "./lib/index.js",
  plugins: [
    new webpack.optimize.UglifyJsPlugin({
      minimize: true,
      sourceMap: true,
      include: /\.min\.js$/,
    }),
  ],
  resolve: {
    modules: [path.resolve("src"), path.resolve("node_modules")],
    extensions: [".tsx", ".ts"],
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: "ts-loader",
        exclude: /node_modules/,
      },
    ],
  },
  output: {
    path: path.resolve(__dirname, "lib"),
    filename: "index.js",
    libraryTarget: "umd",
    library: "flex-area-grid",
    umdNamedDefine: true,
  },
};
