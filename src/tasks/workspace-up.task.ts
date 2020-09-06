import { DriverUtils } from './../driver-utils';
import Listr = require('listr')
import { BlipWorkspace } from '@lime.it/blip-core'
import { WorkspaceTaskContext, fillMachineListTaskContext, MachineListTaskContext, OclifCommandTaskContext, fillWorkspaceTaskContext } from './utils'
import { machineEnsureCreated } from './machine-ensure-created.task';
import { machineEnsureActive } from './machine-ensure-active.task';
import { machineSetupLocalDns } from './machine-setup-local-dns.task';

export function workspaceUp(): Listr.ListrTask[] {
  return [
    {
      title: 'Starting machines',
      task: async (ctx:OclifCommandTaskContext&MachineListTaskContext&WorkspaceTaskContext) => {
        await fillWorkspaceTaskContext(ctx);
        await fillMachineListTaskContext(ctx, true);

        const drivers = new DriverUtils(ctx.config);

        const ops = (await Promise.all(Object.keys(ctx.workspace.machines)
        .map(name=>({name, machine: ctx.workspace.machines[name]}))
        .map(async ({name, machine})=>[
          machineEnsureCreated(
            name,
            {driver:machine.driver},
            await drivers.parseCreateArgs(machine.driver, name, machine.configuration)
          ),
          machineEnsureActive(name)
        ]))).reduce((acc, p)=>[...acc, ...p], [])

        return new Listr(ops);
      },
    },
    {
      title: 'Configuring hosts',
      task: async ctx => {
        return new Listr(Object.keys(ctx.workspace.machines).map(name => ({
          title:`Configuring hosts for machine '${name}'`,
          task: async ctx => new Listr((ctx.workspace as BlipWorkspace).machines[name].domains.map(domain => machineSetupLocalDns(name, domain)))
        } as Listr.ListrTask)));
      },
    },
  ]
}
