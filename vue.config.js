const path = require("path");

const vueSrc = "./src";

module.exports = {
    configureWebpack: {
        resolve: {
            alias: {
                "@style": path.join(__dirname, vueSrc, "style", "global.scss")
            }
        },
    },
}