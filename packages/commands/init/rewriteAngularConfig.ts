import path from 'path';
import { ShellString } from 'shelljs';
import {
  deepAssign,
} from '../../../lib/util';
import angularTemplateJson from '../../../lib/angular-template.json';
import {
  getAngularConfig,
  getTargetProjectName,
} from '../../utils';

const angularJson = path.resolve('./angular.json');

export function rewriteAngularJson(): Promise<void> {
  return new Promise((resolve) => {
    const angularConfig = getAngularConfig();
    const projectName: string = getTargetProjectName();
    angularConfig.projects[projectName].architect = deepAssign(
      angularTemplateJson.architect,
      angularConfig.projects[projectName].architect,
    );
    new ShellString(JSON.stringify(angularConfig, null, 2)).to(angularJson);
    resolve();
  });
}
