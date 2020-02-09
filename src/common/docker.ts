import execa = require('execa');
import { DockerMachineEnv } from './docker-machine';

export interface DockerPsResult{
    id?:string;
    image?:string;
    command?:string;
    createdAt?:string;
    runningFor?:string;
    ports?:string;
    status?:string;
    size?:string;
    names?:string;
    labels?:string;
    mounts?:string;
    networks?:string;
}

export class Docker{

    constructor(environment:DockerMachineEnv) {
        this.setEnvironment(environment);
    }

    private _environment:any={};
    setEnvironment(environment:DockerMachineEnv){
        this._environment=environment||{};
    }

    async ps(...fields:(keyof DockerPsResult)[]):Promise<DockerPsResult[]>{
        fields=fields && fields.length>0 ? fields : ['id','image','command','createdAt','runningFor','ports','status','size','names','labels','mounts','networks'];
        const format = fields.map(p=>p=='id'?'{{.ID}}':`{{.${(p.charAt(0).toUpperCase()+p.substring(1))}}}`).join('|');
          
        const {stdout} = await execa('docker', ['ps', '--format', format],{env:this._environment as any});
        return stdout.split('\n').filter(p=>p.length>0).map(row=>{
          const item:DockerPsResult={};
          row.split('|').forEach((value, i)=>{
            item[fields[i]]=value;
          });
          return item;
        });
    }
}