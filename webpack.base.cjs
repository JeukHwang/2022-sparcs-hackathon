const path = require("path");

module.exports = {
    devtool: "inline-source-map",
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                use: [{
                    loader: "ts-loader",
                    options: { configFile: "dist.tsconfig.json" },
                }],
                exclude: /node_modules/,
            },
        ],
    },
    resolve: { extensions: [".tsx", ".ts", ".js"] },
    output: { path: path.resolve(__dirname, "dist") },
    mode: "development",
};
