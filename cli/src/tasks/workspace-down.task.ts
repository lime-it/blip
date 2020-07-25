import Listr = require('listr')
import { DockerMachine } from '@lime.it/blip-core'
import { WorkspaceTaskContext, fillMachineListTaskContext, MachineListTaskContext, OclifCommandTaskContext, isMachineRunning } from './utils'

export function workspaceDown(): Listr.ListrTask[] {
  return [
    {
      title: 'Stopping machines',
      task: async (ctx:OclifCommandTaskContext&MachineListTaskContext&WorkspaceTaskContext) => {
        await fillMachineListTaskContext(ctx, true);

        return new Listr(Object.keys(ctx.workspace.machines).map(name=>({
          skip: () => !isMachineRunning(ctx, name),
          title: `Stopping machine '${name}'`,
          task: async () => await DockerMachine.stop(name)
        })));
      },
    }
  ]
}
