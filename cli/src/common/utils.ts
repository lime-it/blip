import {MachineSharedFolder} from '../drivers/driver'
import {readFile, writeFile, existsSync} from 'fs-extra'
import * as YAML from 'yaml'
import {environment} from '../environment'

export function environmentCwd() {
  return process.cwd()
}

export function envrionmentConfigPath() {
  return `${environmentCwd()}/blip.yml`
}
export function envrionmentDataPath() {
  return `${environmentCwd()}/.blip`
}

export async function readProjectModel(): Promise<ProjectModel> {
  return YAML.parse(await readFile(envrionmentConfigPath(), 'utf8')) as ProjectModel
}
export async function saveProjectModel(model: ProjectModel): Promise<void> {
  await writeFile(envrionmentConfigPath(), YAML.stringify(model))
}

export interface ProjectMachineModel{
    mirror: null|string[];
    domains: string[];
    sharedFolders: MachineSharedFolder[];
}
export interface ProjectModel{
    version: string;
    machines: {[key: string]: ProjectMachineModel};
}

export function environmentGlobalConfigPath() {
  return `${environment.basePath}/config.yml`
}

export async function saveGlobalBlipModel(model: GlobalBlipModel): Promise<void> {
  await writeFile(environmentGlobalConfigPath(), YAML.stringify(model))
}
export async function readGlobalBlipModel(): Promise<GlobalBlipModel> {
  if (!existsSync(environmentGlobalConfigPath()))
    await saveGlobalBlipModel({links: {}})
  return YAML.parse(await readFile(environmentGlobalConfigPath(), 'utf8')) as GlobalBlipModel
}

export interface GlobalBlipModel {
    links: {[key: string]: LinkModel};
}

export interface LinkModel{
    gitRemoteFetchUrl?: string;
    path: string;
}

export async function handleLink(linkName: string, fn: () => Promise<any>): Promise<any> {
  const cwd = process.cwd()
  if (linkName) {
    const config = await readGlobalBlipModel()

    if (config.links[linkName])
      process.chdir(config.links[linkName].path)
  }

  return fn().then(p => {
    process.chdir(cwd)
    return p
  })
}
