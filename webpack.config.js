const path = require("path");

module.exports = {
  entry: "src/index.tsx",
  devServer: {
    contentBase: path.join(__dirname, "dist"),
    port: 3001,
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
  resolve: {
    modules: [path.resolve("src"), path.resolve("node_modules")],
    extensions: [".tsx", ".ts", ".js"],
  },
  output: {
    filename: "index.js",
    chunkFilename: "[hash].[id].bundle.js",
    path: path.resolve(__dirname, "dist"),
  },
};
