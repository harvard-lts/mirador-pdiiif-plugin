import { babel } from "@rollup/plugin-babel";

const config = {
  input: "src/index.js",
  output: {
    dir: "dist/es",
    format: "es",
  },
  plugins: [babel({ babelHelpers: "bundled" })],
};

export default config;
