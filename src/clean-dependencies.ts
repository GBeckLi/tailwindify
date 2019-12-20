import { exec, ExecException } from 'child_process';
import * as path from 'path';

const installShell = path.join(__dirname, '../bin/clean.sh');

export default async function clean(): Promise<string> {
  return new Promise((resolve, reject) => {
    exec(installShell, (err: ExecException | null, stdout: string, stderr: string): void => {
      if (err) {
        reject(err);
      }
      resolve(stdout);
    });
  });
}
