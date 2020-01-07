import path from 'path';
import shell from 'shelljs';

export function rewriteStyle(rootDir: string): Promise<void> {
  return new Promise((resolve) => {
    const styleTemplate = path.join(__dirname, '../../templates/style.template');
    const styleFiles = shell
      .find(path.resolve(rootDir, './src'))
      .filter((fileName: string) => fileName.match(/styles\.(scss|less|css)$/));

    styleFiles.forEach((file) => {
      shell.cat(styleTemplate, file)
        .to(file);
    });
    resolve();
  });
}
