import shell, { ShellString } from 'shelljs';
import path from 'path';

const removeShell = `
  yarn remove tailwindcss
  yarn remove postcss-import
  yarn remove postcss-loader
  yarn remove postcss-scss
  yarn remove autoprefixer
  yarn remove @angular-builders/custom-webpack
  yarn remove @fullhuman/postcss-purgecss
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
