import shell, { ShellString } from 'shelljs';
import path from 'path';
import chalk from 'chalk';
import angularTemplateJson from '../../lib/angular-template.json';
import {
  deepAssign,
} from '../../lib/util';

const initShell = `
  yarn add tailwindcss@latest -S
  yarn add autoprefixer -S
  yarn add postcss-import -D
  yarn add postcss-loader -D
  yarn add postcss-scss -D
  yarn add @angular-builders/custom-webpack -D
  yarn add @fullhuman/postcss-purgecss -D
`;

const angularJson = path.resolve('./angular.json');

function installDependencies(): void {
  const res: ShellString = shell.exec(initShell);
  if (res.code !== 0) {
    shell.echo('Error: Yarn add Tailwindcss Failed!');
    shell.exit(1);
  }
}

function rewriteAngularJson(): void {
  shell.echo(chalk.red('Rewrite angular.json'));
  const content: ShellString = shell.cat(angularJson);
  if (content.code !== 0) {
    shell.echo('Error: angular.json not exist');
    shell.exit(1);
  }
  const json = JSON.parse(content);
  const projectName = json.defaultProject;
  json.projects[projectName].architect = deepAssign(
    json.projects[projectName].architect,
    angularTemplateJson.architect,
  );
  new ShellString(JSON.stringify(json, null, 2)).to(angularJson);
}

function rewriteStyle(): void {
  const styleTemplate = path.join(__dirname, '../templates/style.template');
  const styleFiles = shell.find(path.resolve('./src'))
    .filter((file) => file.match(/style\.(scss|less|css)$/));
  styleFiles.forEach((file) => {
    shell.cat(styleTemplate, file).to(file);
  });
}

function writeWebpackConfig(): void {
  const webpackDevConfig = path.join(__dirname, '../templates/webpack.config.dev.template');
  const webpackProdConfig = path.join(__dirname, '../templates/webpack.config.prod.template');
  shell.cat(webpackDevConfig).to(path.resolve('./webpack.config.dev.js'));
  shell.cat(webpackProdConfig).to(path.resolve('./webpack.config.prod.js'));
}


export function init(): void {
  shell.echo(chalk.red('Install dependencies ---'));
  installDependencies();
  rewriteAngularJson();
  writeWebpackConfig();
  rewriteStyle();
}
