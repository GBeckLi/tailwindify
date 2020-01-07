#!/usr/bin/env node

import commander from 'commander';
import { init } from '../packages/commands/init';
import { remove } from '../packages/commands/remove';
import { test } from '../packages/commands/test';

const program = new commander.Command();

program
  .version('1.0.15', '-v, --version');

program.command('init')
  .description('initialize your tailwindcss project')
  .action(init);

program.command('remove')
  .description('remove tailwindcss dependencies')
  .action(remove);

program.command('test')
  .description('Test')
  .action(test);

program.parse(process.argv);
