#!/usr/bin/env node

import commander from 'commander';
import { init } from '../packages/commands/init/init';
import { remove } from '../packages/commands/remove/remove';

const program = new commander.Command();

program
  .version('0.0.1', '-v, --version');

program.command('init')
  .description('initialize your tailwindcss project')
  .action(init);

program.command('remove')
  .description('remove tailwindcss dependencies')
  .action(remove);

program.parse(process.argv);
