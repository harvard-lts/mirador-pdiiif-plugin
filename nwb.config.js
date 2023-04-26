module.exports = {
  type: "react-component",
  npm: {
    esModules: true,
    umd: {
      global: "HarvardTextSearch",
      externals: {
        react: "React",
      },
    },
  },
};
