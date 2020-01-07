"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var path_1 = __importDefault(require("path"));
var shelljs_1 = __importDefault(require("shelljs"));
function writeWebpackConfig(rootDir) {
    return new Promise(function (resolve) {
        var webpackDevConfig = path_1.default.join(__dirname, '../../templates/webpack.config.dev.template');
        var webpackProdConfig = path_1.default.join(__dirname, '../../templates/webpack.config.prod.template');
        console.log(path_1.default.resolve(rootDir, './webpack.config.dev.js'));
        shelljs_1.default.cat(webpackDevConfig)
            .to(path_1.default.resolve(rootDir, './webpack.config.dev.js'));
        shelljs_1.default.cat(webpackProdConfig)
            .to(path_1.default.resolve(rootDir, './webpack.config.prod.js'));
        resolve();
    });
}
exports.writeWebpackConfig = writeWebpackConfig;
