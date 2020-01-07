import path from 'path';
import shell from 'shelljs';

export function writeWebpackConfig(rootDir: string): Promise<void> {
  return new Promise((resolve) => {
    const webpackDevConfig = path.join(__dirname, '../../templates/webpack.config.dev.template');
    const webpackProdConfig = path.join(__dirname, '../../templates/webpack.config.prod.template');
    console.log(path.resolve(rootDir, './webpack.config.dev.js'));
    shell.cat(webpackDevConfig)
      .to(path.resolve(rootDir, './webpack.config.dev.js'));
    shell.cat(webpackProdConfig)
      .to(path.resolve(rootDir, './webpack.config.prod.js'));
    resolve();
  });
}
