import { MachineSharedFolder } from '../drivers/driver';
import { readFile, writeFile, existsSync } from 'fs';
import * as YAML from 'yaml'
import { environment } from '../environment';

export function readFilePromise(path:string):Promise<string>{
    return new Promise<string>((resolve, reject)=>{
        readFile(path,'utf8',(err, data)=>{
            if(err)
                reject(err);
            else
                resolve(data);
        });
    })
}
export function writeFilePromise(path:string, data:string):Promise<void>{
    return new Promise<void>((resolve, reject)=>{
        writeFile(path,data,(err)=>{
            if(err)
                reject(err);
            else
                resolve();
        });
    })
}

export function environmentCwd(){
    return process.cwd();
}

export function envrionmentConfigPath(){
    return `${environmentCwd()}/blip.yml`;
}
export function envrionmentDataPath(){
    return `${environmentCwd()}/.blip`;
}

export async function readProjectModel():Promise<ProjectModel>{
    return YAML.parse(await readFilePromise(envrionmentConfigPath())) as ProjectModel;
}
export async function saveProjectModel(model:ProjectModel):Promise<void>{
    await writeFilePromise(envrionmentConfigPath(), YAML.stringify(model));
}

export interface ProjectMachineModel{
    mirror:null|string[];
    domains:string[];
    sharedFolders:MachineSharedFolder[];
}
export interface ProjectModel{
    version:string;
    machines:{[key:string]:ProjectMachineModel}
}

export function environmentGlobalConfigPath(){
    return `${environment.basePath}/config.yml`;
}

export async function readGlobalBlipModel():Promise<GlobalBlipModel>{
    if(!existsSync(environmentGlobalConfigPath()))
        await saveGlobalBlipModel({links:{}});
    return YAML.parse(await readFilePromise(environmentGlobalConfigPath())) as GlobalBlipModel;
}
export async function saveGlobalBlipModel(model:GlobalBlipModel):Promise<void>{
    await writeFilePromise(environmentGlobalConfigPath(), YAML.stringify(model));
}

export interface GlobalBlipModel {
    links: {[key: string]: LinkModel};
}

export interface LinkModel{
    gitRemoteFetchUrl?: string; 
    path: string;
}

export async function handleLink(linkName:string, fn:()=>Promise<any>):Promise<any>{
    
    let cwd = process.cwd();
    if(linkName){
      const config = await readGlobalBlipModel();
  
      if(config.links[linkName])
        process.chdir(config.links[linkName].path);
    }

    return fn().then(p=>{
        process.chdir(cwd);
        return p;
    });
}