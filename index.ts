#!/usr/bin/env node
import commander from 'commander';
import install from './src/install-dependencies';
import clean from './src/clean-dependencies';

const program = new commander.Command();

program.version('0.0.1', '-v, --version')
  .description('Tailwindify Your Project!')
  .option('-i, --install', 'install dependencies')
  .action(async () => {
    await install();
  })
  .option('-c, --clean', 'clear relationed dependencies')
  .action(async () => {
    await clean();
  })
  .parse(process.argv);
