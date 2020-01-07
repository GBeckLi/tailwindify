
import path from 'path';
import shell, { ShellString } from 'shelljs';
import inquire from 'inquirer';

const angularJsonPath = path.resolve('./angular.json');
let angularJson: any;
let targetProject: any;
let targetProjectName = '';

function getAngularJson(): void {
  const content: ShellString = shell.cat(angularJsonPath);
  if (content.code !== 0) {
    shell.echo('Error: angular.json not exist');
    shell.exit(1);
  }
  angularJson = JSON.parse(content);
}
getAngularJson();

function getProjects(): any {
  return angularJson ? angularJson.projects : {};
}

export async function choiceProject(): Promise<void> {
  const projects = getProjects();
  const names = Object.keys(projects);
  if (names.length > 1) {
    try {
      const answer = await inquire
        .prompt({
          type: 'list',
          name: 'project',
          message: 'Choice the project which you want tailwindify.',
          choices: [...names],
        });
      targetProjectName = answer.project;
      targetProject = projects[targetProjectName];
    } catch (e) {
      console.log(e);
    }
  } else {
    targetProjectName = names[0] || angularJson.defaultProject;
  }
}

export function getRootpath(): string {
  return targetProject ? targetProject.root : path.resolve(__dirname, '');
}

export function getAngularConfig(): any {
  return angularJson || {};
}

export function getTargetProject(): any {
  return targetProject;
}

export function getTargetProjectName(): string {
  return targetProjectName;
}
