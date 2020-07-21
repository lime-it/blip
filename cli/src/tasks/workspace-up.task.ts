import Listr = require('listr')
import { BlipWorkspace } from '@lime.it/blip-core'
import { WorkspaceTaskContext, fillMachineListTaskContext, MachineListTaskContext, OclifCommandTaskContext } from './utils'
import { machineEnsureCreated } from './machine-ensure-created.task';
import { machineEnsureActive } from './machine-ensure-active.task';
import { machineSetupLocalDns } from './machine-setup-local-dns.task';

export function workspaceUp(): Listr.ListrTask[] {
  return [
    {
      title: 'Starting machines',
      task: async (ctx:OclifCommandTaskContext&MachineListTaskContext&WorkspaceTaskContext) => {
        await fillMachineListTaskContext(ctx, true);

        return new Listr(Object.keys(ctx.workspace.machines).map(name=>[
          machineEnsureCreated(name, null, null), //TODO: set correct args
          machineEnsureActive(name)
        ]).reduce((acc, p)=>[...acc, ...p], []));
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
