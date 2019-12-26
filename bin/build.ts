import shell, { ShellString } from 'shelljs';
import chalk from 'chalk';
import path from 'path';

// build ts文件
const res: ShellString = shell.exec('yarn run tsc');
if (res.code !== 0) {
  shell.echo(chalk.red('Error: build failed'));
}

// 拷贝模板文件
shell.echo(chalk.green('开始拷贝模板文件!'));
const sourcePath = path.join(__dirname, '../packages/templates');
const targetPath = path.join(__dirname, '../dist/packages/templates/');

shell.mkdir(targetPath);

const templateFiles = shell.find(sourcePath)
  .filter((file) => file.match(/.template$/));

shell.cp('-Rf', templateFiles, path.join(targetPath));

// 添加执行权限

const binPath = path.join(__dirname, '../dist/bin');
const jsFile = shell.find(binPath);
jsFile.forEach((file) => {
  shell.chmod('+x', file);
});
