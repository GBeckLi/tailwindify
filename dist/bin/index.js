#!/usr/bin/env node
"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var commander_1 = __importDefault(require("commander"));
var init_1 = require("../packages/commands/init");
var remove_1 = require("../packages/commands/remove");
var test_1 = require("../packages/commands/test");
var program = new commander_1.default.Command();
program
    .version('0.0.1', '-v, --version');
program.command('init')
    .description('initialize your tailwindcss project')
    .action(init_1.init);
program.command('remove')
    .description('remove tailwindcss dependencies')
    .action(remove_1.remove);
program.command('test')
    .description('Test')
    .action(test_1.test);
program.parse(process.argv);
