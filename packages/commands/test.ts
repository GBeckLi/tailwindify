import path from 'path';
import shell from 'shelljs';

import { getRootpath } from '../utils';

export async function test(): Promise<void> {
  const rootPath: string = await getRootpath();
  const originPath: string = path.resolve(__dirname, '');
  console.log(rootPath, originPath);

  shell.cd(rootPath);
  console.log(shell.touch('helloworld.ts'));
  shell.cd(originPath);
  shell.touch('helloworld.ts');
}
