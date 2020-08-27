import Listr = require('listr')
import { DockerMachine } from '@lime.it/blip-core'
import { fillMachineListTaskContext, fillMachineEnvTaskContext, isMachineRunning, ensureMachineIsPresent, MachineListTaskContext, MachineEnvTaskContext } from './utils';

export function machineEnsureActive(name: string): Listr.ListrTask {
  if (!name || name.trim().length === 0)
    throw new Error("'name' must be set")

  return {
    title: `Ensuring machine '${name}' is running`,
    task: async (ctx:MachineListTaskContext&MachineEnvTaskContext) => {
      await fillMachineListTaskContext(ctx);

      ensureMachineIsPresent(ctx, name);

      if (!isMachineRunning(ctx, name))
        await DockerMachine.start(name);

      await fillMachineListTaskContext(ctx, true);

      await fillMachineEnvTaskContext(ctx, name);
    },
  }
}