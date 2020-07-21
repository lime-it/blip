import Listr = require('listr')
import { getMachineAddress, DockerMachineEnv, EtcHosts } from '@lime.it/blip-core'
import { fillMachineListTaskContext, fillMachineEnvTaskContext, ensureMachineIsPresentAndRunning, MachineListTaskContext, MachineEnvTaskContext } from './utils';

export function machineSetupLocalDns(name: string, domain: string): Listr.ListrTask {
  if (!name || name.trim().length === 0)
    throw new Error("'name' must be set")

  return {
    title: `Setting up hosts for '${name}' => '${domain}'`,
    task: async (ctx:MachineListTaskContext&MachineEnvTaskContext) => {
      await fillMachineListTaskContext(ctx);

      ensureMachineIsPresentAndRunning(ctx, name);

      await fillMachineEnvTaskContext(ctx, name);

      const hosts = await EtcHosts.create()
      hosts.removeDomain(domain)
      const address = getMachineAddress(ctx.machineEnvironment)
      if (!address)
        throw new Error('DOCKER_HOST format error')
      hosts.addMapping(domain, address)
      await hosts.flush()
    },
  }
}