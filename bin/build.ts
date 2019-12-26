import shell, { ShellString } from 'shelljs';
import chalk from 'chalk';
import path from 'path';

function tsc(): void {
  // build ts文件
  const res: ShellString = shell.exec('yarn run tsc');
  if (res.code !== 0) {
    shell.echo(chalk.red('Error: build failed'));
  }
}

function copyTemplates(): void {
  // 拷贝模板文件
  shell.echo(chalk.green('开始拷贝模板文件!'));
  const sourcePath = path.join(__dirname, '../packages/templates');
  const targetPath = path.join(__dirname, '../dist/packages/templates/');

  shell.mkdir('-p', targetPath);

  const templateFiles = shell.find(sourcePath)
    .filter((file) => file.match(/.template$/));

  shell.cp('-Rf', templateFiles, path.join(targetPath));
}

function createPackageJson(): void {
  // 新建package.json
  const keys: string[] = [
    'name',
    'version',
    'main',
    'license',
    'author',
    'description',
    'bin',
    'keywords',
    'dependencies',
  ];
  const packageJsonFile = path.join(__dirname, '../package.json');
  const packageJsonString = shell.cat(packageJsonFile);
  const packageJson = JSON.parse(packageJsonString);
  const newJson: any = {};
  keys.forEach((key) => {
    if (key === 'main') {
      newJson[key] = './bin/index.js';
    } else if (key === 'bin') {
      newJson[key] = packageJson[key];
      newJson[key].twify = './bin/index.js';
    } else {
      newJson[key] = packageJson[key];
    }
  });
  new ShellString(JSON.stringify(newJson, null, 2))
    .to(path.join(__dirname, '../dist/package.json'));
}

function addExcutableAuth(): void {
  // 添加执行权限
  const binPath = path.join(__dirname, '../dist/bin');
  const jsFile = shell.find(binPath);
  jsFile.forEach((file) => {
    shell.chmod('+x', file);
  });
}

((): void => {
  shell.rm('-rf', path.join(__dirname, '../dist'));
  tsc();
  copyTemplates();
  createPackageJson();
  addExcutableAuth();
})();
