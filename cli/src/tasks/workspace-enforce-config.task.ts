import { DriverUtils } from './../driver-utils';
import Listr = require('listr');
import { fillWorkspaceTaskContext, fillMachineListTaskContext, MachineListTaskContext, WorkspaceTaskContext, OclifCommandTaskContext, isMachineRunning } from './utils';
import { machineEnsureCreated } from './machine-ensure-created.task';
import { DockerMachine, Openssl } from '@lime.it/blip-core';

interface MissinMachineListTaskContext{
  missingMachineList: string[];
}

function fillMissinMachineListTaskContext(ctx:WorkspaceTaskContext&MissinMachineListTaskContext&MachineListTaskContext){
  ctx.missingMachineList = Object.keys(ctx.workspace.machines)
    .filter(name => !ctx.machineList.find(t => t.name === name));
  return ctx as MissinMachineListTaskContext;
}

export function workspaceEnforceConfig(): Listr.ListrTask[] {
  return [
    {
      title: 'Checking configuration',
      task: async (ctx:OclifCommandTaskContext&WorkspaceTaskContext&MachineListTaskContext&MissinMachineListTaskContext) => {
        await fillWorkspaceTaskContext(ctx);
        await fillMachineListTaskContext(ctx, true);

        fillMissinMachineListTaskContext(ctx);
      },
    },
    {
      skip: (ctx:MissinMachineListTaskContext) => ctx.missingMachineList.length === 0,
      title: 'Creating missing machines',
      task: async (ctx:OclifCommandTaskContext&WorkspaceTaskContext&MissinMachineListTaskContext) => {

        const drivers = new DriverUtils(ctx.config);

        const ops = (await Promise.all(ctx.missingMachineList
        .map(name=>({name, machine: ctx.workspace.machines[name]}))
        .map(async ({name, machine})=>[
          machineEnsureCreated(
            name,
            {driver:machine.driver},
            await drivers.parseCreateArgs(machine.driver, name, machine.configuration)
          )
        ]))).reduce((acc, p)=>[...acc, ...p], [])

        return new Listr(ops);
      },
    },
    {
      title: 'Enforcing configuration',
      task: async (ctx:OclifCommandTaskContext&WorkspaceTaskContext&MissinMachineListTaskContext&MachineListTaskContext) => {

        await fillMachineListTaskContext(ctx, true);

        const drivers = new DriverUtils(ctx.config);

        const wsMachines = await Promise.all(ctx.machineList.filter(machine=>Object.keys(ctx.workspace.machines).includes(machine.name||''))
          .map(machine=>({
            name: machine.name||'',
            machine:machine,
            workspaceConfig: ctx.workspace.machines[machine.name||'']
          }))
          .map(async item=>({...item, currentState: await drivers.getConfig(item.workspaceConfig.driver, item.machine.name||'')})));

        const sharesChanges = wsMachines
        .map(item=>({
          name: item.name,
          driver: item.workspaceConfig.driver,
          config:Object.keys(item.workspaceConfig.configuration.sharedFolders).map(name=>({name, ...item.workspaceConfig.configuration.sharedFolders[name]})),
          state: Object.keys(item.currentState.sharedFolders).map(name=>({name, ...item.currentState.sharedFolders[name]}))
        }))
        .map(item=>({
          name: item.name,
          driver: item.driver,
          toBeAdded: item.config
            .filter(x=>!item.state.find(p=>p.name==x.name && p.hostPath==x.hostPath && p.guestPath==x.guestPath)),
          toBeRemoved: item.state
            .filter(x=>!item.config.find(p=>p.name==x.name && p.hostPath==x.hostPath && p.guestPath==x.guestPath))
        }))
        .filter(p=>p.toBeAdded.length>0 && p.toBeRemoved.length>0);

        const shareOps = sharesChanges.map(item=>[
          {
            skip: (ctx:any) => !isMachineRunning(ctx, item.name),
            title: `Stopping machine '${item.name}'`,
            task: async (ctx:any) => { ctx.toBeRestarted=true; await DockerMachine.stop(item.name); }
          },
          ...item.toBeRemoved.map(t=>({
            title: `Removing share ${t.name}: ${t.hostPath}=>${t.guestPath}`,
            task: async ()=>drivers.removeShare(item.driver, item.name, t.name)
          })),
          ...item.toBeAdded.map(t=>({
            title: `Adding share ${t.name}: ${t.hostPath}=>${t.guestPath}`,
            task: async ()=>drivers.addShare(item.driver, item.name, t.name, t.hostPath, t.guestPath)
          })),
          {
            skip: (ctx:any) => !ctx.toBeRestarted,
            title: `Starting machine '${item.name}'`,
            task: async (ctx:any) => await DockerMachine.start(item.name)
          },
        ]).reduce((acc, p)=>[...acc, ...p], [] as Listr.ListrTask[]);

        const domainsOps = wsMachines.reduce((acc, p)=> [
          ...acc,
          ...p.workspaceConfig.domains.filter(d=>!Openssl.domainCertificateExists(d, false)).map(d=>({name:p.name, domain:d}))
        ], [] as {name:string, domain:string}[])
        .map(item=>({
          title: `Creating local certificate for ${item.name}: ${item.domain}`,
          task: async ()=> await Openssl.createDomainCertificate(item.domain, false)
        })) as Listr.ListrTask[];

        const ops = [
          ...shareOps,
          ...domainsOps
        ];

        return new Listr(ops);
      },
    },
  ]
}