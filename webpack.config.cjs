const path = require("path");

module.exports = (env, options) => {
  return {
    mode: options.mode,
    entry: "./src/index.js",
    output: {
      path: path.resolve(__dirname, "dist"),
      filename: "MiradorPDIIIFPlugin.min.js",
      publicPath: "/",
      library: {
        name: "MiradorPDIIIFPlugin",
        type: "umd",
        export: "default",
      },
    },
    resolve: {
      extensions: [".js", ".jsx"],
    },
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
  };
};
