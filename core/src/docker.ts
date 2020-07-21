import execa = require('execa');
import {DockerMachineEnv} from './docker-machine'
import { ToolingDependecy } from './model';
import { CLIError } from '@oclif/errors';

export interface DockerPsResult{
    id?: string;
    image?: string;
    command?: string;
    createdAt?: string;
    runningFor?: string;
    ports?: string;
    status?: string;
    size?: string;
    names?: string;
    labels?: string;
    mounts?: string;
    networks?: string;
}

export interface DockerTool extends ToolingDependecy{
  ps(machineEnvVars: DockerMachineEnv, ...fields: (keyof DockerPsResult)[]): Promise<DockerPsResult[]>;
}

class DockerToolImpl implements DockerTool {
  async isPresent(): Promise<boolean> {
    const {exitCode} = await execa('docker', ['-v']);
    return exitCode == 0;
  }
  async ensurePresent(): Promise<void> {
    if(await this.isPresent() == false)
      throw new CLIError(`Docker is missing from the current environment. Please check https://docs.docker.com/engine/install/`);
  }

  async ps(machineEnvVars: DockerMachineEnv, ...fields: (keyof DockerPsResult)[]): Promise<DockerPsResult[]> {
    fields = fields && fields.length > 0 ? fields : ['id', 'image', 'command', 'createdAt', 'runningFor', 'ports', 'status', 'size', 'names', 'labels', 'mounts', 'networks']
    const format = fields.map(p => p === 'id' ? '{{.ID}}' : `{{.${(p.charAt(0).toUpperCase() + p.substring(1))}}}`).join('|')

    const {stdout} = await execa('docker', ['ps', '--format', format], {env: machineEnvVars as any || process.env })
    return stdout.split('\n').filter(p => p.length > 0).map(row => {
      const item: DockerPsResult = {}
      row.split('|').forEach((value, i) => {
        item[fields[i]] = value
      })
      return item
    })
  }
}

export const Docker:DockerTool = new DockerToolImpl();