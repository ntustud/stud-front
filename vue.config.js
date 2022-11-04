const path = require("path");
const AutoImport = require('unplugin-auto-import/webpack');
const Components = require('unplugin-vue-components/webpack');
const { ElementPlusResolver } = require('unplugin-vue-components/resolvers');

const vueSrc = "./src";

module.exports = {
    configureWebpack: {
        resolve: {
            alias: {
                "@style": path.join(__dirname, vueSrc, "style", "global.scss")
            }
        },
        plugins: [
            AutoImport({
                resolvers: [ElementPlusResolver()],
            }),
            Components({
                resolvers: [ElementPlusResolver()],
            }),
        ],
    },
}