import * as execa from 'execa'

export type DockerMachineListField='name'|'active'|'driver'|'state'|'url'|'swarm'|'docker'|'errors';

export interface DockerMachineListResult{
  name?:string;
  active?:string;
  activeHost?:string;
  activeSwarm?:string;
  driverName?:string;
  state?:string;
  URL?:string;
  swarm?:string;
  error?:string;
  dockerVersion?:string;
  responseTime?:string;
}

export interface DockerMachineEnv{
  DOCKER_TLS_VERIFY: string;
  DOCKER_HOST: string;
  DOCKER_CERT_PATH:string;
  DOCKER_MACHINE_NAME: string;
  COMPOSE_CONVERT_WINDOWS_PATHS: string;
}

export function getMachineAddress(env:DockerMachineEnv):string{
  return (/^[^:]+:\/\/([0-9\.]+):[0-9]+$/.exec(env.DOCKER_HOST)||[])[1];
}


export interface DockerMachineCreateOptions{
  driver:'virtualbox';
  engineRegistryMirror:string[]|null;
  engineInsecureRegistry:string[]|null;
}

const defaultOptions:DockerMachineCreateOptions={
  driver:'virtualbox',
  engineRegistryMirror:null,
  engineInsecureRegistry:null
}

export class DockerMachine{
  static async ls(...fields:(keyof DockerMachineListResult)[]){
    fields=fields && fields.length>0 ? fields : ['name','active','activeHost','activeSwarm','driverName','state','URL','swarm','error','dockerVersion','responseTime'];
    const format = fields.map(p=>`{{.${(p.charAt(0).toUpperCase()+p.substring(1))}}}`).join('|');
      
    const {stdout} = await execa('docker-machine', ['ls', '--format' , format]);
    return stdout.split('\n').filter(p=>p.length>0).map(row=>{
      const item:DockerMachineListResult={};
      row.split('|').forEach((value, i)=>{
        item[fields[i]]=value;
      });
      return item;
    });
  }
  static async create(name:string, options:Partial<DockerMachineCreateOptions>=defaultOptions, direverOptions:{[key:string]:string}={}){
    if(!name || name.trim().length==0)
      throw new Error(`'name' must be set`);
    
    const commandOptions:string[]=[];
    Object.keys(options).filter(p=>!!(<any>options)[p]).map(p=>({key:p, option:"--"+p.replace(/([A-Z])/g,"-$1").toLowerCase()})).forEach(p=>{
      if(Array.isArray((options as any)[p.key])){
        (options as any)[p.key].forEach((value:string)=>{
          commandOptions.push(p.option);
          commandOptions.push(value);
        })
      }
      else{
        commandOptions.push(p.option);
        if((options as any)[p.key]!==true)
          commandOptions.push((options as any)[p.key]);
      }
    });

    Object.keys(direverOptions).forEach(key=>{
      commandOptions.push(key);
      if(direverOptions[key]!==null)
        commandOptions.push(direverOptions[key]);
    });
    
    await execa('docker-machine', ['create', name, ...commandOptions ]);
  }
  
  static async env(name:string, shell:string = 'bash'){
    if(!name || name.trim().length==0)
      throw new Error(`'name' must be set`);

      const {stdout} = await execa('docker-machine', ['env', name, '--shell', shell]);
    
      const regex=/^export\s+([^=]+)=\"([^\"]+)\"$/;
      const vars = stdout.split('\n').filter(p=>!p.startsWith('#')).reduce((acc,line)=>{
        const m = regex.exec(line)||[];
        acc[m[1]]=m[2];
        return acc;
      },{} as any);

      return vars as DockerMachineEnv;
  }

  static async envStdout(name:string, shell:string = 'bash'){
    if(!name || name.trim().length==0)
      throw new Error(`'name' must be set`);

      const {stdout} = await execa('docker-machine', ['env', name, '--shell', shell]);
    
      return stdout;
  }

  static async start(name:string){
    if(!name || name.trim().length==0)
      throw new Error(`'name' must be set`);

      const {stdout} = await execa('docker-machine', ['start', name]);
  }
  static async stop(name:string){
    if(!name || name.trim().length==0)
      throw new Error(`'name' must be set`);

      const {stdout} = await execa('docker-machine', ['stop', name]);
  }
  static async remove(name:string){
    if(!name || name.trim().length==0)
      throw new Error(`'name' must be set`);

    const {stdout} = await execa('docker-machine', ['rm', '--force', name]);
  }
}