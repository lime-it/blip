import { MachineSharedFolder } from '../drivers/driver';
import { readFile, writeFile } from 'fs';
import * as YAML from 'yaml'

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

export function envrionmentCwd(){
    return process.cwd();
}

export function envrionmentConfigPath(){
    return `${envrionmentCwd()}/blip.yml`;
}
export function envrionmentDataPath(){
    return `${envrionmentCwd()}/.blip`;
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