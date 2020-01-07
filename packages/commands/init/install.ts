import path from 'path';
import shell, { ShellString } from 'shelljs';

import { getRootpath } from '../../utils';

const installShell = `
  npm add tailwindcss@latest -S
  npm add autoprefixer -S
  npm add postcss-import -D
  npm add postcss-loader -D
  npm add postcss-scss -D
  npm add @angular-builders/custom-webpack -D
  npm add @fullhuman/postcss-purgecss -D
`;

export async function install(): Promise<void> {
  return new Promise((resolve, reject) => {
    // 安装项目全局依赖
    const res: ShellString = shell.exec(installShell);
    if (res.code !== 0) {
      reject(res);
      shell.echo('Error: Yarn add Dependencies Failed!');
      shell.exit(1);
    }
    resolve();
  });
}
