import Listr = require('listr');
import { DockerMachine, DockerMachineListResult, DockerMachineEnv, DockerMachineCreateOptions, getMachineAddress } from './docker-machine';
import { EtcHosts } from './etc-hosts';
import { envrionmentCwd, ProjectModel, readProjectModel } from './utils';
import { VirtualboxDriver } from '../drivers/virtualbox.driver';
import { Openssl } from './openssl';
import * as path from 'path';

async function createMachineIfNotExists(name:string, options:Partial<DockerMachineCreateOptions>, driverOptions:{[key:string]:string}):Promise<DockerMachineListResult[]>{
    let machineList = await DockerMachine.ls();
    if(!(machineList as DockerMachineListResult[]).find(p=>p.name==name)){
        await DockerMachine.create(name, options, driverOptions);
        machineList = await DockerMachine.ls();
    }
    
    return machineList;
}

export function machineEnsureCreated(name:string, options:Partial<DockerMachineCreateOptions>, driverOptions:{[key:string]:string}):Listr.ListrTask{
    if(!name || name.trim().length==0)
        throw new Error("'name' must be set");

    return {
        title:`Ensuring machine '${name}' is created`,
        task:async (ctx, task)=>{
            ctx.machineList = await createMachineIfNotExists(name, options, driverOptions);
        }
    };
}

export function machineEnsureActive(name:string):Listr.ListrTask{    
    if(!name || name.trim().length==0)
        throw new Error("'name' must be set");

    return {
        title:`Ensuring machine '${name}' is running`,
        task:async (ctx, task)=>{   
            if(!ctx.machineList)         
                ctx.machineList = await DockerMachine.ls();
            if(!(ctx.machineList as DockerMachineListResult[]).find(p=>p.name==name && p.state?.toLowerCase()=='running'))
                await DockerMachine.start(name)
            
            ctx.machineEnvironment = await DockerMachine.env(name);
        }
    };
}

export function machineLocalDnsSetup(name:string, domain:string):Listr.ListrTask{    
    if(!name || name.trim().length==0)
        throw new Error("'name' must be set");

    return {
        title:`Setting up hosts for '${name}' => '${domain}'`,
        task:async (ctx, task)=>{            
            if(!ctx.machineList)         
                ctx.machineList = await DockerMachine.ls();

            if(!(ctx.machineList as DockerMachineListResult[]).find(p=>p.name==name && p.state?.toLowerCase()=='running'))
                throw new Error('Machine not found or not running');
            
            ctx.machineEnvironment = await DockerMachine.env(name);

            const hosts = await EtcHosts.create();
            hosts.removeDomain(domain);
            const address = getMachineAddress(ctx.machineEnvironment as DockerMachineEnv);
            if(!address)
                throw new Error('DOCKER_HOST format error');
            hosts.addMapping(domain,address);
            await hosts.flush();
        }
    };
}

export function environmentApplyConfiguraiton():Listr.ListrTask[]{
    return [
        {
            title:`Checking configuration`,
            task:async (ctx, task)=>{            
                const projectModel = ctx.projectModel= await readProjectModel();

                if(!ctx.machineList)         
                    ctx.machineList = await DockerMachine.ls('name');
                
                ctx.missingMachineList = Object.keys(projectModel.machines).filter(p=>!(ctx.machineList as DockerMachineListResult[]).find(t=>t.name==p));
            }
        },
        {
            skip:(ctx)=>ctx.missingMachineList.length==0,
            title:'Creating missing machines',
            task:async (ctx, taks)=>{
                const driver=new VirtualboxDriver();
                for(let name of (ctx.missingMachineList as string[])){
                    await createMachineIfNotExists(name, {
                        driver:'virtualbox',
                        engineRegistryMirror:(ctx.projectModel as ProjectModel).machines[name].mirror,
                        engineInsecureRegistry:(ctx.projectModel as ProjectModel).machines[name].mirror
                    }, driver.getMachineCreateArgs({}));
                };
            }
        },
        {
            title:'Enforcing configuration',
            task:async (ctx,task)=>{

                const driver = new VirtualboxDriver();

                const machines = await DockerMachine.ls('name','state');

                for(let name of Object.keys((ctx.projectModel as ProjectModel).machines)){
                    const machine = (ctx.projectModel as ProjectModel).machines[name];

                    const shares = await driver.getSharedFolders(name);
                    const confShares = machine.sharedFolders.map(p=>({
                        ...p, 
                        name:p.guestPath, 
                        hostPath:path.isAbsolute(p.hostPath)?p.hostPath:path.resolve(envrionmentCwd(),p.hostPath)
                    }));
                    const toBeRemovedShares = shares.filter(p=>!confShares.find(t=>t.name==p.name && t.hostPath==p.hostPath && t.guestPath==p.guestPath));
                    const toBeAddedShares = confShares.filter(p=>!shares.find(t=>t.name==p.name && t.hostPath==p.hostPath && t.guestPath==p.guestPath));
                    
                    if(toBeRemovedShares.length>0 || toBeAddedShares.length>0){
                        if(machines.find(p=>p.name==name && p.state?.toLowerCase()=='running'))
                            await DockerMachine.stop(name);
    
                        for(let share of toBeRemovedShares)
                            await driver.removeSharedFolder(name, share.name);
    
                        for(let share of toBeAddedShares)
                            await driver.addSharedFolder(name, share.name, share.hostPath, share.guestPath);
                            
                        if(machines.find(p=>p.name==name && p.state?.toLowerCase()=='running'))
                            await DockerMachine.start(name);
                    }
                }

                for(let name of Object.keys((ctx.projectModel as ProjectModel).machines)){
                    const machine = (ctx.projectModel as ProjectModel).machines[name];

                    for(let domain of machine.domains){
                        if(await Openssl.domainCertificateExists(domain, false)==false)
                            Openssl.createDomainCertificate(domain, false);
                    }
                }
            }
        }
    ];
}

export function environmentBringUp():Listr.ListrTask[]{
    return [
        {
            title:'Starting machines',
            task: async (ctx, task)=>{
                const machines = await DockerMachine.ls('name','state');
                for(let name of Object.keys((ctx.projectModel as ProjectModel).machines)){
                    const machine = machines.find(p=>p.name==name);
                    if(machine?.state?.toLowerCase()!='running')
                        await DockerMachine.start(name);
                }
            }
        },
        {
            title:'Configuring hosts',
            task:async (ctx,task)=>{
                const hosts= await EtcHosts.create();
                for(let name of Object.keys((ctx.projectModel as ProjectModel).machines)){
                    const machine = (ctx.projectModel as ProjectModel).machines[name];

                    const env = await DockerMachine.env(name);
                    const address = getMachineAddress(env);
                    
                    machine.domains.forEach(domain=>{
                        hosts.removeDomain(domain);
                        hosts.addMapping(domain, address);
                    });

                    await hosts.flush();
                }
            }
        }
    ]
}