/** @type {import('jest').Config} */
module.exports = {
  testEnvironment: "jsdom",
  transformIgnorePatterns: ["node_modules/(?!mirador)/", "node_modules/pdiiif"],
  setupFilesAfterEnv: ["@testing-library/jest-dom", "./setupTests"],
  //   collectCoverage: true,
  //   coverageDirectory: "coverage",
  //   verbose: true,
  //   testRegex: "(/tests/.*|\\.(test|spec))\\.jsx?$",
  //   moduleFileExtensions: ["js", "json", "jsx", "node"],
  //   coverageThreshold: {
  //     global: {
  //       branches: 30,
  //       functions: 90,
  //       lines: 90,
  //       statements: 90,
  //     },
  //   },
  //   //   setupFiles: ["./setupTests"],
};
