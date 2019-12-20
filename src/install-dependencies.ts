import { exec, ExecException } from 'child_process';

const installShell = `
  yarn add tailwindcss -S
  yarn add postcss-loader postcss-import -D
`;

export default async function install(): Promise<string> {
  return new Promise((resolve, reject) => {
    exec(installShell, (err: ExecException | null, stdout: string): void => {
      if (err) {
        reject(err);
      }
      resolve(stdout);
    });
  });
}
