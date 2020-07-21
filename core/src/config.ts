import {readFile, writeFile, existsSync} from 'fs-extra'
import {join} from 'path';
import * as YAML from 'yaml'
import { BlipWorkspace, GlobalBlipConfiguration } from './model';
import {CLIError} from '@oclif/errors';
import { environment } from './environment';

const currentWorkingDirectory = process.cwd();

export interface BlipConfiguration {
  currentWorkingDir: string;
  workspaceConfigFile: string;
  workspaceConfigPath: string;
  globalConfigFilePath: string;
  isWorkspace: boolean;
  readWorkspace(): Promise<BlipWorkspace>;
  overwriteWorkspace(model:BlipWorkspace):Promise<void>;
  readGlobalConfiguration():Promise<GlobalBlipConfiguration>;
  overwriteGlobalConfiguration(model:GlobalBlipConfiguration):Promise<void>;

  checkInWorkspace<T>(fn:()=>T):T;
}

class BlipConfigurationImpl implements BlipConfiguration{
  get currentWorkingDir():string{
    return currentWorkingDirectory;
  }
  get workspaceConfigFile():string{
    return join(currentWorkingDirectory, "blip.yml");
  }
  get workspaceConfigPath():string{
    return join(currentWorkingDirectory, ".blip");
  }
  get globalConfigFilePath():string{
    return join(environment.configDir, "config.yml");
  }

  get isWorkspace():boolean{
    return existsSync(this.workspaceConfigFile) && existsSync(this.workspaceConfigPath);
  }

  async readWorkspace():Promise<BlipWorkspace>{
    return await this.checkInWorkspace(async ()=>YAML.parse(await readFile(this.workspaceConfigFile, 'utf8')) as BlipWorkspace);
  }

  async overwriteWorkspace(model:BlipWorkspace):Promise<void>{
    return await this.checkInWorkspace(async ()=> await writeFile(this.workspaceConfigFile, YAML.stringify(model)));
  }

  async readGlobalConfiguration():Promise<GlobalBlipConfiguration>{
    if (!existsSync(this.globalConfigFilePath)){
      const conf = {links: {}};
      await this.overwriteGlobalConfiguration(conf);
      return conf;
    }
    else
      return YAML.parse(await readFile(this.globalConfigFilePath, 'utf8')) as GlobalBlipConfiguration
  }

  async overwriteGlobalConfiguration(model:GlobalBlipConfiguration):Promise<void>{
    await writeFile(this.globalConfigFilePath, YAML.stringify(model))
  }
  
  checkInWorkspace<T>(fn:()=>T):T {
    if (!this.isWorkspace)
      throw new CLIError('Not in a blip workspace.');
    else
      return fn();
  }
}

export const BlipConf:BlipConfiguration = new BlipConfigurationImpl();
