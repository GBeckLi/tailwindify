#!/usr/bin/env node
import clear from 'clear';
import figlet from 'figlet';
import chalk from 'chalk';
import commander from 'commander';
import install from './src/install-dependencies';
import clean from './src/clean-dependencies';

const program = new commander.Command();

clear();
console.log(
  chalk.red(
    figlet.textSync('twify-cli', {
      horizontalLayout: 'full',
    }),
  ),
);

program.version('0.0.1', '-v, --version')
  .description('Tailwindify Your Project!')
  .option('-i, --install', 'install dependencies')
  .action(() => {
    install();
  })
  .option('-c, --clean', 'clear relationed dependencies')
  .action(() => {
    clean();
  })
  .parse(process.argv);
