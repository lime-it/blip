import * as path from 'path'
import Listr = require('listr');
import { fillWorkspaceTaskContext, fillMachineListTaskContext, MachineListTaskContext, WorkspaceTaskContext, OclifCommandTaskContext } from './utils';

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
        await fillMachineListTaskContext(ctx);

        fillMissinMachineListTaskContext(ctx);
      },
    },
    {
      skip: (ctx:MissinMachineListTaskContext) => ctx.missingMachineList.length === 0,
      title: 'Creating missing machines',
      task: async ctx => {
        //TODO: complete
        // const driver = new VirtualboxDriver()
        // for (const name of (ctx.missingMachineList as string[])) {
        //   await createMachineIfNotExists(name, {
        //     driver: 'virtualbox',
        //     engineRegistryMirror: (ctx.projectModel as ProjectModel).machines[name].mirror,
        //     engineInsecureRegistry: (ctx.projectModel as ProjectModel).machines[name].mirror,
        //   }, driver.getMachineCreateArgs({}))
        // }
      },
    },
    {
      title: 'Enforcing configuration',
      task: async (ctx:any) => {
        //TODO: complete
        // const driver = new VirtualboxDriver()

        // const machines = await DockerMachine.ls('name', 'state')

        // for (const name of Object.keys((ctx.projectModel as ProjectModel).machines)) {
        //   const machine = (ctx.projectModel as ProjectModel).machines[name]

        //   const shares = await driver.getSharedFolders(name)
        //   const confShares = machine.sharedFolders.map(p => ({
        //     ...p,
        //     name: p.guestPath,
        //     hostPath: path.isAbsolute(p.hostPath) ? p.hostPath : path.resolve(environmentCwd(), p.hostPath),
        //   }))
        //   const toBeRemovedShares = shares.filter(p => !confShares.find(t => t.name === p.name && t.hostPath === p.hostPath && t.guestPath === p.guestPath))
        //   const toBeAddedShares = confShares.filter(p => !shares.find(t => t.name === p.name && t.hostPath === p.hostPath && t.guestPath === p.guestPath))

        //   if (toBeRemovedShares.length > 0 || toBeAddedShares.length > 0) {
        //     if (machines.find(p => p.name === name && p.state?.toLowerCase() === 'running'))
        //       await DockerMachine.stop(name)

        //     for (const share of toBeRemovedShares)
        //       await driver.removeSharedFolder(name, share.name)

        //     for (const share of toBeAddedShares)
        //       await driver.addSharedFolder(name, share.name, share.hostPath, share.guestPath)

        //     if (machines.find(p => p.name === name && p.state?.toLowerCase() === 'running'))
        //       await DockerMachine.start(name)
        //   }
        // }

        // for (const name of Object.keys((ctx.projectModel as ProjectModel).machines)) {
        //   const machine = (ctx.projectModel as ProjectModel).machines[name]

        //   for (const domain of machine.domains) {
        //     if (await Openssl.domainCertificateExists(domain, false) === false)
        //       Openssl.createDomainCertificate(domain, false)
        //   }
        // }
      },
    },
  ]
}