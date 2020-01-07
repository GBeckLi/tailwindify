"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var path_1 = __importDefault(require("path"));
var shelljs_1 = require("shelljs");
var util_1 = require("../../../lib/util");
var angular_template_json_1 = __importDefault(require("../../../lib/angular-template.json"));
var utils_1 = require("../../utils");
var angularJson = path_1.default.resolve('./angular.json');
function rewriteAngularJson() {
    return new Promise(function (resolve) {
        var angularConfig = utils_1.getAngularConfig();
        var projectName = utils_1.getTargetProjectName();
        angularConfig.projects[projectName].architect = util_1.deepAssign(angular_template_json_1.default.architect, angularConfig.projects[projectName].architect);
        new shelljs_1.ShellString(JSON.stringify(angularConfig, null, 2)).to(angularJson);
        resolve();
    });
}
exports.rewriteAngularJson = rewriteAngularJson;
