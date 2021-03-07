const path = require("path");

module.exports = {
  entry: {
    index: "./src/index.tsx",
    flexGrid: "./src/flexGrid/index.ts",
  },
  devtool: "source-map",
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
    filename: "[name].js",
    path: path.resolve(__dirname, "lib"),
  },
};
