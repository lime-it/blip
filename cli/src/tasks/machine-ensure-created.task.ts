import { DockerMachineCreateOptions, DockerMachine } from '@lime.it/blip-core'
import Listr = require('listr')
import { fillMachineListTaskContext, MachineListTaskContext } from './utils';

export function machineEnsureCreated(name: string, options: Partial<DockerMachineCreateOptions>, driverOptions: {[key: string]: string}): Listr.ListrTask {
  if (!name || name.trim().length === 0)
    throw new Error("'name' must be set")

  return {
    title: `Ensuring machine '${name}' is created`,
    task: async (ctx:MachineListTaskContext) => {
      await DockerMachine.create(name, options, driverOptions);
      await fillMachineListTaskContext(ctx, true);
    },
  }
}