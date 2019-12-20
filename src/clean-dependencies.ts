import { exec, ExecException } from 'child_process';

const cleanShell = `
  yarn remove tailwindcss -S
  yarn remove postcss-loader postcss-import -S
`;

export default async function clean(): Promise<string> {
  return new Promise((resolve, reject) => {
    exec(cleanShell, (err: ExecException | null, stdout: string): void => {
      if (err) {
        reject(err);
      }
      resolve(stdout);
    });
  });
}
