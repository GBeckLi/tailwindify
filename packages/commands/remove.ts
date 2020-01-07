import shell, { ShellString } from 'shelljs';
import path from 'path';

const removeShell = `
  npm remove tailwindcss
  npm remove postcss-import
  npm remove postcss-loader
  npm remove postcss-scss
  npm remove autoprefixer
  npm remove @angular-builders/custom-webpack
  npm remove @fullhuman/postcss-purgecss
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
