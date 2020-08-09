import { DriverUtils } from './../driver-utils';
import { DockerMachineCreateOptions, DockerMachine } from '@lime.it/blip-core'
import Listr = require('listr')
import { fillMachineListTaskContext, MachineListTaskContext, OclifCommandTaskContext } from './utils';

export function machineEnsureCreated(name: string, options: Partial<DockerMachineCreateOptions>, driverOptions: {[key: string]: string}): Listr.ListrTask {
  if (!name || name.trim().length === 0)
    throw new Error("'name' must be set")

  return {
    title: `Ensuring machine '${name}' is created`,
    task: async (ctx:MachineListTaskContext&OclifCommandTaskContext) => {
      await DockerMachine.create(name, options, driverOptions);
      const drivers = new DriverUtils(ctx.config);
      await drivers.setConfig(options.driver||'', name, await drivers.getConfig(options.driver||'', name));
      await fillMachineListTaskContext(ctx, true);
    },
  }
}