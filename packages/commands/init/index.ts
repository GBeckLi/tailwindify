import shell from 'shelljs';
import chalk from 'chalk';
import { install } from './install';
import { rewriteAngularJson } from './rewriteAngularConfig';
import { rewriteStyle } from './rewriteRootStyle';
import { writeWebpackConfig } from './writeWebpackConfig';
import { choiceProject } from '../../utils';

const ROOT_DIR = process.cwd();

export async function init(): Promise<void> {
  await choiceProject();
  shell.echo(
    chalk.green('=== Install dependencies ==='),
  );
  await install();
  shell.echo(
    chalk.green('===  Rewrite Angular.json ==='),
  );
  await rewriteAngularJson();
  shell.echo(
    chalk.green('===  Write Webpack Config ==='),
  );
  await writeWebpackConfig(ROOT_DIR);
  shell.echo(
    chalk.green('===  Rewrite Root Style File ==='),
  );
  await rewriteStyle(ROOT_DIR);
}
