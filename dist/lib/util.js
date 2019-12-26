"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function deepAssign(source, target) {
    var newTarget = target ? JSON.parse(JSON.stringify(target)) : {};
    Object.keys(source).forEach(function (key) {
        var type = Object.prototype.toString.call(source[key]);
        if (type === '[object Object]') {
            newTarget[key] = deepAssign(source[key], newTarget[key]);
        }
        else {
            newTarget[key] = source[key];
        }
    });
    return newTarget;
}
exports.deepAssign = deepAssign;
