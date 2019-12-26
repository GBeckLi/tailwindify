"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var shelljs_1 = __importDefault(require("shelljs"));
var path_1 = __importDefault(require("path"));
var removeShell = "\n  yarn remove tailwindcss\n  yarn remove postcss-import\n  yarn remove postcss-loader\n  yarn remove postcss-scss\n  yarn remove autoprefixer\n  yarn remove @angular-builders/custom-webpack\n  yarn remove @fullhuman/postcss-purgecss\n";
function uninstallDependencies() {
    var res = shelljs_1.default.exec(removeShell);
    if (res.code !== 0) {
        shelljs_1.default.echo('Error: Failed to Remove Dependencies!');
        shelljs_1.default.exit(1);
    }
}
function removeWebpackConfig() {
    var webpackDevConfig = path_1.default.resolve('./webpack.config.dev.js');
    var webpackProdConfig = path_1.default.resolve('./webpack.config.prod.js');
    shelljs_1.default.rm(webpackDevConfig);
    shelljs_1.default.rm(webpackProdConfig);
}
function remove() {
    uninstallDependencies();
    removeWebpackConfig();
}
exports.remove = remove;
