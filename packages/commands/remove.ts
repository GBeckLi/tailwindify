import shell, { ShellString } from 'shelljs';
import path from 'path';

const removeShell = `
  yarn remove tailwindcss -S
  yarn remove postcss-import -D
  yarn remove postcss-loader -D
  yarn remove postcss-scss -D
  yarn remove @angular-builders/custom-webpack -S
  yarn remove @fullhuman/postcss-purgecss -D
`;

function uninstallDependencies(): void {
  const res: ShellString = shell.exec(removeShell);
  if (res.code !== 0) {
    shell.echo('Error: Failed to Remove Dependencies!');
    shell.exit(1);
  }
}

function removeWebpackConfig(): void {
  const webpackDevConfig = path.resolve('./webpack.config.dev.js');
  const webpackProdConfig = path.resolve('./webpack.config.prod.js');
  shell.rm(webpackDevConfig);
  shell.rm(webpackProdConfig);
}

export function remove(): void {
  uninstallDependencies();
  removeWebpackConfig();
}
