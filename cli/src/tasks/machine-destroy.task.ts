import { DockerMachineCreateOptions, DockerMachine } from '@lime.it/blip-core'
import Listr = require('listr')
import { fillMachineListTaskContext, MachineListTaskContext } from './utils';

export function machineDestroy(name: string): Listr.ListrTask {
  if (!name || name.trim().length === 0)
    throw new Error("'name' must be set")

  return {
    title: `Removing machine '${name}'`,
    task: async (ctx:any) => {
      await DockerMachine.remove(name)
    },
  }
}