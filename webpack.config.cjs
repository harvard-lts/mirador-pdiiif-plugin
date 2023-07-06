const path = require("path");
const webpack = require("webpack");

module.exports = (env, options) => {
  return {
    mode: options.mode,
    entry: "./demo/demoEntry.js",
    output: {
      path: path.resolve(__dirname, "demo", "dist"),
      filename: "demo.js",
      publicPath: "/",
    },
    resolve: {
      extensions: [".js", ".jsx"],
    },
    plugins: [
      new webpack.IgnorePlugin({
        resourceRegExp: /@blueprintjs\/(core|icons)/, // ignore optional UI framework dependencies
      }),
    ],
    module: {
      rules: [
        {
          test: /\.(js|jsx)$/,
          exclude: /node_modules/,
          use: {
            loader: "babel-loader",
          },
          resolve: {
            fullySpecified: false,
          },
        },
      ],
    },
    devServer: {
      static: [
        {
          directory: path.join(__dirname, "demo"),
        },
        {
          directory: path.join(__dirname, "demo", "dist"),
        },
      ],
      compress: true,
      port: 9000,
      historyApiFallback: true,
      client: {
        overlay: false,
      },
    },
  };
};
