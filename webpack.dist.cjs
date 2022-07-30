const path = require("path");
const webpackBase = require("./webpack.base.cjs");

const webpackDist = webpackBase;
webpackDist.entry = path.resolve(__dirname, "./code/client/index.ts");
webpackDist.output.filename = "bundle.js";
module.exports = webpackDist;
