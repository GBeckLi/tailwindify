"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var shelljs_1 = __importStar(require("shelljs"));
var path_1 = __importDefault(require("path"));
var chalk_1 = __importDefault(require("chalk"));
var angular_template_json_1 = __importDefault(require("../../lib/angular-template.json"));
var util_1 = require("../../lib/util");
var initShell = "\n  yarn add tailwindcss@latest -S\n  yarn add autoprefixer -S\n  yarn add postcss-import -D\n  yarn add postcss-loader -D\n  yarn add postcss-scss -D\n  yarn add @angular-builders/custom-webpack -D\n  yarn add @fullhuman/postcss-purgecss -D\n";
var angularJson = path_1.default.resolve('./angular.json');
function installDependencies() {
    var res = shelljs_1.default.exec(initShell);
    if (res.code !== 0) {
        shelljs_1.default.echo('Error: Yarn add Tailwindcss Failed!');
        shelljs_1.default.exit(1);
    }
}
function rewriteAngularJson() {
    shelljs_1.default.echo(chalk_1.default.red('Rewrite angular.json'));
    var content = shelljs_1.default.cat(angularJson);
    if (content.code !== 0) {
        shelljs_1.default.echo('Error: angular.json not exist');
        shelljs_1.default.exit(1);
    }
    var json = JSON.parse(content);
    var projectName = json.defaultProject;
    json.projects[projectName].architect = util_1.deepAssign(angular_template_json_1.default.architect, json.projects[projectName].architect);
    new shelljs_1.ShellString(JSON.stringify(json, null, 2)).to(angularJson);
}
function rewriteStyle() {
    var styleTemplate = path_1.default.join(__dirname, '../templates/style.template');
    var styleFiles = shelljs_1.default.find(path_1.default.resolve('./src'))
        .filter(function (file) { return file.match(/styles\.(scss|less|css)$/); });
    styleFiles.forEach(function (file) {
        shelljs_1.default.cat(styleTemplate, file).to(file);
    });
}
function writeWebpackConfig() {
    var webpackDevConfig = path_1.default.join(__dirname, '../templates/webpack.config.dev.template');
    var webpackProdConfig = path_1.default.join(__dirname, '../templates/webpack.config.prod.template');
    shelljs_1.default.cat(webpackDevConfig).to(path_1.default.resolve('./webpack.config.dev.js'));
    shelljs_1.default.cat(webpackProdConfig).to(path_1.default.resolve('./webpack.config.prod.js'));
}
function init() {
    shelljs_1.default.echo(chalk_1.default.red('Install dependencies ---'));
    installDependencies();
    rewriteAngularJson();
    writeWebpackConfig();
    rewriteStyle();
}
exports.init = init;
