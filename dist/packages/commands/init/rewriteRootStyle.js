"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var path_1 = __importDefault(require("path"));
var shelljs_1 = __importDefault(require("shelljs"));
function rewriteStyle(rootDir) {
    return new Promise(function (resolve) {
        var styleTemplate = path_1.default.join(__dirname, '../../templates/style.template');
        var styleFiles = shelljs_1.default
            .find(path_1.default.resolve(rootDir, './src'))
            .filter(function (fileName) { return fileName.match(/styles\.(scss|less|css)$/); });
        styleFiles.forEach(function (file) {
            shelljs_1.default.cat(styleTemplate, file)
                .to(file);
        });
        resolve();
    });
}
exports.rewriteStyle = rewriteStyle;
