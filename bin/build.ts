import shell from 'shelljs';
import chalk from 'chalk';
import path from 'path';

// build ts文件
// const res: ShellString = shell.exec('yarn run tsc');
// if (res.code !== 0) {
//   shell.echo(chalk.red('Error: build failed'));
// }

// 拷贝模板文件
shell.echo(chalk.green('开始拷贝模板文件!'));
const sourcePath = path.join(__dirname, '../packages/templates');
const targetPath = path.join(__dirname, '../dist/packages/templates/');

shell.mkdir(targetPath);

const files = shell.find(sourcePath)
  .filter((file) => file.match(/.template$/));

shell.cp('-Rf', files, path.join(targetPath));
