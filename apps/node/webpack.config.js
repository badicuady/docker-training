const TerserPlugin = require("terser-webpack-plugin");

const isProduction = process.env.NODE_ENV == "production";

const config = {
    entry: ["./index.js"],
    output: {
        filename: "publish.js"
    },
    target: "node",
    optimization: {
        minimize: true,
        minimizer: [new TerserPlugin({ terserOptions: { mangle: false } })],
    },
};

module.exports = () => {
    if (isProduction) {
        config.mode = "production";
    } else {
        config.mode = "development";
    }
    return config;
};
