# mirador-pdiiif-plugin

Mirador plugin for PDIIIF. Currently intended for use with the Harvard implementation of Mirador.

## Requirements

- [NVM](https://github.com/nvm-sh/nvm)

## Setup

1. Run `nvm use` to ensure your version of matches that in the `.nvmrc` file
2. Run `npm i` to install dependencies
3. Use one of the [NPM scripts](#npm-scripts) to perform the actions described below.

## NPM scripts

The following are some useful scripts can be ran using `npm run <script>`. A full list can be seen in [package.json](./package.json)

| Script  | Description                                                                          |
| ------- | ------------------------------------------------------------------------------------ |
| `clean` | Removes the `dist` directories                                                       |
| `build` | Builds the source files into the `./dist` directory                                  |
| `serve` | Runs a local web server where the plugin can be viewed in a vanilla Mirador instance |
| `test`  | Runs the automated test suites                                                       |

## Publishing to NPM

TODO
